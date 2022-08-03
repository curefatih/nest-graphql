import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

const createUserInput: CreateUserInput = {
  email: 'test@testmail.com',
  password: '1234',
};

const loginUserInput: LoginUserInput = {
  email: 'test@testmail.com',
  password: '1234',
};

const userId = new mongoose.Types.ObjectId();

const access_token = 'access_token';
describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(() =>
              Promise.resolve({
                _id: userId,
                ...createUserInput,
              }),
            ),
            findById: jest.fn(() =>
              Promise.resolve({
                _id: userId,
                ...createUserInput,
              }),
            ),
            loginUser: jest.fn(() =>
              Promise.resolve({
                access_token,
              }),
            ),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create user', async () => {
    const user = await resolver.createUser(createUserInput);
    expect(user._id).toEqual(userId);
    expect(user.email).toEqual(createUserInput.email);
  });

  it('should login', async () => {
    const token = await resolver.loginUser(loginUserInput);
    expect(token.access_token).toBeDefined();
    expect(token.access_token).toEqual(access_token);
  });

  it('should find user by its own id', async () => {
    const user = await resolver.me({
      payload: {},
      userId: userId.toString(),
    });

    expect(user._id).toEqual(userId);
    expect(user.email).toEqual(createUserInput.email);
  });
});
