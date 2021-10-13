import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {
    fakeAuthService = {
      // signup: () => { },
      signin: (email: string, password: string) => { return Promise.resolve({ id: 1, email, password } as User) }
    }
    fakeUsersService = {
      findOne: (id: number) => { return Promise.resolve({ id, email: 'fake@email.com', password: '123456' } as User) },
      find: (email: string) => { return Promise.resolve([{ id: 1, email, password: '123456' } as User]) },
      // remove: () => { },
      // update: () => { }
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: fakeUsersService
      }, {
        provide: AuthService,
        useValue: fakeAuthService
      }]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('fake@email.com')
    expect(users.length).toEqual(1)
    expect(users[0].email).toEqual('fake@email.com')
  })

  it('findUser should return the correspoding user', async () => {
    const user = await controller.findUser('1')
    expect(user).toBeDefined()
  })

  it('findUser throws an error if user with given id does not exist', async () => {
    fakeUsersService.findOne = () => null
    try {
      await controller.findUser('100')
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException)
    }
  })

  it('signin updates session object and return user', async () => {
    const session = { userId: -10 }
    const user = await controller.signin({ email: 'fake@email.com', password: '123456' }, session)
    expect(user.id).toEqual(1)
    expect(session.userId).toEqual(1)
  })
});

