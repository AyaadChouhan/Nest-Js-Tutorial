import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthPayLoadDto } from './Dto/auth.dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guards';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Body() authPayLoad: AuthPayLoadDto) {
    const user = this.authservice.validateUser(authPayLoad);

    return user;
  }
}
