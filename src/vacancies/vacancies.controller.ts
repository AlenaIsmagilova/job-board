import { Controller, Post, Body, Patch, Req, Get, Query } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { Vacancy } from './entities/vacancy.entity';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { FilterVacancyDto } from './dto/filter-vacancy.dto';

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Post()
  create(@Body() createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
    return this.vacanciesService.create(createVacancyDto);
  }

  @Patch()
  async updateOne(
    @Body() updateVacancyDto: UpdateVacancyDto,
  ): Promise<Vacancy> {
    return await this.vacanciesService.updateOne(updateVacancyDto);
  }

  @Post('filters')
  getByFilter(@Body() filterVacancyDto: FilterVacancyDto) {
    return this.vacanciesService.findWithFilters(filterVacancyDto);
  }
}
