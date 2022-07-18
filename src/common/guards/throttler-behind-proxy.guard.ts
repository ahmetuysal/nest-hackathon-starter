import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';
import * as requestIp from 'request-ip';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, unknown>): string {
    return (
      requestIp.getClientIp(req as unknown as requestIp.Request) ?? 'null-ip'
    );
  }
}
