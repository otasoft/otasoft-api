import { Module } from '@nestjs/common';
import { LocalAuthModule } from './local-auth/local-auth.module';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { FacebookAuthModule } from './facebook-auth/facebook-auth.module';

@Module({
  imports: [
    LocalAuthModule,
    GoogleAuthModule,
    FacebookAuthModule,
  ],
})
export class AuthModule {}
