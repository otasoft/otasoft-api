import { Args, Query, Resolver } from '@nestjs/graphql';

import { ActivityService } from '../../services';
import { GqlActivityModel } from '../models';

@Resolver()
export class ActivityQueryResolver {
  constructor(private readonly activityService: ActivityService) {}

  @Query((returns) => GqlActivityModel)
  async getSingleActivity(@Args('id') id: number): Promise<GqlActivityModel> {
    return this.activityService.getSingleActivity(id);
  }

  @Query((returns) => GqlActivityModel)
  async getAllActivities(): Promise<GqlActivityModel[]> {
    return this.activityService.getAllActivities();
  }
}
