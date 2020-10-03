import { IsInt, IsString } from "class-validator";

export class RestLocalAuthUser {
    @IsInt()
    auth_id: number;

    @IsString()
    token: string;
}