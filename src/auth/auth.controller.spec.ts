import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { default as config } from '../config';
import { PassportModule } from '@nestjs/passport';

describe('Auth Controller', () => {
  let controller: AuthController;
  let spyService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        JwtModule.register({
          secret: config.jwt.secretOrKey,
          signOptions: {
            expiresIn: config.jwt.expiresIn,
          },
        }),
        PassportModule.register({ defaultStrategy: 'jwt' })],
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
        }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    spyService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
