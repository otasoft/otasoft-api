import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ActivityService } from '../../services';
import { CreateActivityDto, UpdateActivityDto } from '../dto';
import { RestActivityModel } from '../models';
import { RestTextResponseModel } from '../models';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('/all-activities')
  async getAllActivities(): Promise<RestActivityModel[]> {
    return this.activityService.getAllActivities();
  }

  @Get('/activities-by-query')
  async getActivitiesByQuery(
    @Query('query') query: string,
  ): Promise<RestActivityModel[]> {
    return this.activityService.getActivitiesByQuery(query);
  }

  @Get('/:id')
  async getSingleActivity(@Param('id') id: number): Promise<RestActivityModel> {
    return this.activityService.getSingleActivity(id);
  }

  @Post('/create')
  async createActivity(
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<RestActivityModel> {
    return this.activityService.createActivity(createActivityDto);
  }

  @Put('/:id/update')
  async updateActivity(
    @Param('id') id: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<RestActivityModel> {
    return this.activityService.updateActivity(id, updateActivityDto);
  }

  @Delete('/:id/delete')
  async deleteActivity(
    @Param('id') id: number,
  ): Promise<RestTextResponseModel> {
    return this.activityService.deleteActivity(id);
  }
}
