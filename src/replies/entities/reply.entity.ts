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
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.replies)
  @JoinTable()
  user: User;

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.replies)
  @JoinTable()
  vacancy: Vacancy;

  @Column({ default: false })
  viewed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
