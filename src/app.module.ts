import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './microservices/auth/auth.module';
import { CustomerModule } from './microservices/customer/customer.module';
import { MailModule } from './microservices/mail/mail.module';
import { GqlConfigService } from 'src/graphql/gql-config.service';
import { BookingModule } from './microservices/booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync({ useClass: GqlConfigService }),
    AuthModule,
    CustomerModule,
    MailModule,
    BookingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
