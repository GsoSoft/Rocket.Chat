import { AtLeastOne, IEscrow, IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';
import { Cursor } from 'mongodb';

export type IEscrowLean = Omit<IEscrow, '_id' | '_updatedAt'>;

export type IEscrowCreateParams = Omit<IEscrow, '_id' | '_updatedAt' | 'startDate' | 'endDate' | 'approvedBy' | 'status'>;

export type IEscrowUpdateParams = AtLeastOne<IEscrowLean>;

export interface IEscrowService {
	create(params: IEscrowCreateParams): Promise<IEscrow>;
	createMany(escrows: IEscrowCreateParams[]): Promise<void>;
	list(paginationOptions?: IPaginationOptions, queryOptions?: IQueryOptions<IEscrow>): Cursor<IEscrow>;
	update(EscrowId: IEscrow['_id'], params: IEscrowUpdateParams): Promise<IEscrow>;
	delete(EscrowId: IEscrow['_id']): Promise<void>;
	getEscrow(EscrowId: IEscrow['_id']): Promise<IEscrow>;
	findByUserId(userId: IEscrow['userId']): Promise<IEscrow | null>;
}
