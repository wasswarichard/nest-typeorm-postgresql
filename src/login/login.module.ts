import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [LoginController],
  providers: [LoginService, AuthService, UsersService, JwtService],
})
export class LoginModule {}
