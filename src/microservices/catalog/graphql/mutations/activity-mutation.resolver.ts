import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ActivityService } from '../../services';
import { CreateActivityInput, UpdateActivityInput } from '../input';
import { GqlActivityModel, GqlTextResponseModel } from '../models';

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
