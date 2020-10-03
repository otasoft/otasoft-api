import { Test, TestingModule } from '@nestjs/testing';
import { LocalAuthController } from './local-auth.controller';

describe('LocalAuthController', () => {
  let controller: LocalAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalAuthController],
    }).compile();

    controller = module.get<LocalAuthController>(LocalAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
