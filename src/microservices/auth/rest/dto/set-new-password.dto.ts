import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class SetNewPasswordDto {
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  new_password: string;
}
