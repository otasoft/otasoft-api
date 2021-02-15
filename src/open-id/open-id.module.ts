import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { OpenIdController } from './controllers';
import { OpenIdService } from './services';
import { OpenIdStrategyFactory } from './strategies';
import { SessionSerializer } from '../security/serializers';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [OpenIdController],
  providers: [OpenIdService, OpenIdStrategyFactory, SessionSerializer],
})
export class OpenIdModule {}
