import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { LoginService } from './login.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @UseGuards(LocalAuthGuard)
  @Post()
  login(@Request() req) {
    return req.user;
  }
  @UseGuards(AuthenticatedGuard)
  @Get()
  users(@Request() req): string {
    return req.user;
  }
}
