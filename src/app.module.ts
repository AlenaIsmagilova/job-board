import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Reply } from './replies/entities/reply.entity';
import { UsersModule } from './users/users.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { RepliesModule } from './replies/replies.module';
import { Vacancy } from './vacancies/entities/vacancy.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'nest_project',
      entities: [User, Reply, Vacancy],
      synchronize: true,
    }),
    UsersModule,
    VacanciesModule,
    RepliesModule,
  ],
})
export class AppModule {}
