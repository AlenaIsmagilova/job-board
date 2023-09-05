import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Response } from './responses/entities/response.entity';
import { UsersModule } from './users/users.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { ResponsesModule } from './responses/responses.module';
import { Vacancy } from './vacancies/entities/vacancy.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'nest_project',
      entities: [User, Response, Vacancy],
      synchronize: true,
    }),
    UsersModule,
    VacanciesModule,
    ResponsesModule,
  ],
})
export class AppModule {}
