import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as requestIp from 'request-ip';
import { AppModule } from './app.module';

async function bootstrap() {
  // CORS is enabled
  const app = await NestFactory.create(AppModule, { cors: true });

  // Request Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(requestIp.mw());

  // Helmet Middleware against known security vulnerabilities
  app.use(helmet());

  // Rate limiting against brute-force attacks
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 500, // limit each IP to 500 requests per windowMs
      message: 'Too many requests from this IP, please try again later',
      keyGenerator: (req) => requestIp.getClientIp(req),
    }),
  );

  const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 10, // start blocking after 10 requests
    message:
      'Too many accounts created from this IP, please try again after an hour',
    keyGenerator: (req) => requestIp.getClientIp(req),
  });
  app.use('/auth/signup', signupLimiter);

  // Swagger API Documentation
  const options = new DocumentBuilder()
    .setTitle('NestJS Hackathon Starter by @ahmetuysal')
    .setDescription('NestJS Hackathon Starter API description')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000, '127.0.0.1');
}

bootstrap();
