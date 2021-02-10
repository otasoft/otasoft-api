import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as csurf from 'csurf';

import { AppModule } from './app.module';
import { swaggerOptions } from './doc';
import {
  rateLimitConfigObject,
  createRedisSession,
  csurfConfigOptions,
} from './security/configs';
import { FrontendCookieGuard } from './security/guards';
import { ExcludeNullInterceptor, TimeoutInterceptor } from './interceptors';
import { csrfMiddleware } from './security/middlewares';
import { ErrorFilter } from './filters';

declare const module: any;

(async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.useGlobalInterceptors(
    new ExcludeNullInterceptor(),
    new TimeoutInterceptor(),
  );
  app.useGlobalFilters(new ErrorFilter());

  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(createRedisSession());
  app.use(passport.initialize());
  app.use(passport.session());

  const csrf = csurf(csurfConfigOptions);
  app.use((req, res, next) => {
    csrfMiddleware(req, res, next, csrf);
  });

  if (process.env.ENVIRONMENT === 'development') {
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('doc', app, document);
    app.use(compression());
  } else {
    app.use(helmet());
    app.use(rateLimit(rateLimitConfigObject));
    app.useGlobalGuards(new FrontendCookieGuard());
  }

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
})();
