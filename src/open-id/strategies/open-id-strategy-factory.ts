import { buildOpenIdClient } from '../helpers';
import { OpenIdService } from '../services';
import { OpenIdStrategy } from './open-id.strategy';

export const OpenIdStrategyFactory = {
  provide: 'OpenIdStrategy',
  inject: [OpenIdService],
  useFactory: async (openIdService: OpenIdService) => {
    const client = await buildOpenIdClient();
    const strategy = new OpenIdStrategy(openIdService, client);
    return strategy;
  },
};
