import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Vacancy } from './entities/vacancy.entity';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
  ) {}

  async create(createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
    const createdVacancy = this.vacancyRepository.create({
      ...createVacancyDto,
    });

    await this.vacancyRepository.save(createdVacancy);

    return createdVacancy;
  }

  async updateOne(
    id: number,
    updateVacancyDto: UpdateVacancyDto,
  ): Promise<Vacancy> {
    const vacancy = await this.vacancyRepository.findOneBy({ id });
    console.log(vacancy, 'this is before update');

    await this.vacancyRepository.update(updateVacancyDto.id, updateVacancyDto);

    return await this.vacancyRepository.findOneBy({ id });
  }
}
