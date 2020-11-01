import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GqlConfigService } from 'src/graphql/gql-config.service';
import { HealthModule } from './health/health.module';
import { CacheConfigService } from './cache/cache-config.service';
import { MicroservicesModules } from './microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync({ useClass: GqlConfigService }),
    CacheModule.registerAsync({ useClass: CacheConfigService }),
    ScheduleModule.forRoot(),
    HealthModule,
    ...MicroservicesModules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
