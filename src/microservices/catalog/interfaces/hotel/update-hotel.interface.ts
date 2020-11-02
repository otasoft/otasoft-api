import { UpdateHotelDto } from '../../rest/dto/Hotel';
/**
 * @interface IUpdateHotel
 *
 * @property {number} id
 * @property {UpdateHotelDto} updateHotelDto
 */
export interface IUpdateHotel {
  id: number;
  updateHotelDto: UpdateHotelDto;
}
