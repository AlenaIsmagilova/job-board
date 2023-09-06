import { Module } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { ResponsesController } from './responses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './entities/response.entity';
import { UsersService } from 'src/users/users.service';
import { VacanciesService } from 'src/vacancies/vacancies.service';
import { User } from 'src/users/entities/user.entity';
import { Vacancy } from 'src/vacancies/entities/vacancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Response, User, Vacancy])],
  controllers: [ResponsesController],
  providers: [ResponsesService, UsersService, VacanciesService],
})
export class ResponsesModule {}
