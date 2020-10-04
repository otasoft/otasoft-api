import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";
import { join } from "path";
import { AuthModule } from "src/microservices/auth/auth.module";
import { BookingModule } from "src/microservices/booking/booking.module";
import { CustomerModule } from "src/microservices/customer/customer.module";
import { MailModule } from "src/microservices/mail/mail.module";

export class GqlConfigService implements GqlOptionsFactory {
    createGqlOptions(): GqlModuleOptions {
        return {
            include: [
                AuthModule,
                CustomerModule,
                MailModule,
                BookingModule
            ],
            autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql')
        }
    }
}