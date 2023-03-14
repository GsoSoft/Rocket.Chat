import { ICurrency, IFundBalance, IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';
import { AtLeastOne, IExchangeCurrency, IFundOwner, ITransaction } from '@rocket.chat/core-typings/src/gso';
import { Cursor } from 'mongodb';

export type ITransactionLean = Omit<ITransaction, '_id' | '_updatedAt' | 'createdAt'>;

export type ITransactionCreateParams = Omit<ITransactionLean, 'hash' | 'transactionCode' | 'gatewayData' | 'updatedBy'>;

export type ITransactionUpdateParams = AtLeastOne<Omit<ITransactionLean, 'hash' | 'transactionCode'>>;

export interface IFundService {
	/**
	 * return a list of currency available to an user
	 */
	listCurrencies(userId: string): Promise<ICurrency[]>;

	findFundBalanceByOwner(owner: IFundOwner): Promise<IFundBalance>;

	/**
	 * Allow user to init an currency exchange order. Return fund state before and after.
	 * @param owner
	 */
	initCurrencyExchange(userId: string, from, to, amount): Promise<IExchangeCurrency>;

	/**
	 *
	 * @param transactionId
	 */
	submitCurrencyExchange(transactionId: IExchangeCurrency['_id']): Promise<boolean>;

	createMany(transactions: ITransactionCreateParams[]): Promise<void>;

	list(paginationOptions?: IPaginationOptions, queryOptions?: IQueryOptions<ITransaction>): Cursor<ITransaction>;

	update(transactionId: ITransaction['_id'], params: ITransactionUpdateParams): Promise<ITransaction>;

	delete(transactionId: ITransaction['_id']): Promise<void>;

	getTransaction(transactionId: ITransaction['_id']): Promise<ITransaction>;
}
