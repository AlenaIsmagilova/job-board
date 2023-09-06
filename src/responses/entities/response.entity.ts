import { User } from 'src/users/entities/user.entity';
import { Vacancy } from 'src/vacancies/entities/vacancy.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.responses)
  @JoinTable()
  user: User;

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.responses)
  @JoinTable()
  vacancy: Vacancy;

  @Column({ default: false })
  viewed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
