import { ActivityService } from './activity/activity.service';
import { FlightService } from './flight/flight.service';
import { HotelService } from './hotel/hotel.service';

export const CatalogServices = [
  ActivityService,
  FlightService,
  HotelService,
];
