import { CacheModule, Global, Module } from "@nestjs/common";
import { CacheConfigService } from "./cache-config.service";

@Global()
@Module({
    imports: [
        CacheModule.registerAsync({ useClass: CacheConfigService }),
    ],
    exports: [CacheModule]
})
export class RedisCacheModule {}