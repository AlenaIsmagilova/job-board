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

  @Get('sorting-by-date')
  getByDate() {
    return this.vacanciesService.sortByCreatedDate();
  }

  @Get('filter-by-title')
  getByTitle(@Query('title') query: { title: string }) {
    return this.vacanciesService.filterByTitle(query.title);
  }

  @Get('filter-by-username')
  getByUsername(@Query('ownersName') query: { ownersName: string }) {
    return this.vacanciesService.filterByOwner(query.ownersName);
  }

  @Post('filter-by-skills')
  getBySkills(@Body() body: { skills: string[] }) {
    return this.vacanciesService.filterBySkills(body.skills);
  }

  @Post('filters')
  getByFilter(@Body() filterVacancyDto: FilterVacancyDto) {
    return this.vacanciesService.findWithFilters(filterVacancyDto);
  }
}
