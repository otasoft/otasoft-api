import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class AuthCredentialsDto {
  @MinLength(8)
  @MaxLength(20)
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
