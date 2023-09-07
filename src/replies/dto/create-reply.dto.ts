import { IsNotEmpty } from 'class-validator';

export class CreateReplyDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  vacancyId: number;
}
