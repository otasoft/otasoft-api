import { HttpModule, Module } from '@nestjs/common';

import { axiosAsyncConfig } from './config';

@Module({
  imports: [HttpModule.registerAsync(axiosAsyncConfig)],
})
export class AxiosWrapperModule {}
