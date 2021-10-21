import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';

@Module({
  imports: [UserModule, AuthModule, MailSenderModule],
})
export class AppModule {
}
