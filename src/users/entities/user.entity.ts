import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Reply } from 'src/replies/entities/reply.entity';
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
  @OneToMany(() => Reply, (reply) => reply.user)
  replies: Reply[];

  @OneToMany(() => Vacancy, (vacancy) => vacancy.owner)
  vacancies: Vacancy[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
