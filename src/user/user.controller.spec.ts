import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user.service';
import { Repository } from 'typeorm';

describe('User Controller', () => {
  let controller: UserController;
  let spyService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,
        {
          provide: 'UserRepository',
          useClass: Repository,
        }],
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    spyService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
