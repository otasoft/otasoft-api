import { IsString } from "class-validator";

export class RestLocalAuthUserToken {

    @IsString()
    token: string;
}