import {
  Controller,
  Put,
  HttpCode,
  UseGuards,
  Param,
  ParseIntPipe,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserRequest } from '../contract';
import { User } from './user.entity';
import { Usr } from './user.decorator';
import { updateUserEntityFields } from './user.mapper';

@ApiUseTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Put(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRequest: UpdateUserRequest,
    @Usr() user: User,
  ): Promise<void> {
    if (id !== user.id || id !== updateRequest.user.id) {
      throw new UnauthorizedException();
    }
    updateUserEntityFields(user, updateRequest.user);
    await this.userService.updateUser(user);
  }
}
