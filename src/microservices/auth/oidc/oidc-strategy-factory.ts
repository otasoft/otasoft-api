import { OidcService } from '../services/oidc/oidc.service';
import { buildOpenIdClient } from './buildOpenIdClient';
import { OidcStrategy } from './oidc.strategy';

export const OidcStrategyFactory = {
  provide: 'OidcStrategy',
  useFactory: async (oidcService: OidcService) => {
    const client = await buildOpenIdClient();
    const strategy = new OidcStrategy(oidcService, client);
    return strategy;
  },
  inject: [OidcService],
};
