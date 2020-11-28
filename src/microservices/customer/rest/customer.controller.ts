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
import { CustomerService } from '../customer.service';
import { RestJwtAuthGuard } from '../../auth/rest/guards';
import { CreateCustomerProfileDto } from './dto/create-customer-profile.dto';
import { RestCustomer } from './models/customer-rest.model';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(RestJwtAuthGuard)
  @Get('/profile/:id')
  async getCustomerProfile(@Param('id') id: number): Promise<RestCustomer> {
    return this.customerService.getCustomerProfile(id);
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
