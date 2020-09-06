import { Test, TestingModule } from '@nestjs/testing';
import { LocalAuthService } from './local-auth.service';

describe('LocalAuthService', () => {
  let service: LocalAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalAuthService],
    }).compile();

    service = module.get<LocalAuthService>(LocalAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
