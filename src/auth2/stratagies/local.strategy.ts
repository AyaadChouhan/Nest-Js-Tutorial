import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authservice: AuthService) {
    super();
  }

  validate(username: string, password: string) {
    console.log('inside localStrategy');
    const user = this.authservice.validateUser({ username, password });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
