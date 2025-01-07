import { Injectable } from '@nestjs/common';
import { User } from './Utils/user.utils';
import { CONSTANTS } from 'src/constants';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      username: 'ayaad',
      password: '123',
      email: '1abcGmail.com',
      role: CONSTANTS.ROLES.WEB_DEVELOPER,
    },
    {
      username: 'khan',
      password: '124',
      email: '2abcGmail.com',
      role: CONSTANTS.ROLES.ANDROID_DEVELOPER,
    },
    {
      username: 'chouhan',
      password: '125',
      email: '3abcGmail.com',
      role: CONSTANTS.ROLES.ANDROID_DEVELOPER,
    },
  ];

  getUserByName(username: string): User {
    return this.users.find((user: User) => user.username === username);
  }
}
