import { IsBoolean } from 'class-validator';

export class CreateResponseDto {
  @IsBoolean()
  viewed: boolean;
}
