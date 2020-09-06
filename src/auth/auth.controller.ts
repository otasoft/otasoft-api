import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LocalJwtAuthGuard } from './guards/local-jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signup')
    async signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    async signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signIn(authCredentialsDto);
    }

    @UseGuards(LocalJwtAuthGuard)
    @Get('/get-user-id')
    async getUserId(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.authService.getUserId(authCredentialsDto);
    }
}
