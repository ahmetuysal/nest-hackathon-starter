import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UpdateUserRequest } from '../contract';
import { User } from './user.entity';
import { Usr } from './user.decorator';
import { updateUserEntityFields } from './user.mapper';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @ApiBearerAuth()
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
      @Body() updateRequest: UpdateUserRequest,
      @Usr() user: User,
  ): Promise<void> {
    if (id !== user.id || id !== updateRequest.user.id) {
      throw new UnauthorizedException();
    }
    const updatedUser = updateUserEntityFields(user, updateRequest.user);
    await this.userService.updateUser(updatedUser);
  }
}
