import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCarsInput } from '../../graphql/input/cars/create-cars.input';
import { UpdateCarsInput } from '../../graphql/input/cars/update-cars.input';
import { GqlCarsModel } from '../../graphql/models/cars/gql-cars.model';
import { GqlTextResponseModel } from '../../graphql/models/gql-text-response.model';
import { CreateCarsDto, UpdateCarsDto } from '../../rest/dto/cars';
import { RestCarsModel } from '../../rest/models/cars/rest-cars.model';
import { RestTextResponseModel } from '../../rest/models/rest-text-response.model';

@Injectable()
export class CarsService {
  constructor(
    @Inject('CATALOG_MICROSERVICE')
    private readonly catalogClient: ClientProxy,
  ) {}

  async getSingleCars(id: number): Promise<RestCarsModel | GqlCarsModel> {
    return this.catalogClient
      .send({ role: 'cars', cmd: 'getSingle' }, id)
      .toPromise();
  }

  async getAllCars(): Promise<RestCarsModel[] | GqlCarsModel[]> {
    return this.catalogClient
      .send({ role: 'cars', cmd: 'getAll' }, null)
      .toPromise();
  }

  async createCars(
    createCarsDto: CreateCarsDto | CreateCarsInput,
  ): Promise<RestCarsModel | GqlCarsModel> {
    return this.catalogClient
      .send({ role: 'cars', cmd: 'create' }, createCarsDto)
      .toPromise();
  }

  async updateCars(
    id: number,
    updateCarsDto: UpdateCarsDto | UpdateCarsInput,
  ): Promise<RestCarsModel | GqlCarsModel> {
    const updateCarsObject = { id, updateCarsDto };
    return this.catalogClient
      .send({ role: 'cars', cmd: 'update' }, updateCarsObject)
      .toPromise();
  }

  async deleteCars(
    id: number,
  ): Promise<RestTextResponseModel | GqlTextResponseModel> {
    return this.catalogClient
      .send({ role: 'cars', cmd: 'delete' }, id)
      .toPromise();
  }
}
