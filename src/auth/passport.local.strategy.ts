import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/user/Utils/user.utils';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userservice: UserService) {
    super();
  }

  validate(username: string, pass: string): User {
    const user = this.userservice.getUserByName(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.password === pass) {
      return user;
    } else {
      throw new HttpException('user not found', 401);
    }
  }
}
