import { Controller, Param, Get, UseGuards, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { LocalJwtAuthGuard } from 'src/auth/local-auth/guards/local-jwt-auth.guard';
import { CreateCustomerProfileDto } from './dto/create-customer-profile.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @UseGuards(LocalJwtAuthGuard)
    @Get('/profile/:id')
    async getCustomerProfie(@Param('id') id) {
        return this.customerService.getCustomerProfile(id);
    }

    @Post('/create')
    async createCustomerProfile(@Body() createCustomerProfileDto: CreateCustomerProfileDto) {
        return this.customerService.createCustomerProfile(createCustomerProfileDto);
    }
}
