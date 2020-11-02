import { UpdateCarsDto } from "../../rest/dto/cars";
/**
 * @interface IUpdateCars
 * 
 * @property {number} id
 * @property {UpdateCarsDto} updateCarsDto
 */
export interface IUpdateCars {
    id: number,
    updateCarsDto: UpdateCarsDto,
}