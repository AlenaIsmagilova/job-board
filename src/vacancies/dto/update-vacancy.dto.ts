import { IsNotEmpty } from 'class-validator';
import { CreateVacancyDto } from './create-vacancy.dto';

export class UpdateVacancyDto extends CreateVacancyDto {
  @IsNotEmpty()
  id: number;
}
