import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateHotelInput } from '../../graphql/input/hotel/create-hotel.input';
import { UpdateHotelInput } from '../../graphql/input/hotel/update-hotel.input';
import { GqlHotelModel } from '../../graphql/models/hotel/gql-hotel.model';
import { GqlTextResponseModel } from '../../graphql/models/gql-text-response.model';
import { CreateHotelDto, UpdateHotelDto } from '../../rest/dto/hotel';
import { RestHotelModel } from '../../rest/models/hotel/rest-hotel.model';
import { RestTextResponseModel } from '../../rest/models/rest-text-response.model';

@Injectable()
export class HotelService {
    constructor(
        @Inject('CATALOG_MICROSERVICE')
        private readonly catalogClient: ClientProxy,
    ) {}

    async getSingleHotel(
        id: number
    ): Promise<RestHotelModel | GqlHotelModel> {
        return this.catalogClient.send({ role: 'hotel', cmd: 'getSingle' }, id).toPromise();
    }

    async getAllHotels(): Promise<RestHotelModel[] | GqlHotelModel[]> {
        return this.catalogClient.send({ role: 'hotel', cmd: 'getAll' }, null).toPromise();
    }

    async createHotel(
        createHotelDto: CreateHotelDto | CreateHotelInput
    ): Promise<RestHotelModel | GqlHotelModel> {
        return this.catalogClient.send({ role: 'hotel', cmd: 'create' }, createHotelDto).toPromise();
    }

    async updateHotel(
        id: number,
        updateHotelDto: UpdateHotelDto | UpdateHotelInput
    ): Promise<RestHotelModel | GqlHotelModel> {
        const updateHotelObject = { id, updateHotelDto };
        return this.catalogClient.send({ role: 'hotel', cmd: 'update' }, updateHotelObject).toPromise();
    }

    async deleteHotel(
        id: number
    ): Promise<RestTextResponseModel | GqlTextResponseModel> {
        return this.catalogClient.send({ role: 'hotel', cmd: 'delete' }, id).toPromise();
    }
}
