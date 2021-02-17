import {
  Controller,
  Param,
  Get,
  UseGuards,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';

import { RestJwtAuthGuard } from '@auth/rest/guards';
import { CustomerService } from '../../services';
import { CreateCustomerProfileDto, UpdateCustomerProfileDto } from '../dto';
import { RestCustomer, RestMessageModel } from '../models';
import { RestTextResponseModel } from '@catalog/rest/models';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(RestJwtAuthGuard)
  @Get('/profile/:id')
  async getCustomerProfile(@Param('id') id: number): Promise<RestCustomer> {
    return this.customerService.getCustomerProfile(id);
  }

  @Get('/get-customer-messages/:id')
  async getCustomerMessages(@Param('id') id: number): Promise<RestMessageModel[]> {
    return this.customerService.getCustomerMessages(id);
  }

  @Delete('delete-message/:id')
  async deleteMessage(@Param('id') id: number): Promise<RestTextResponseModel> {
    return this.customerService.deleteMessage(id);
  }

  @Post('/create')
  async createCustomerProfile(
    @Body() createCustomerProfileDto: CreateCustomerProfileDto,
  ): Promise<RestCustomer> {
    return this.customerService.createCustomerProfile(createCustomerProfileDto);
  }

  @UseGuards(RestJwtAuthGuard)
  @Delete('/delete/:id')
  async removeCustomerProfile(@Param('id') id: number): Promise<Boolean> {
    return this.customerService.removeCustomerProfile(id);
  }

  @UseGuards(RestJwtAuthGuard)
  @Put('/update/:id')
  async updateCustomerProfile(
    @Param('id') id: number,
    @Body() updateCustomerProfileDto: UpdateCustomerProfileDto,
  ): Promise<RestCustomer> {
    return this.customerService.updateCustomerProfile(
      id,
      updateCustomerProfileDto,
    );
  }
}
