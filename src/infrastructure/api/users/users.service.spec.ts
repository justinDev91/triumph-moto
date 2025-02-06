import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepositoryImplem } from '@adapters/user.repository.implem';
import { CreateUserUseCase } from '@application/usecases/user/CreateUserUseCase';
import { GetAllUsersUseCase } from '@application/usecases/user/GetAllUsersUseCase';
import { GetUserByIdUseCase } from '@application/usecases/user/GetUserByIdUseCase';
import { DeleteUserUseCase } from '@application/usecases/user/DeleteUserUseCase';
import { UserEntity } from '@domain/entities/user/UserEntity';
import { CreateUserDto } from './dto/create-user.dto';

const mockUserRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
};

const userArray = [
  new UserEntity(1, 'firstName #1', 'lastName #1'),
  new UserEntity(2, 'firstName #2', 'lastName #2'),
];

const oneUser = new UserEntity(1, 'firstName #1', 'lastName #1');

describe('UsersService', () => {
  let service: UsersService;
  let createUserUseCase: CreateUserUseCase;
  let getAllUsersUseCase: GetAllUsersUseCase;
  let getUserByIdUseCase: GetUserByIdUseCase;
  let deleteUserUseCase: DeleteUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepositoryImplem,
          useValue: mockUserRepository,
        },
        {
          provide: CreateUserUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(oneUser),
          },
        },
        {
          provide: GetAllUsersUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(userArray),
          },
        },
        {
          provide: GetUserByIdUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(oneUser),
          },
        },
        {
          provide: DeleteUserUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    getAllUsersUseCase = module.get<GetAllUsersUseCase>(GetAllUsersUseCase);
    getUserByIdUseCase = module.get<GetUserByIdUseCase>(GetUserByIdUseCase);
    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully create a user', async () => {
      const createUserDto: CreateUserDto = { firstName: 'firstName #1', lastName: 'lastName #1' };
      const result = await service.create(createUserDto);

      expect(createUserUseCase.execute).toHaveBeenCalledWith(
        1,
        createUserDto.firstName,
        createUserDto.lastName
      );
      expect(result).toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();

      expect(getAllUsersUseCase.execute).toHaveBeenCalled();
      expect(result).toEqual(userArray);
    });
  });

  describe('findOne()', () => {
    it('should return a single user', async () => {
      const result = await service.findOne(1);

      expect(getUserByIdUseCase.execute).toHaveBeenCalledWith(1);
      expect(result).toEqual(oneUser);
    });
  });

  describe('remove()', () => {
    it('should call the delete use case with the correct id', async () => {
      const result = await service.remove(1);

      expect(deleteUserUseCase.execute).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
