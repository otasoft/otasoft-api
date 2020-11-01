import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  HttpException,
  Inject,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateActivityInput } from '../../graphql/input/activity/create-activity.input';
import { UpdateActivityInput } from '../../graphql/input/activity/update-activity.input';
import { GqlActivityModel } from '../../graphql/models/activity/gql-activity.model';
import { GqlTextResponseModel } from '../../graphql/models/gql-text-response.model';
import { CreateActivityDto, UpdateActivityDto } from '../../rest/dto/activity';
import { RestActivityModel } from '../../rest/models/activity/rest-activity.model';
import { RestTextResponseModel } from '../../rest/models/rest-text-response.model';

@Injectable()
export class ActivityService {
  constructor(
    @Inject('CATALOG_MICROSERVICE')
    private readonly catalogClient: ClientProxy,
  ) {}

  async getSingleActivity(
    id: number,
  ): Promise<RestActivityModel | GqlActivityModel> {
    try {
      return await this.catalogClient
        .send({ role: 'activity', cmd: 'getSingle' }, id)
        .toPromise();
    } catch (error) {
      throw new HttpException(error.errorStatus, error.statusCode);
    }
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('all-activities')
  @CacheTTL(20)
  async getAllActivities(): Promise<RestActivityModel[] | GqlActivityModel[]> {
    try {
      return await this.catalogClient
        .send({ role: 'activity', cmd: 'getAll' }, {})
        .toPromise();
    } catch (error) {
      throw new HttpException(error.errorStatus, error.statusCode);
    }
  }

  async createActivity(
    createActivityDto: CreateActivityDto | CreateActivityInput,
  ): Promise<RestActivityModel | GqlActivityModel> {
    try {
      return await this.catalogClient
        .send({ role: 'activity', cmd: 'create' }, createActivityDto)
        .toPromise();
    } catch (error) {
      throw new HttpException(error.errorStatus, error.statusCode);
    }
  }

  async updateActivity(
    id: number,
    updateActivityDto: UpdateActivityDto | UpdateActivityInput,
  ): Promise<RestActivityModel | GqlActivityModel> {
    const updateActivityObject = { id, updateActivityDto };
    try {
      return await this.catalogClient
        .send({ role: 'activity', cmd: 'update' }, updateActivityObject)
        .toPromise();
    } catch (error) {
      throw new HttpException(error.errorStatus, error.statusCode);
    }
  }

  async deleteActivity(
    id: number,
  ): Promise<RestTextResponseModel | GqlTextResponseModel> {
    try {
      return await this.catalogClient
        .send({ role: 'activity', cmd: 'delete' }, id)
        .toPromise();
    } catch (error) {
      throw new HttpException(error.errorStatus, error.statusCode);
    }
  }
}
