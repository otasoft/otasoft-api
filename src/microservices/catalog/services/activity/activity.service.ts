import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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
        id: number
    ): Promise<RestActivityModel> {
        return this.catalogClient.send({ role: 'activity', cmd: 'getSingle' }, id).toPromise();
    }

    async getAllActivities(): Promise<RestActivityModel[]> {
        return this.catalogClient.send({ role: 'activity', cmd: 'getAll' }, null).toPromise();
    }

    async createActivity(
        createActivityDto: CreateActivityDto
    ): Promise<RestActivityModel> {
        return this.catalogClient.send({ role: 'activity', cmd: 'create' }, createActivityDto).toPromise();
    }

    async updateActivity(
        id: number,
        updateActivityDto: UpdateActivityDto
    ): Promise<RestActivityModel> {
        const updateActivityObject = { id, updateActivityDto };
        return this.catalogClient.send({ role: 'activity', cmd: 'update' }, updateActivityObject).toPromise();
    }

    async deleteActivity(
        id: number
    ): Promise<RestTextResponseModel> {
        return this.catalogClient.send({ role: 'activity', cmd: 'delete' }, id).toPromise();
    }
}
