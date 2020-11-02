import { UpdateFlightDto } from "../../rest/dto/flight";
/**
 * @interface IUpdateFlight
 * 
 * @property {number} id
 * @property {UpdateFlightDto} updateFlightDto
 */
export interface IUpdateFlight {
    id: number,
    updateFlightDto: UpdateFlightDto,
}