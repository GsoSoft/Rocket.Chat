import { Cursor } from 'mongodb';
import { IGateway } from '@rocket.chat/core-typings/dist/gso';
import { Gateways } from '@rocket.chat/models';
import { InsertionModel } from '@rocket.chat/model-typings';
import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';

import { ServiceClassInternal } from '@rocket.chat/core-services';
import { IGatewayService, IGatewayCreateParams, IGatewayUpdateParams } from '../../sdk/types/IGatewayService';

export class GatewayService extends ServiceClassInternal implements IGatewayService {
	protected name = 'gateway';

	async create(params: IGatewayCreateParams): Promise<IGateway> {
		const createData: InsertionModel<IGateway> = {
			...params,
		};
		const result = await Gateways.insertOne(createData);
		const gateway = await Gateways.findOneById(result.insertedId);
		if (!gateway) throw new Error('gateway-does-not-exist');
		return gateway;
	}

	async createMany(gateways: IGatewayCreateParams[]): Promise<void> {
		await Gateways.insertMany(gateways);
	}

	async delete(gatewayId: string): Promise<void> {
		await this.getGateway(gatewayId);
		await Gateways.removeById(gatewayId);
	}

	async getGateway(gatewayId: string): Promise<IGateway> {
		const gateway = await Gateways.findOneById(gatewayId);
		if (!gateway) {
			throw new Error('gateway-does-not-exist');
		}
		return gateway;
	}

	async update(gatewayId: string, params: IGatewayUpdateParams): Promise<IGateway> {
		await this.getGateway(gatewayId);
		const query = {
			_id: gatewayId,
		};
		const updateData = {
			...params,
		};
		const result = await Gateways.updateOne(query, { $set: updateData });
		const gateway = await Gateways.findOneById(result.upsertedId._id.toHexString());
		if (!gateway) throw new Error('gateway-does-not-exist');
		return gateway;
	}

	list(
		{ offset, count }: Partial<IPaginationOptions> = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<IGateway> = { sort: {} },
	): Cursor<IGateway> {
		return Gateways.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		);
	}
}
