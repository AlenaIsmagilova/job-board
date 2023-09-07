import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './entities/reply.entity';
import { UsersService } from 'src/users/users.service';
import { VacanciesService } from 'src/vacancies/vacancies.service';
import { User } from 'src/users/entities/user.entity';
import { Vacancy } from 'src/vacancies/entities/vacancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reply, User, Vacancy])],
  controllers: [RepliesController],
  providers: [RepliesService, UsersService, VacanciesService],
})
export class RepliesModule {}
