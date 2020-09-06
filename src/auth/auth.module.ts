import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { LocalAuthModule } from './local-auth/local-auth.module';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { FacebookAuthModule } from './facebook-auth/facebook-auth.module';
// import { MicroserviceConnectorModule } from './microservice-connector/microservice-connector.module';

@Module({
  imports: [
    // ClientsModule.register([{
    //   name: 'AUTH_MICROSERVICE',
    //   transport: Transport.TCP,
    //   options: {
    //     host: '127.0.0.1',
    //     port: 64321
    //   }
    // }]),
    LocalAuthModule,
    GoogleAuthModule,
    FacebookAuthModule,
    // MicroserviceConnectorModule,
  ],
})
export class AuthModule {}
