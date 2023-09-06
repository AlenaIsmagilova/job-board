import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { VacanciesService } from 'src/vacancies/vacancies.service';
import { Repository } from 'typeorm';
import { CreateResponseDto } from './dto/create-response.dto';
import { Response } from './entities/response.entity';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
    private usersService: UsersService,
    private vacanciesService: VacanciesService,
  ) {}
  async create(
    userId: number,
    vacancyId: number,
    createResponseDto: CreateResponseDto,
  ) {
    const currentUser = await this.usersService.findById(userId);

    if (!currentUser) {
      throw new NotFoundException('Укажите корректный id пользователя');
    }

    const currentVacancy = await this.vacanciesService.findOneById(vacancyId);

    if (!currentVacancy) {
      throw new NotFoundException('Укажите корректный id вакансии');
    }

    const createdResponse = await this.responseRepository.create({
      ...createResponseDto,
      user: currentUser,
      viewed: true,
      vacancy: currentVacancy,
    });

    await this.responseRepository.save(createdResponse);

    return createdResponse;
  }
}
