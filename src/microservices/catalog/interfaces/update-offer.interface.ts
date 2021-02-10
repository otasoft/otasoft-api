import { UpdateOfferDto } from '../rest/dto';
/**
 * @interface IUpdateActivity
 *
 * @property {number} id
 * @property {UpdateOfferDto} updateOfferDto
 */
export interface IUpdateOffer {
  id: number;
  updateOfferDto: UpdateOfferDto;
}
