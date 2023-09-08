import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['replies', 'vacancies'],
    });

    return users;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = this.userRepository.create({ ...createUserDto });

    await this.userRepository.save(createdUser);

    return createdUser;
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }
}
