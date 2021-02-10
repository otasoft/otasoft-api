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
import { CarsService } from '../../../services/cars/cars.service';
import { CreateCarsDto, UpdateCarsDto } from '../../dto/cars';
import { RestCarsModel } from '../../models/cars/rest-cars.model';
import { RestTextResponseModel } from '../../models/rest-text-response.model';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get('/all-cars')
  async getAllCars(): Promise<RestCarsModel[]> {
    return this.carsService.getAllCars();
  }

  @Get('/cars-by-query')
  async geCarsByQuery(@Query('query') query: string): Promise<RestCarsModel[]> {
    return this.carsService.getCarsByQuery(query);
  }

  @Get('/:id')
  async getSingleCars(@Param('id') id: number): Promise<RestCarsModel> {
    return this.carsService.getSingleCars(id);
  }

  @Post('/create')
  async createCars(
    @Body() createCarsDto: CreateCarsDto,
  ): Promise<RestCarsModel> {
    return this.carsService.createCars(createCarsDto);
  }

  @Put('/:id/update')
  async updateCars(
    @Param('id') id: number,
    @Body() updateCarsDto: UpdateCarsDto,
  ): Promise<RestCarsModel> {
    return this.carsService.updateCars(id, updateCarsDto);
  }

  @Delete('/:id/delete')
  async deleteCars(@Param('id') id: number): Promise<RestTextResponseModel> {
    return this.carsService.deleteCars(id);
  }
}