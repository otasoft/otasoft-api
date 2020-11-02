import { HttpException, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { IMicroservicePattern } from "./interfaces/microservice-pattern.interface";

@Injectable()
export class MicroserviceConnectionService {
    /**
     * Method used to send the request to the corresponding microservice. It accepts following parameters:
     * 
     * - @param {ClientProxy} client - microservice client to send the message to
     * - @param {IMicroservicePattern} messagePattern - object containing the pattern for a message (i.e. `{ role: 'user', cmd: 'create' }`)
     * - @param {*} payload - data to send to the microservice client
     * 
     * @return {*}  {Promise<any>} - returned response from a microservice or an adequate HTTP exception
     */
    async sendRequestToClient(client: ClientProxy, messagePattern: IMicroservicePattern, payload: any): Promise<any> {
        try {
            return await client
              .send(messagePattern, payload)
              .toPromise();
        } catch (error) {
            throw new HttpException(error.errorStatus, error.statusCode);
        }
    }
}