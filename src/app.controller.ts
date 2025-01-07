import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './user/role.guard';
import { CONSTANTS } from './constants';

@Controller('myapp')
export class AppController {
  constructor(private readonly authservice: AuthService) {}

  @Post()
  @UseGuards(AuthGuard('local'))
  getHello(@Req() req: any): string {
    return this.authservice.generateToken(req.user);
  }

  @Get('/android')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.ANDROID_DEVELOPER))
  androidDeveloperData(@Req() req: any): string {
    return (
      'this is private data for android developer' + JSON.stringify(req.user)
    );
  }
  @Get('/web')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.WEB_DEVELOPER))
  webDeveloperData(@Req() req: any): string {
    return (
      'this is private data for android developer' + JSON.stringify(req.user)
    );
  }
}
