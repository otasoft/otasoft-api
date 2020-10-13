import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { swaggerOptions } from './doc/swagger-options';
import { rateLimitConfigObject } from './security/configs/rateLimitConfig';
import { httpsOptions } from './security/configs/httpsOptions';

(async function bootstrap() {
  const app = process.env.SERVE_LOCAL_SSL
    ? await NestFactory.create(AppModule, { httpsOptions })
    : await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  if (process.env.ENVIRONMENT === 'development') {
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('doc', app, document);
  } else {
    app.use(helmet());
    app.use(rateLimit(rateLimitConfigObject));
  }

  await app.listen(3000);
})();
