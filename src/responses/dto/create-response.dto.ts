import { IsNotEmpty } from 'class-validator';

export class CreateResponseDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  vacancyId: number;
}
