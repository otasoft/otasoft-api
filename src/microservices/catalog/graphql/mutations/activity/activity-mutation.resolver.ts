import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ActivityService } from '../../../services/activity/activity.service';
import { CreateActivityInput } from '../../input/activity/create-activity.input';
import { UpdateActivityInput } from '../../input/activity/update-activity.input';
import { GqlActivityModel } from '../../models/activity/gql-activity.model';
import { GqlTextResponseModel } from '../../models/gql-text-response.model';

@Resolver()
export class ActivityMutationResolver {
  constructor(private readonly activityService: ActivityService) {}

  @Mutation((returns) => GqlActivityModel)
  async createActivity(
    @Args('createActivityInput') createActivityInput: CreateActivityInput,
  ): Promise<GqlActivityModel> {
    return this.activityService.createActivity(createActivityInput);
  }

  @Mutation((returns) => GqlActivityModel)
  async updateActivity(
    @Args('id') id: number,
    @Args('updateActivityInput') updateActivityInput: UpdateActivityInput,
  ): Promise<GqlActivityModel> {
    return this.activityService.updateActivity(id, updateActivityInput);
  }

  @Mutation((returns) => GqlTextResponseModel)
  async deleteActivity(@Args('id') id: number): Promise<GqlTextResponseModel> {
    return this.activityService.deleteActivity(id);
  }
}
