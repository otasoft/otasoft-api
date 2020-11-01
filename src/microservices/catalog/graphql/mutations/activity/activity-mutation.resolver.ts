import { Resolver } from "@nestjs/graphql";
import { ActivityService } from "../../../services/activity/activity.service";

@Resolver()
export class ActivityMutationResolver {
    constructor(private readonly activityService: ActivityService) {}

}