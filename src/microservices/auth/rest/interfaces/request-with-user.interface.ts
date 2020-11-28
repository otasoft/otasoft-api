import { Request } from 'express';
import { UserModel } from '../../models';

export interface IRequestWithUser extends Request {
  user: UserModel;
}
