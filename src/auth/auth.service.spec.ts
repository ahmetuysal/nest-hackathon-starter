import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { EmailVerification } from './email-verification.entity';
import { EmailChange } from './email-change.entity';
import { PasswordReset } from './password-reset.entity';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { UserService } from '../user/user.service';
import config from '../config';

describe('AuthService', () => {
  let service: AuthService;
  // mock services
  let spyMailSenderService: MailSenderService;
  let spyUserService: UserService;
  let spyJwtService: JwtService;
  // mock repositories
  let spyEmailVerificationRepository: Repository<EmailVerification>;
  let spyEmailChangeRepository: Repository<EmailChange>;
  let spyPasswordResetRepository: Repository<PasswordReset>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: config.jwt.secretOrKey,
          signOptions: {
            expiresIn: config.jwt.expiresIn,
          },
        })],
      providers: [
        AuthService,
        MailSenderService,
        UserService,
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
        {
          provide: 'EmailVerificationRepository',
          useClass: Repository,
        },
        {
          provide: 'EmailChangeRepository',
          useClass: Repository,
        },
        {
          provide: 'PasswordResetRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    spyMailSenderService = module.get<MailSenderService>(MailSenderService);
    spyUserService = module.get<UserService>(UserService);
    spyJwtService = module.get<JwtService>(JwtService);
    spyEmailVerificationRepository = module.get<Repository<EmailVerification>>('EmailVerificationRepository');
    spyEmailChangeRepository = module.get<Repository<EmailChange>>('EmailChangeRepository');
    spyPasswordResetRepository = module.get<Repository<PasswordReset>>('PasswordResetRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(spyMailSenderService).toBeDefined();
    expect(spyUserService).toBeDefined();
    expect(spyJwtService).toBeDefined();
    expect(spyEmailVerificationRepository).toBeDefined();
    expect(spyEmailChangeRepository).toBeDefined();
    expect(spyPasswordResetRepository).toBeDefined();
  });
});
