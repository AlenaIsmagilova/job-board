import { Controller, Post, Body, Patch } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post()
  create(
    userId: number,
    vacancyId: number,
    @Body() createResponseDto: CreateResponseDto,
  ) {
    return this.responsesService.create(userId, vacancyId, createResponseDto);
  }

  @Patch()
  update(responseId: number) {
    return this.responsesService.setResponseViewed(responseId);
  }
}
