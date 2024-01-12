import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsEnum, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(10)
  name: string;
  username: string;
  password: string;
  @IsEnum(['active', 'deactivate'], { message: 'use correct status' })
  status: string;
  @IsEmail()
  email: string;
}
