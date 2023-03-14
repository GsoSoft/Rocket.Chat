import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';
import { AtLeastOne, IGateway, PartialBy } from '@rocket.chat/core-typings/src/gso';
import { Cursor } from 'mongodb';

export type IGatewayLean = Omit<IGateway, '_id' | '_updatedAt'>;

export type IGatewayCreateParams = PartialBy<Omit<IGateway, '_updatedAt'>, 'cmpClass' | 'cmpConfig'>;

export type IGatewayUpdateParams = AtLeastOne<IGatewayLean>;

export interface IGatewayService {
	create(params: IGatewayCreateParams): Promise<IGateway>;
	createMany(gateways: IGatewayCreateParams[]): Promise<void>;
	list(paginationOptions?: IPaginationOptions, queryOptions?: IQueryOptions<IGateway>): Cursor<IGateway>;
	update(gatewayId: IGateway['_id'], params: IGatewayUpdateParams): Promise<IGateway>;
	delete(gatewayId: IGateway['_id']): Promise<void>;
	getGateway(gatewayId: IGateway['_id']): Promise<IGateway>;
}
