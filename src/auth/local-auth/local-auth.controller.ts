import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { LocalAuthService } from './local-auth.service';
import { LocalJwtAuthGuard } from './guards/local-jwt-auth.guard';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';

@Controller('local-auth')
export class LocalAuthController {
    constructor(private readonly localAuthService: LocalAuthService) { }

    @Post('/signup')
    async signUp(@Body() signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        return this.localAuthService.signUp(signUpCredentialsDto);
    }

    @Post('/signin')
    async signIn(@Body() signInCredentialsDto: SignInCredentialsDto) {
        return this.localAuthService.signIn(signInCredentialsDto);
    }

    @UseGuards(LocalJwtAuthGuard)
    @Get('/get-user-id')
    async getUserId(@Body() signInCredentialsDto: SignInCredentialsDto) {
        return this.localAuthService.getUserId(signInCredentialsDto);
    }

    @Get('/confirm/:token')
    async confirmAccountCreation(@Param('token') token: string) {
        return this.localAuthService.confirmAccountCreation(token);
    }
}
