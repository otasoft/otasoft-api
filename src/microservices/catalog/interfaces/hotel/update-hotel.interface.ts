import { UpdateHotelDto } from '../../rest/dto/hotel';
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
