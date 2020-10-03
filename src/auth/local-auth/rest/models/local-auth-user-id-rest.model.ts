import { IsInt } from "class-validator";

export class RestLocalAuthUserId {
    @IsInt()
    auth_id: number;
}