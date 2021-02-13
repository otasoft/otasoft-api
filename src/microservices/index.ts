import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { CatalogModule } from './catalog/catalog.module';
import { CustomerModule } from './customer/customer.module';
import { MailModule } from './mail/mail.module';
import { PaymentModule } from './payment/payment.module';

export const MicroservicesModules = [
  AuthModule,
  BookingModule,
  CatalogModule,
  CustomerModule,
  MailModule,
  PaymentModule,
];
