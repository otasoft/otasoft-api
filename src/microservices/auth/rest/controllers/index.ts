import { AuthController } from './auth/auth.controller';
import { OidcController } from './oidc/oidc.controller';
import { UserController } from './user/user.controller';

export const AuthControllers = [AuthController, OidcController, UserController];
