import { AuthMutationResolver } from './auth-mutation.resolver';
import { UserMutationResolver } from './user-mutation.resolver';

export const AuthMutations = [AuthMutationResolver, UserMutationResolver];
