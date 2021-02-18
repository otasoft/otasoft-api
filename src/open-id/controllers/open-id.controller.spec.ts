import { Test, TestingModule } from '@nestjs/testing';
import { OpenIdController } from './open-id.controller';

describe('OpenIdController', () => {
  let controller: OpenIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenIdController],
    }).compile();

    controller = module.get<OpenIdController>(OpenIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
