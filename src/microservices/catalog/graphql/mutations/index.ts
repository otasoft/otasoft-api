import { ActivityMutationResolver } from './activity/activity-mutation.resolver';
import { CarsMutationResolver } from './cars/cars-mutation.resolver';
import { FlightMutationResolver } from './flight/flight-mutation.resolver';
import { HotelMutationResolver } from './hotel/hotel-mutation.resolver';

export const CatalogMutations = [
    ActivityMutationResolver,
    HotelMutationResolver,
    CarsMutationResolver,
    FlightMutationResolver
]