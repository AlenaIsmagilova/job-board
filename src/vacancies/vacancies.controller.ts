import { Controller, Post, Body, Patch, Req } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { Vacancy } from './entities/vacancy.entity';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Post()
  create(
    id: number,
    @Body() createVacancyDto: CreateVacancyDto,
  ): Promise<Vacancy> {
    return this.vacanciesService.create(id, createVacancyDto);
  }

  @Patch()
  updateOne(@Body() updateVacancyDto: UpdateVacancyDto): Promise<Vacancy> {
    return this.vacanciesService.updateOne(
      updateVacancyDto.id,
      updateVacancyDto,
    );
  }
}
