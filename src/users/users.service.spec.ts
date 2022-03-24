import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ChannelMembers } from '../entities/ChannelMembers';
import { Users } from '../entities/Users';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { UsersService } from './users.service';

class MockUserRepository {
  #data = [{ id: 1, email: 'zerohch0@gmail.com' }];
  findOne({ where: { email } }) {
    const data = this.#data.find((v) => v.email === email);
    if (data) {
      return data;
    }
    return null;
  }
}
class MockWorkspaceMembersRepository {}
class MockChannelMembersRepository {}
class MockConnection {}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: MockUserRepository,
        },
        {
          provide: getRepositoryToken(WorkspaceMembers),
          useClass: MockWorkspaceMembersRepository,
        },
        {
          provide: getRepositoryToken(ChannelMembers),
          useClass: MockChannelMembersRepository,
        },
        {
          provide: Connection,
          useClass: MockConnection,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  // try {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('findByEmail 은 이메일을 통해 유저를 찾아야함', () => {
      expect(service.findByEmail('adidath@gmail.com')).resolves.toStrictEqual({
        email: 'adidath@gmail.com',
        id: 1
      })
    });

    it('findByEmail 못찾으면 null', () => {
      expect(service.findByEmail('adidath@ggggmail.com')).resolves.toBe(null)
    })
  // } catch (error) {
  //   throw new Error(error);
  // }
});
