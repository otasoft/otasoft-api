import { ActivityController } from './activity/activity.controller';
import { CarsController } from './cars/cars.controller';
import { FlightController } from './flight/flight.controller';
import { HotelController } from './hotel/hotel.controller';

export const CatalogControllers = [
  ActivityController,
  HotelController,
  CarsController,
  FlightController,
];
