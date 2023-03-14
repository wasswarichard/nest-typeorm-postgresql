import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, AuthService, JwtService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', function () {
    controller.create({
      name: 'richard',
      username: 'richard',
      password: 'testing',
    });
    expect(mockUsersService.create).toHaveBeenCalled();
  });
});
