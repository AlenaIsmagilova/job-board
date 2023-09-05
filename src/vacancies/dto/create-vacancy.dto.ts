import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateVacancyDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @Length(1, 300, {
    message: 'Описание должно быть указано буквами от 1 до 300 символов',
  })
  description: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  skills: string[];
}
