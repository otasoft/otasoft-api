import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { LocalAuthService } from '../local-auth.service';
import { LocalJwtAuthGuard } from '../guards/local-jwt-auth.guard';
import { LocalAuthCredentialsDto } from './dto/local-auth-credentials.dto';
import { RestLocalAuthUserToken } from './models/local-auth-user-token-rest.model';
import { RestLocalAuthUserId } from './models/local-auth-user-id-rest.model';


@Controller('local-auth')
export class LocalAuthController {
    constructor(private readonly localAuthService: LocalAuthService) { }

    @Post('/signup')
    async signUp(@Body() localAuthCredentialsDto: LocalAuthCredentialsDto): Promise<void> {
        return this.localAuthService.signUp(localAuthCredentialsDto);
    }

    @Post('/signin')
    async signIn(@Body() localAuthCredentialsDto: LocalAuthCredentialsDto): Promise<RestLocalAuthUserToken> {
        return this.localAuthService.signIn(localAuthCredentialsDto);
    }

    @UseGuards(LocalJwtAuthGuard)
    @Get('/get-user-id')
    async getUserId(@Body() localAuthCredentialsDto: LocalAuthCredentialsDto): Promise<RestLocalAuthUserId> {
        return this.localAuthService.getUserId(localAuthCredentialsDto);
    }

    @Get('/confirm/:token')
    async confirmAccountCreation(@Param('token') token: string): Promise<boolean> {
        return this.localAuthService.confirmAccountCreation(token);
    }
}
