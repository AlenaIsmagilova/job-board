import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Errors } from 'src/constants/constants';
import { UsersService } from 'src/users/users.service';
import { ArrayContains, Repository } from 'typeorm';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { FilterVacancyDto } from './dto/filter-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Vacancy } from './entities/vacancy.entity';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
    private usersService: UsersService,
  ) {}

  async create(createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
    const currentUser = await this.usersService.findById(
      createVacancyDto.userId,
    );

    const createdVacancy = this.vacancyRepository.create({
      ...createVacancyDto,
      owner: currentUser,
    });

    await this.vacancyRepository.save(createdVacancy);

    return createdVacancy;
  }

  async updateOne(updateVacancyDto: UpdateVacancyDto): Promise<Vacancy> {
    const ownerOfVacancy = await this.usersService.findById(
      updateVacancyDto.userId,
    );

    if (!ownerOfVacancy) {
      throw new NotFoundException(Errors.NotFoundUser);
    }

    const currentVacancy = await this.vacancyRepository.findOne({
      where: { id: updateVacancyDto.id },
      relations: { owner: true },
    });

    if (ownerOfVacancy.id !== currentVacancy.owner.id) {
      throw new ForbiddenException(Errors.CanNotUpdate);
    }
    const { userId, ...rest } = updateVacancyDto;
    await this.vacancyRepository.update(updateVacancyDto.id, rest);

    return await this.vacancyRepository.findOneBy({ id: updateVacancyDto.id });
  }

  async findOneById(id: number): Promise<Vacancy> {
    return await this.vacancyRepository.findOneBy({ id });
  }

  async findWithFilters(
    filterVacancyDto: FilterVacancyDto,
  ): Promise<Vacancy[]> {
    const { order, orderBy, ownersName, skills, limit, offset, ...rest } =
      filterVacancyDto;
    const filterParams: any = rest;

    if (ownersName) {
      filterParams.owner = {};
      filterParams.owner.username = ownersName;
    }

    if (skills) {
      filterParams.skills = ArrayContains([skills]);
    }
    const vacancies = await this.vacancyRepository.find({
      where: filterParams,
      order: {
        [orderBy || 'createdAt']: order,
      },
      skip: offset,
      take: limit,
    });

    return vacancies;
  }
}
