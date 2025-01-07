import { Injectable } from '@nestjs/common';
import { AuthPayLoadDto } from './Dto/auth.dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
const fakeUser = [
  {
    id: 1,
    username: 'ayaad',
    password: 'ayaad123',
  },
  {
    id: 2,
    username: 'chouhan',
    password: 'chouhan123',
  },
];
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser({ username, password }: AuthPayLoadDto) {
    const findUser = fakeUser.find((user) => {
      return user.username === username;
    });
    if (!findUser) return null;
    if (password === findUser.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
}
