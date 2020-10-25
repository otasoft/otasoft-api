import { Test, TestingModule } from '@nestjs/testing';
import { OidcService } from '../../../services/oidc/oidc.service';
import { OidcController } from './oidc.controller';

describe('OidcController', () => {
  let controller: OidcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OidcController],
      providers: [OidcService]
    }).compile();

    controller = module.get<OidcController>(OidcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
