import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PassportLocalStrategy } from './passport.local.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'key',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [],
  providers: [PassportLocalStrategy, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
