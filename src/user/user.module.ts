import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService]
})
export class UserModule {}
