import { Cursor } from 'mongodb';
import { IEscrow } from '@rocket.chat/core-typings/dist/gso';
import { Escrows } from '@rocket.chat/models';
import { InsertionModel } from '@rocket.chat/model-typings';
import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';

import { ServiceClassInternal } from '@rocket.chat/core-services';
import type { IEscrowService, IEscrowCreateParams, IEscrowUpdateParams } from '@rocket.chat/core-services';

export class EscrowService extends ServiceClassInternal implements IEscrowService {
	protected name = 'escrow';

	async create(params: IEscrowCreateParams): Promise<IEscrow> {
		const createData: InsertionModel<IEscrow> = {
			...params,
			startDate: new Date(),
			endDate: -1,
			approvedBy: '',
			status: 'submitted',
		};
		const result = await Escrows.insertOne(createData);
		const escrow = await Escrows.findOneById(result.insertedId);
		if (!escrow) throw new Error('escrow-does-not-exist');
		return escrow;
	}

	async createMany(escrows: IEscrowCreateParams[]): Promise<void> {
		const data: InsertionModel<IEscrow>[] = escrows.map((escrow) => ({
			...escrow,
			startDate: new Date(),
			endDate: -1,
			approvedBy: '',
			status: 'submitted',
		}));

		await Escrows.insertMany(data);
	}

	async delete(escrowId: string): Promise<void> {
		await this.getEscrow(escrowId);
		await Escrows.removeById(escrowId);
	}

	async getEscrow(escrowId: string): Promise<IEscrow> {
		const escrow = await Escrows.findOneById(escrowId);
		if (!escrow) {
			throw new Error('escrow-does-not-exist');
		}
		return escrow;
	}

	async update(escrowId: string, params: IEscrowUpdateParams): Promise<IEscrow> {
		await this.getEscrow(escrowId);
		const query = {
			_id: escrowId,
		};
		const updateData = {
			...params,
		};
		const result = await Escrows.updateOne(query, { $set: updateData });
		const escrow = await Escrows.findOneById(result.upsertedId._id.toHexString());
		if (!escrow) throw new Error('escrow-does-not-exist');
		return escrow;
	}

	list(
		{ offset, count }: Partial<IPaginationOptions> = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<IEscrow> = { sort: {} },
	): Cursor<IEscrow> {
		return Escrows.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		);
	}

	async findByUserId(userId: IEscrow['userId']): Promise<IEscrow | null> {
		return Escrows.findOne({ userId });
	}
}
