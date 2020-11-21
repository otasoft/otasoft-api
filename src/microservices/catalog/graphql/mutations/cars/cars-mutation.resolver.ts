import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CarsService } from '../../../services/cars/cars.service';
import { CreateCarsInput } from '../../input/cars/create-cars.input';
import { UpdateCarsInput } from '../../input/cars/update-cars.input';
import { GqlCarsModel } from '../../models/cars/gql-cars.model';
import { GqlTextResponseModel } from '../../models/gql-text-response.model';

@Resolver()
export class CarsMutationResolver {
  constructor(private readonly carsService: CarsService) {}

  @Mutation((returns) => GqlCarsModel)
  async createCars(
    @Args('createCarsInput') createCarsInput: CreateCarsInput,
  ): Promise<GqlCarsModel> {
    return this.carsService.createCars(createCarsInput);
  }

  @Mutation((returns) => GqlCarsModel)
  async updateCars(
    @Args('id') id: number,
    @Args('updateCarsInput') updateCarsInput: UpdateCarsInput,
  ): Promise<GqlCarsModel> {
    return this.carsService.updateCars(id, updateCarsInput);
  }

  @Mutation((returns) => GqlTextResponseModel)
  async deleteCars(@Args('id') id: number): Promise<GqlTextResponseModel> {
    return this.carsService.deleteCars(id);
  }
}
