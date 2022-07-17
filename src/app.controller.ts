import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health-check')
@Controller('')
export class AppController {
  @Get()
  @HttpCode(HttpStatus.OK)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  healthCheck(): void {}
}
