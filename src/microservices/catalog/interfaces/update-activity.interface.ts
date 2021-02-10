import { UpdateActivityDto } from '../rest/dto';
/**
 * @interface IUpdateActivity
 *
 * @property {number} id
 * @property {UpdateActivityDto} updateActivityDto
 */
export interface IUpdateActivity {
  id: number;
  updateActivityDto: UpdateActivityDto;
}
