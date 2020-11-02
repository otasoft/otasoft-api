import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceConnectionService } from '../../../../microservices/microservice-connection/microservice-connection.service';
import { CreateCarsInput, UpdateCarsInput } from '../../graphql/input/cars';
import { GqlCarsModel } from '../../graphql/models/cars/gql-cars.model';
import { GqlTextResponseModel } from '../../graphql/models/gql-text-response.model';
import { IUpdateCars } from '../../interfaces/cars/update-cars.interface';
import { CreateCarsDto, UpdateCarsDto } from '../../rest/dto/cars';
import { RestCarsModel } from '../../rest/models/cars/rest-cars.model';
import { RestTextResponseModel } from '../../rest/models/rest-text-response.model';

@Injectable()
export class CarsService {
  constructor(
    @Inject('CATALOG_MICROSERVICE')
    private readonly catalogClient: ClientProxy,
    private readonly microserviceConnectionService: MicroserviceConnectionService,
  ) {}

  async getSingleCars(id: number): Promise<RestCarsModel | GqlCarsModel> {
    return this.microserviceConnectionService.sendRequestToClient(this.catalogClient, { role: 'cars', cmd: 'getSingle' }, id);
  }

  async getAllCars(): Promise<RestCarsModel[] | GqlCarsModel[]> {
    return this.microserviceConnectionService.sendRequestToClient(this.catalogClient, { role: 'cars', cmd: 'getAll' }, {});
  }

  async createCars(
    createCarsDto: CreateCarsDto | CreateCarsInput,
  ): Promise<RestCarsModel | GqlCarsModel> {
    return this.microserviceConnectionService.sendRequestToClient(this.catalogClient, { role: 'cars', cmd: 'create' }, createCarsDto);
  }

  async updateCars(
    id: number,
    updateCarsDto: UpdateCarsDto | UpdateCarsInput,
  ): Promise<RestCarsModel | GqlCarsModel> {
    const updateCarsObject: IUpdateCars = { id, updateCarsDto };
    return this.microserviceConnectionService.sendRequestToClient(this.catalogClient, { role: 'cars', cmd: 'update' }, updateCarsObject);
  }

  async deleteCars(
    id: number,
  ): Promise<RestTextResponseModel | GqlTextResponseModel> {
    return this.microserviceConnectionService.sendRequestToClient(this.catalogClient, { role: 'cars', cmd: 'delete' }, id);
  }
}
