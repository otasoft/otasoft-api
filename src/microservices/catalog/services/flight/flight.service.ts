import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  CreateFlightInput,
  UpdateFlightInput,
} from '../../graphql/input/flight';
import { GqlFlightModel } from '../../graphql/models/flight/gql-flight.model';
import { GqlTextResponseModel } from '../../graphql/models/gql-text-response.model';
import { IUpdateFlight } from '../../interfaces/flight/update-flight.interface';
import { CreateFlightDto, UpdateFlightDto } from '../../rest/dto/flight';
import { RestFlightModel } from '../../rest/models/flight/rest-flight.model';
import { RestTextResponseModel } from '../../rest/models/rest-text-response.model';
import { ClientService } from '../../../../utils/client';

@Injectable()
export class FlightService {
  constructor(
    @Inject('CATALOG_MICROSERVICE')
    private readonly catalogClient: ClientProxy,
    private readonly clientService: ClientService,
  ) {}

  async getSingleFlight(id: number): Promise<RestFlightModel | GqlFlightModel> {
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'flight', cmd: 'getSingle' },
      id,
    );
  }

  async getAllFlights(): Promise<RestFlightModel[] | GqlFlightModel[]> {
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'flight', cmd: 'getAll' },
      {},
    );
  }

  async getFlightByQuery(
    query: string,
  ): Promise<RestFlightModel[] | GqlFlightModel[]> {
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'flight', cmd: 'getFlightByQuery' },
      query,
    );
  }

  async createFlight(
    createFlightDto: CreateFlightDto | CreateFlightInput,
  ): Promise<RestFlightModel | GqlFlightModel> {
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'flight', cmd: 'create' },
      createFlightDto,
    );
  }

  async updateFlight(
    id: number,
    updateFlightDto: UpdateFlightDto | UpdateFlightInput,
  ): Promise<RestFlightModel | GqlFlightModel> {
    const updateFlightObject: IUpdateFlight = { id, updateFlightDto };
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'flight', cmd: 'update' },
      updateFlightObject,
    );
  }

  async deleteFlight(
    id: number,
  ): Promise<RestTextResponseModel | GqlTextResponseModel> {
    return this.clientService.sendMessageWithPayload(
      this.catalogClient,
      { role: 'flight', cmd: 'delete' },
      id,
    );
  }
}
