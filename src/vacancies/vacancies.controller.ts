import { Controller, Post, Body, Patch, Req, Get, Query } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { Vacancy } from './entities/vacancy.entity';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { title } from 'process';

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

  @Get('sorting-by-date')
  getByDate() {
    return this.vacanciesService.sortByCreatedDate();
  }

  @Get('sorting-by-title')
  getByTitle(@Query('title') query: { title: string }) {
    return this.vacanciesService.sortedByTitle(query.title);
  }

  @Get('sorting-by-username')
  getByUsername(@Query('ownersName') query: { ownersName: string }) {
    return this.vacanciesService.sortedByOwner(query.ownersName);
  }
}
