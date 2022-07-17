import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [UserService, PrismaService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
