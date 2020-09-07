import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet'
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { swaggerOptions } from './doc/swagger-options'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests sent from this IP Address"
  });
  app.use(rateLimiter);

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
