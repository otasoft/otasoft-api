import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActivityService } from '../../../services/activity/activity.service';
import { CreateActivityDto, UpdateActivityDto } from '../../dto/activity'
import { RestActivityModel } from '../../models/activity/rest-activity.model';
import { RestTextResponseModel } from '../../models/rest-text-response.model';

@Controller('activity')
export class ActivityController {
    constructor(private readonly activityService: ActivityService) {}

    @Get('/:id')
    async getSingleActivity(
        @Param('id') id: number
    ): Promise<RestActivityModel> {
        return this.activityService.getSingleActivity(id);
    }

    @Get('/all-activities')
    async getAllActivities(): Promise<RestActivityModel[]> {
        return this.activityService.getAllActivities();
    }

    @Post('create-activity')
    async createActivity(
        @Body() createActivityDto: CreateActivityDto
    ): Promise<RestActivityModel> {
        return this.activityService.createActivity(createActivityDto);
    }

    @Put('/:id/update')
    async updateActivity(
        @Param('id') id: number,
        @Body() updateActivityDto: UpdateActivityDto
    ): Promise<RestActivityModel> {
        return this.activityService.updateActivity(id, updateActivityDto);
    }

    @Delete('/:id/delete')
    async deleteActivity(
        @Param('id') id: number,
    ): Promise<RestTextResponseModel> {
        return this.activityService.deleteActivity(id)
    }
}
