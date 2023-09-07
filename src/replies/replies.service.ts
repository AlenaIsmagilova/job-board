import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { VacanciesService } from 'src/vacancies/vacancies.service';
import { Repository } from 'typeorm';
import { CreateReplyDto } from './dto/create-reply.dto';
import { Reply } from './entities/reply.entity';

@Injectable()
export class RepliesService {
  constructor(
    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,
    private usersService: UsersService,
    private vacanciesService: VacanciesService,
  ) {}

  async create(
    userId: number,
    vacancyId: number,
    createReplyDto: CreateReplyDto,
  ) {
    const currentUser = await this.usersService.findById(userId);

    if (!currentUser) {
      throw new NotFoundException('Укажите корректный id пользователя');
    }

    const currentVacancy = await this.vacanciesService.findOneById(vacancyId);

    if (!currentVacancy) {
      throw new NotFoundException('Укажите корректный id вакансии');
    }

    const createdReply = await this.replyRepository.create({
      ...createReplyDto,
      user: currentUser,
      vacancy: currentVacancy,
    });

    await this.replyRepository.save(createdReply);

    return createdReply;
  }

  async setReplyViewed(replyId: number): Promise<void> {
    await this.replyRepository.update(replyId, { viewed: true });
  }
}
