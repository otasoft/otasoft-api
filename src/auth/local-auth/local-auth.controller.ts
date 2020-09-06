import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { LocalAuthService } from './local-auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LocalJwtAuthGuard } from './guards/local-jwt-auth.guard';

@Controller('local-auth')
export class LocalAuthController {
    constructor(private readonly localAuthService: LocalAuthService) { }

    @Post('/signup')
    async signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.localAuthService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    async signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.localAuthService.signIn(authCredentialsDto);
    }

    @UseGuards(LocalJwtAuthGuard)
    @Get('/get-user-id')
    async getUserId(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.localAuthService.getUserId(authCredentialsDto);
    }
}
