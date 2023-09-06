import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Response } from 'src/responses/entities/response.entity';
import { Vacancy } from 'src/vacancies/entities/vacancy.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  //любому юзеру может соответствовать какое-то количество откликов, а любому отклику соответствует набор юзеров
  @OneToMany(() => Response, (response) => response.user)
  responses: Response[];

  @OneToMany(() => Vacancy, (vacancy) => vacancy.owner)
  vacancies: Vacancy[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
