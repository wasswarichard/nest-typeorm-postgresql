import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  private users: User[] = [
    { id: 1, name: 'richard', username: 'richard', password: 'testing' },
    { id: 2, name: 'mike', username: 'mike', password: 'testing' },
    { id: 3, name: 'marcus', username: 'marcus', password: 'testing' },
  ];
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }

  findAll(name?: string): User[] {
    if (name) return this.users.filter((user) => user.name === name);
    return this.users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findById(id: number): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOneById(id);
    } catch (e) {
      throw e;
    }
  }
}
