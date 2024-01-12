import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private Users: User[] = [];
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }
  async updateUser(id: number): Promise<User> {
    const user = await this.findById(id);
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.findById(id);
    return this.usersRepository.remove(user);
  }

  async findAll(name?: string): Promise<User[]> {
    if (name) return await this.usersRepository.find({ where: { name } });
    return await this.usersRepository.find({ relations: ['pets'] });
  }

  findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }
  customQuery(): any {
    return this.usersRepository
      .createQueryBuilder('user')
      .select('name')
      .orderBy('id', 'ASC', 'NULLS LAST');
  }

  async findById(id: number): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOneById(id);
    } catch (e) {
      throw e;
    }
  }
}
