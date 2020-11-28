import { AuthService } from "./auth/auth.service";
import { OidcService } from "./oidc/oidc.service";
import { UserService } from "./user/user.service";

export const AuthServices = [
    AuthService,
    OidcService,
    UserService,
];