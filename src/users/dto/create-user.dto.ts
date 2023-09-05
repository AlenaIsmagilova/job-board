import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail({}, { message: 'Введите корректный email' })
  @IsNotEmpty()
  email: string;

  @IsOptional()
  phoneNumber: string;
}
