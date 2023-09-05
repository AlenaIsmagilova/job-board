import { User } from 'src/users/entities/user.entity';
import { Vacancy } from 'src/vacancies/entities/vacancy.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.responses)
  @JoinTable()
  users: User[];

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.responses)
  vacancy: Vacancy;

  @Column({ default: false })
  viewed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
