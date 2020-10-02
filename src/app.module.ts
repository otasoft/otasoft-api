import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { MailModule } from './mail/mail.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      include: [
        AuthModule,
        CustomerModule,
        MailModule
      ],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
    CustomerModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
