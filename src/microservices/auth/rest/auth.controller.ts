import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RestAuthUserToken } from './models/auth-user-token-rest.model';
import { RestAuthUserId } from './models/auth-user-id-rest.model';
import { RestAuthUser } from './models/auth-user-rest.model';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signup')
    async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<RestAuthUser> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<RestAuthUserToken> {
        return this.authService.signIn(authCredentialsDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get-user-id')
    async getUserId(@Body() authCredentialsDto: AuthCredentialsDto): Promise<RestAuthUserId> {
        return this.authService.getUserId(authCredentialsDto);
    }

    @Get('/confirm/:token')
    async confirmAccountCreation(@Param('token') token: string): Promise<boolean> {
        return this.authService.confirmAccountCreation(token);
    }
}
