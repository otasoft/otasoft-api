import { Args, Query, Resolver } from '@nestjs/graphql';
import { ActivityService } from '../../../services/activity/activity.service';
import { GqlActivityModel } from '../../models/activity/gql-activity.model';

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
