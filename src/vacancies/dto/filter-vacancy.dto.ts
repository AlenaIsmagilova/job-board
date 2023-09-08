import { IsNotEmpty, IsOptional } from 'class-validator';

export class FilterVacancyDto {
  @IsOptional()
  createdAt: Date;

  @IsOptional()
  title: string;

  @IsOptional()
  ownersName: string;

  @IsOptional()
  order: string;

  @IsOptional()
  orderBy: string;

  @IsOptional()
  skills: string[];

  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  offset: number;
}
