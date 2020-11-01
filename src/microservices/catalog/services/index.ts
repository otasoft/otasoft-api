import { ActivityService } from "./activity/activity.service";
import { CarsService } from "./cars/cars.service";
import { FlightService } from "./flight/flight.service";
import { HotelService } from "./hotel/hotel.service";

export const CatalogServices = [
    ActivityService,
    CarsService,
    FlightService,
    HotelService
]