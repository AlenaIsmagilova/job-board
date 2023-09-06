import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
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
      throw new NotFoundException('Пользователь не найден');
    }

    const currentVacancy = await this.vacancyRepository.findOne({
      where: { id: updateVacancyDto.id },
      relations: { owner: true },
    });

    if (ownerOfVacancy.id !== currentVacancy.owner.id) {
      throw new ForbiddenException('Вы не можете обновлять чужую вакансию');
    }
    const { userId, ...rest } = updateVacancyDto;
    await this.vacancyRepository.update(updateVacancyDto.id, rest);

    return await this.vacancyRepository.findOneBy({ id: updateVacancyDto.id });
  }

  async findOneById(id: number): Promise<Vacancy> {
    return await this.vacancyRepository.findOneBy({ id });
  }

  async sortByCreatedDate(): Promise<Vacancy[]> {
    return await this.vacancyRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        owner: true,
      },
    });
  }

  async sortedByTitle(title: string): Promise<Vacancy[]> {
    const vacancies = await this.vacancyRepository.find({
      where: {
        title,
      },
    });

    if (vacancies.length === 0) {
      throw new NotFoundException('Вакансий с таким названием нет');
    }

    return vacancies;
  }

  async sortedByOwner(ownersName: string): Promise<Vacancy[]> {
    const vacancies = await this.vacancyRepository.find({
      relations: {
        owner: true,
      },
      where: {
        owner: {
          username: ownersName,
        },
      },
    });

    if (vacancies.length === 0) {
      throw new NotFoundException(
        'Вакансий, созданных данным пользователем нет',
      );
    }

    return vacancies;
  }
}
