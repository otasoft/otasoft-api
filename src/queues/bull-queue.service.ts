import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JobOptions, Queue } from 'bull';

@Injectable()
export class BullQueueService {
  constructor(
    @InjectQueue(process.env.QUEUE_NAME)
    private readonly queue: Queue,
  ) {}

  async addJobToQueue(
    jobName: string,
    customData?: any,
    customOptions?: JobOptions,
  ) {
    await this.queue.add(jobName, customData, customOptions);
  }
}
