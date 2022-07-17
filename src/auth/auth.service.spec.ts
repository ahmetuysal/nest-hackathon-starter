import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import { AuthService } from './auth.service';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { UserService } from '../user/user.service';
import config from '../config';
import { PrismaService } from '../common/services/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  // mock services
  let spyMailSenderService: MailSenderService;
  let spyUserService: UserService;
  let spyJwtService: JwtService;
  let spyPrismaService: MockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: config.jwt.secretOrKey,
          signOptions: {
            expiresIn: config.jwt.expiresIn,
          },
        }),
      ],
      providers: [
        AuthService,
        MailSenderService,
        UserService,
        {
          provide: PrismaService,
          useFactory: () => mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    spyMailSenderService = module.get<MailSenderService>(MailSenderService);
    spyUserService = module.get<UserService>(UserService);
    spyJwtService = module.get<JwtService>(JwtService);
    spyPrismaService = module.get(PrismaService) as MockProxy<PrismaService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(spyMailSenderService).toBeDefined();
    expect(spyUserService).toBeDefined();
    expect(spyJwtService).toBeDefined();
    expect(spyPrismaService).toBeDefined();
  });
});
