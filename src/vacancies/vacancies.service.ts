import { Injectable } from '@nestjs/common';
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

  async create(
    id: number,
    createVacancyDto: CreateVacancyDto,
  ): Promise<Vacancy> {
    const currentUser = await this.usersService.findById(id);

    const createdVacancy = this.vacancyRepository.create({
      ...createVacancyDto,
      owner: currentUser,
    });

    await this.vacancyRepository.save(createdVacancy);

    return createdVacancy;
  }

  async updateOne(
    id: number,
    updateVacancyDto: UpdateVacancyDto,
  ): Promise<Vacancy> {
    await this.vacancyRepository.findOneBy({ id });

    await this.vacancyRepository.update(updateVacancyDto.id, updateVacancyDto);

    return await this.vacancyRepository.findOneBy({ id });
  }

  async findOneById(id: number): Promise<Vacancy> {
    return await this.vacancyRepository.findOneBy({ id });
  }
}
