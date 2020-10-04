import { Controller, Param, Get, UseGuards, Post, Body, Delete, Put } from '@nestjs/common';
import { CustomerService } from '../customer.service';
import { JwtAuthGuard } from 'src/microservices/auth/guards/jwt-auth.guard';
import { CreateCustomerProfileDto } from './dto/create-customer-profile.dto';
import { RestCustomer } from './models/customer-rest.model';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService
    ) {}

    // Auth microservice must be working to check whether the customer is signed in, in development of just customer microservice, comment following line.
    @UseGuards(JwtAuthGuard)
    @Get('/profile/:id')
    async getCustomerProfile(
        @Param('id') id: number
    ): Promise<RestCustomer> {
        return this.customerService.getCustomerProfile(id);
    }

    @Post('/create')
    async createCustomerProfile(
        @Body() createCustomerProfileDto: CreateCustomerProfileDto
    ): Promise<RestCustomer> {
        return this.customerService.createCustomerProfile(createCustomerProfileDto);
    }

    @Delete('/delete/:id')
    async removeCustomerProfile(
        @Param('id') id: number
    ): Promise<Boolean> {
        return this.customerService.removeCustomerProfile(id);
    }

    @Put('/update/:id')
    async updateCustomerProfile(
        @Param('id') id: number,
        @Body() updateCustomerProfileDto: UpdateCustomerProfileDto
    ): Promise<RestCustomer> {
        return this.customerService.updateCustomerProfile(id, updateCustomerProfileDto);
    }
}
