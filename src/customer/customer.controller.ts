import { Controller, Param, Get, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { LocalJwtAuthGuard } from 'src/auth/local-auth/guards/local-jwt-auth.guard';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @UseGuards(LocalJwtAuthGuard)
    @Get('/profile/:id')
    async getCustomerProfie(@Param('id') id) {
        return this.customerService.getCustomerProfile(id);
    }
}
