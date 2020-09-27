import { Controller, Param, Get, UseGuards, Post, Body } from '@nestjs/common';
import { CustomerService } from '../customer.service';
import { LocalJwtAuthGuard } from 'src/auth/local-auth/guards/local-jwt-auth.guard';
import { CreateCustomerProfileDto } from './dto/create-customer-profile.dto';
import { RestCustomer } from './models/customer-rest.model';

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService
    ) {}

    // Auth microservice must be working to check whether the customer is signed in, in development of just customer microservice, comment following line.
    @UseGuards(LocalJwtAuthGuard)
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
}
