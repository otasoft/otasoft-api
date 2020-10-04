import { Test, TestingModule } from '@nestjs/testing';
import { SendgridController } from './sendgrid.controller';

describe('SendgridController', () => {
  let controller: SendgridController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendgridController],
    }).compile();

    controller = module.get<SendgridController>(SendgridController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
