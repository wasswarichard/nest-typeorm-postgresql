import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn((dto) => Promise.resolve({ id: Date.now(), ...dto })),
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

  it('should create a user', async () => {
    expect(
      await controller.create({
        name: 'richard',
        username: 'richard',
        password: 'testing',
        status: 'activate',
        email: 'richard@gmail.com',
      }),
    ).toEqual({
      id: expect.any(Number),
      name: 'richard',
      username: 'richard',
      password: 'testing',
    });
    expect(mockUsersService.create).toHaveBeenCalled();
  });
});
