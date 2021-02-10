import { ActivityQueryResolver } from './activity/activity-query.resolver';
import { HotelQueryResolver } from './hotel/hotel-query.resolver';

export const CatalogQueries = [
  ActivityQueryResolver,
  HotelQueryResolver,
];
