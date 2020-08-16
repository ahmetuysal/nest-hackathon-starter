import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserService', () => {
  let service: UserService;
  let spyRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useClass: Repository,
        }],
    }).compile();

    service = module.get<UserService>(UserService);
    spyRepository = module.get<Repository<User>>('UserRepository');
  });

  describe('getUserEntityById', () => {
    it('should call repository with correct id', async () => {
      const id = 12313242;

      spyRepository.findOne = jest.fn();
      await service.getUserEntityById(id);

      expect(spyRepository.findOne).toBeCalledTimes(1);
      expect(spyRepository.findOne).toHaveBeenCalledWith(id);
    });

    it('should return the result from repository', async () => {
      const userEntity = new User();
      const userId = 123123;
      const mockFindOne = jest.fn();
      mockFindOne.mockReturnValue(userEntity);
      spyRepository.findOne = mockFindOne;

      expect(await service.getUserEntityById(userId))
        .toStrictEqual(userEntity);
    });
  });

  describe('getUserEntityByUsername', () => {
    it('should call repository with given username', async () => {
      const username = 'userName';

      spyRepository.findOne = jest.fn();
      await service.getUserEntityByUsername(username);

      expect(spyRepository.findOne).toBeCalledTimes(1);
      expect(spyRepository.findOne).toBeCalledWith({
        where:
          { username: username.toLowerCase() },
      });
    });

    it('should return the result from repository', async () => {
      const userEntity = new User();
      const username = 'userName';
      const mockFindOne = jest.fn();
      mockFindOne.mockReturnValue(userEntity);
      spyRepository.findOne = mockFindOne;

      expect(await service.getUserEntityByUsername(username))
        .toStrictEqual(userEntity);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
