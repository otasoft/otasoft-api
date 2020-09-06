import { Test, TestingModule } from '@nestjs/testing';
import { FacebookAuthService } from './facebook-auth.service';

describe('FacebookAuthService', () => {
  let service: FacebookAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacebookAuthService],
    }).compile();

    service = module.get<FacebookAuthService>(FacebookAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
