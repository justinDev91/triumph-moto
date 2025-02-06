import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from '@domain/entities/user/UserEntity';

const createUserDto: CreateUserDto = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
};

const userArray = [
  new UserEntity(1, 'firstName #1', 'lastName #1'),
  new UserEntity(2, 'firstName #2', 'lastName #2'),
];

const oneUser = new UserEntity(1, 'firstName #1', 'lastName #1');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(oneUser),
            findAll: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn().mockResolvedValue(oneUser),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', async () => {
      const result = await usersController.create(createUserDto);

      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const result = await usersController.findAll();

      expect(usersService.findAll).toHaveBeenCalled();
      expect(result).toEqual(userArray);
    });
  });

  describe('findOne()', () => {
    it('should return a single user', async () => {
      const result = await usersController.findOne(1);

      expect(usersService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(oneUser);
    });
  });

  describe('remove()', () => {
    it('should remove a user', async () => {
      const result = await usersController.remove(1);

      expect(usersService.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
