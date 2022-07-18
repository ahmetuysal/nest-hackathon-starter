import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import config from '../config';
import { JwtStrategy } from './jwt.strategy';
import { MailSenderModule } from '../mail-sender/mail-sender.module';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.jwt.secretOrKey,
      signOptions: {
        expiresIn: config.jwt.expiresIn,
      },
    }),
    MailSenderModule,
  ],
  providers: [AuthService, JwtStrategy, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
