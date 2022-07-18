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
import { Usr } from './user.decorator';
import { UpdateUserRequest } from './models';
import { AuthUser } from '../auth/auth-user';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRequest: UpdateUserRequest,
    @Usr() user: AuthUser,
  ): Promise<void> {
    if (id !== user.id) {
      throw new UnauthorizedException();
    }
    await this.userService.updateUser(id, updateRequest);
  }
}
