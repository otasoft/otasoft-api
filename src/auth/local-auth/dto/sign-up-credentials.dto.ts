import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';

export class SignUpCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(30)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'password too weak' },
    )
    password: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    first_name: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    last_name: string;
}