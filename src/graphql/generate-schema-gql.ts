import { NestFactory } from "@nestjs/core";
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from "@nestjs/graphql";
import { printSchema } from "graphql";
import { AuthModule } from "src/microservices/auth/auth.module";
import { BookingModule } from "src/microservices/booking/booking.module";
import { CustomerModule } from "src/microservices/customer/customer.module";
import { MailModule } from "src/microservices/mail/mail.module";

async function generateSchema() {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule);
    await app.init();
  
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([
        AuthModule,
        CustomerModule,
        MailModule,
        BookingModule
    ]);
    console.log(printSchema(schema));
  }