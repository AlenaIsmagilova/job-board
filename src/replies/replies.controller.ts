import { Controller, Post, Body, Patch } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';

@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  create(
    userId: number,
    vacancyId: number,
    @Body() createReplyDto: CreateReplyDto,
  ) {
    return this.repliesService.create(userId, vacancyId, createReplyDto);
  }

  @Patch()
  update(replyId: number): Promise<void> {
    return this.repliesService.setReplyViewed(replyId);
  }
}
