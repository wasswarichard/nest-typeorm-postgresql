import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  ParseIntPipe,
  UseGuards,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @ApiCreatedResponse({ type: User })
  @Post()
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  async findAll(@Query('name') name: string): Promise<User[]> {
    return await this.usersService.findAll(name);
  }
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/current')
  users(@Request() req): string {
    return req.user;
  }
}
