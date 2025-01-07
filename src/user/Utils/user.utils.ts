import { Injectable } from '@nestjs/common';

@Injectable()
export class User {
  username: string;
  password: string;
  email: string;
  role: string;
}
