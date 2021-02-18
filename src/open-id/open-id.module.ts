import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { SessionSerializer } from '@security/serializers';
import { OpenIdController } from './controllers';
import { OpenIdService } from './services';
import { OpenIdStrategyFactory } from './strategies';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [OpenIdController],
  providers: [OpenIdService, OpenIdStrategyFactory, SessionSerializer],
})
export class OpenIdModule {}
