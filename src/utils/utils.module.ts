import { Global, Module } from '@nestjs/common';

import { ClientService } from './client';

@Global()
@Module({
    providers: [ClientService],
    exports: [ClientService],
})
export class UtilsModule {}
