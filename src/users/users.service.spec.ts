import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: Date.now(), ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user and return that', async () => {
    expect(
      await service.create({
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
  });
});
