import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Inject,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceConnectionService } from '../../../../microservices/microservice-connection/microservice-connection.service';
import {
  CreateActivityInput,
  UpdateActivityInput,
} from '../../graphql/input/activity';
import { GqlActivityModel } from '../../graphql/models/activity/gql-activity.model';
import { GqlTextResponseModel } from '../../graphql/models/gql-text-response.model';
import { IUpdateActivity } from '../../interfaces/activity/update-activity.interface';
import { CreateActivityDto, UpdateActivityDto } from '../../rest/dto/activity';
import { RestActivityModel } from '../../rest/models/activity/rest-activity.model';
import { RestTextResponseModel } from '../../rest/models/rest-text-response.model';

@Injectable()
export class ActivityService {
  constructor(
    @Inject('CATALOG_MICROSERVICE')
    private readonly catalogClient: ClientProxy,
    private readonly microserviceConnectionService: MicroserviceConnectionService,
  ) {}

  async getSingleActivity(
    id: number,
  ): Promise<RestActivityModel | GqlActivityModel> {
    return this.microserviceConnectionService.sendRequestToClient(
      this.catalogClient,
      { role: 'activity', cmd: 'getSingle' },
      id,
    );
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('all-activities')
  @CacheTTL(20)
  async getAllActivities(): Promise<RestActivityModel[] | GqlActivityModel[]> {
    return this.microserviceConnectionService.sendRequestToClient(
      this.catalogClient,
      { role: 'activity', cmd: 'getAll' },
      {},
    );
  }

  async getActivitiesByQuery(
    query: string,
  ): Promise<RestActivityModel[] | GqlActivityModel[]> {
    return this.microserviceConnectionService.sendRequestToClient(
      this.catalogClient,
      { role: 'activity', cmd: 'getActivityByQuery' },
      query,
    );
  }

  async createActivity(
    createActivityDto: CreateActivityDto | CreateActivityInput,
  ): Promise<RestActivityModel | GqlActivityModel> {
    return this.microserviceConnectionService.sendRequestToClient(
      this.catalogClient,
      { role: 'activity', cmd: 'create' },
      createActivityDto,
    );
  }

  async updateActivity(
    id: number,
    updateActivityDto: UpdateActivityDto | UpdateActivityInput,
  ): Promise<RestActivityModel | GqlActivityModel> {
    const updateActivityObject: IUpdateActivity = { id, updateActivityDto };
    return this.microserviceConnectionService.sendRequestToClient(
      this.catalogClient,
      { role: 'activity', cmd: 'update' },
      updateActivityObject,
    );
  }

  async deleteActivity(
    id: number,
  ): Promise<RestTextResponseModel | GqlTextResponseModel> {
    return this.microserviceConnectionService.sendRequestToClient(
      this.catalogClient,
      { role: 'activity', cmd: 'delete' },
      id,
    );
  }
}
