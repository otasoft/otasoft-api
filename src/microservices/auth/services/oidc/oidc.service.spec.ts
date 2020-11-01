import { Test, TestingModule } from '@nestjs/testing';
import { OidcService } from './oidc.service';

describe('OidcService', () => {
  let service: OidcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OidcService],
    }).compile();

    service = module.get<OidcService>(OidcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
