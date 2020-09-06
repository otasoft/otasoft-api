import { Test, TestingModule } from '@nestjs/testing';
import { FacebookAuthController } from './facebook-auth.controller';

describe('FacebookAuthController', () => {
  let controller: FacebookAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacebookAuthController],
    }).compile();

    controller = module.get<FacebookAuthController>(FacebookAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
