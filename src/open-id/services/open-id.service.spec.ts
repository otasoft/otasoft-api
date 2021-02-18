import { Test, TestingModule } from '@nestjs/testing';
import { OpenIdService } from './open-id.service';

describe('OpenIdService', () => {
  let service: OpenIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenIdService],
    }).compile();

    service = module.get<OpenIdService>(OpenIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
