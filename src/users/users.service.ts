import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'richard', username: 'richard', password: 'testing' },
    { id: 2, name: 'mike', username: 'mike', password: 'testing' },
    { id: 3, name: 'marcus', username: 'marcus', password: 'testing' },
  ];
  create(createUserDto: CreateUserDto): User {
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  findAll(name?: string): User[] {
    if (name) return this.users.filter((user) => user.name === name);
    return this.users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
