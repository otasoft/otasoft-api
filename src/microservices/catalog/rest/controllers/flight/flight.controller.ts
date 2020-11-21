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
import { FlightService } from '../../../services/flight/flight.service';
import { CreateFlightDto, UpdateFlightDto } from '../../dto/flight';
import { RestFlightModel } from '../../models/flight/rest-flight.model';
import { RestTextResponseModel } from '../../models/rest-text-response.model';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Get('/all-flights')
  async getAllFlights(): Promise<RestFlightModel[]> {
    return this.flightService.getAllFlights();
  }

  @Get('/flight-by-query')
  async getFlightByQuery(
    @Query('query') query: string,
  ): Promise<RestFlightModel[]> {
    return this.flightService.getFlightByQuery(query);
  }

  @Get('/:id')
  async getSingleFlight(@Param('id') id: number): Promise<RestFlightModel> {
    return this.flightService.getSingleFlight(id);
  }

  @Post('/create')
  async createFlight(
    @Body() createFlightDto: CreateFlightDto,
  ): Promise<RestFlightModel> {
    return this.flightService.createFlight(createFlightDto);
  }

  @Put('/:id/update')
  async updateFlight(
    @Param('id') id: number,
    @Body() updateFlightDto: UpdateFlightDto,
  ): Promise<RestFlightModel> {
    return this.flightService.updateFlight(id, updateFlightDto);
  }

  @Delete('/:id/delete')
  async deleteFlight(@Param('id') id: number): Promise<RestTextResponseModel> {
    return this.flightService.deleteFlight(id);
  }
}
