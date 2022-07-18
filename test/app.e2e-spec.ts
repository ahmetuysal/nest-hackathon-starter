import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          envFilePath: 'env/test.env',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Request Validation
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => request(app.getHttpServer()).get('/').expect(200));
});
