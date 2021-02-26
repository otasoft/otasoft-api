import { UpdateCustomerProfileInput } from '../graphql/input/update-customer-profile';
import { UpdateCustomerProfileDto } from '../rest/dto/update-customer-profile.dto';

export interface IUpdateCustomerObject {
  id: number;
  updateCustomerProfileData:
    | UpdateCustomerProfileDto
    | UpdateCustomerProfileInput;
}
