import { IsNotEmpty } from 'class-validator';
import { CreateVacancyDto } from './create-vacancy.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateVacancyDto extends PartialType(CreateVacancyDto) {
  @IsNotEmpty()
  id: number;
}
