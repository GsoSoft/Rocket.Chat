import { FindCursor } from 'mongodb';
import { ICurrency, IFundBalance, IGatewayData, ITransaction } from '@rocket.chat/core-typings/dist/gso';
import { FundBalances, FundTransactions, Transactions } from '@rocket.chat/models';
import { InsertionModel } from '@rocket.chat/model-typings';
import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';
import { IFundOwner, IExchangeCurrency, IFundAccount } from '@rocket.chat/core-typings/src/gso';
import { Meteor } from 'meteor/meteor';

import { ServiceClassInternal } from '@rocket.chat/core-services';
import { IFundService } from '@rocket.chat/core-services';

const createHash = (length: number): string => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

const createLongRandomNumber = (): string => {
	let foo = '';
	for (let i = 0; i < 19; ++i) foo += Math.floor(Math.random() * 10);
	return foo;
};

/**
 * All fund related services ( fund balance & fund transaction) go here.
 * !! This service layer can serve meteor method or REST api !!
 */
export class FundService extends ServiceClassInternal implements IFundService {
	async listCurrencies(userId: string): Promise<ICurrency[]> {
		console.log(userId);
		// this should be in settings table, but hardcode 4 now !!

		const THB: ICurrency = {
			code: 'THB',
			exchangeRate: {
				GSD: 3.4,
			},
		} as ICurrency;

		/**
		 * GSO dollar
		 */
		const GSD: ICurrency = {
			code: 'GSD',
			isMain: true,
		} as ICurrency;

		const USD: ICurrency = {
			code: 'USD',
			exchangeRate: {
				GSD: 23.4,
			},
		} as ICurrency;

		return [THB, GSD, USD];
	}

	/**
	 *
	 * @param IExchangeCurrency
	 * @param transactionId
	 */
	submitCurrencyExchange(transactionId: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	async findFundBalanceByOwner(owner: IFundOwner): Promise<IFundBalance> {
		// 1. Look up the db
		const fund = await FundBalances.findByOwner(owner);
		let result;
		let fundBalance: IFundBalance;
		if (!fund) {
			console.log('fund not found');
			fundBalance = {
				owner,
				accounts: [
					{
						currency: 'USD',
						lastTransaction: '5635sdf',
						availableAmount: 10,
						unAvailableAmount: 13,
						lastAmount: 5, // for audit purpose
						lastAudited: new Date(),
					} as IFundAccount,
					{
						currency: 'GSD',
						lastTransaction: '12adf31',
						availableAmount: 55,
						unAvailableAmount: 24,
						lastAmount: 5, // for audit purpose
						lastAudited: new Date(),
					} as IFundAccount,
				],
			} as IFundBalance;

			result = FundBalances.insertOne(fundBalance);
			console.log('fund ', fund, result, fundBalance);
			return fundBalance;
		}
		console.log('fund ', fund, result, fundBalance);
		return fund;
	}

	async initCurrencyExchange(userId: string, from: any, to: any, amount: any): Promise<IExchangeCurrency> {
		// 1. Get user fund balance which contain from-currency-account and to-currency-account
		const fundBalance = await this.findFundBalanceByOwner({ id: userId, type: 'user' } as IFundOwner);
		console.log(fundBalance);

		// validate if amount < from.available Fund

		// find the draft transaction. to avoid overflow of "temp" transaction, we find the transaction that user left over to reuse, or create new temp
		// const curExTnx = FundTransactions.findByStatus('init');
		// if (curExTnx) {
		// 	console.log('not null');
		// } else {
		// 	console.log('create new currency exchange');
		// 	const curExTnx = {
		// 		from :from ,
		// 		to : to,
		// 		amount,
		// 	}			as			IExchangeCurrency;
		// 	FundTransactions.insertOne();
		// }

		// else if(curExTnx.l)
		// create new transaction
		// _toRyan
		// return curExTnx;
		return null;
	}

	async getTransaction(transactionId: string): Promise<ITransaction> {
		const transaction = await Transactions.findOneById(transactionId);
		if (!transaction) throw new Error('transaction-does-not-exist');
		return transaction;
	}

	protected name = 'transaction';

	async create(params: ITransactionCreateParams): Promise<ITransaction> {
		const gatewayData: IGatewayData = {
			gateway: params.gateway,
			quantity: params.quantity,
			amount: params.amount,
			currency: params.currency,
		};
		const createData: InsertionModel<ITransaction> = {
			createdAt: new Date(),
			...params,
			gatewayData,
			hash: createHash(6),
			transactionCode: createLongRandomNumber(),
		};
		const result = await Transactions.insertOne(createData);
		const transaction = await Transactions.findOneById(result.insertedId);
		if (!transaction) throw new Error('transaction-does-not-exist');
		return transaction;
	}

	async createMany(transactions: ITransactionCreateParams[]): Promise<void> {
		const data: InsertionModel<ITransaction>[] = transactions.map((transaction) => ({
			...transaction,
			createdAt: new Date(),
			hash: createHash(6),
			transactionCode: createLongRandomNumber(),
			gatewayData: {
				gateway: transaction.gateway,
				quantity: transaction.quantity,
				amount: transaction.amount,
				currency: transaction.currency,
			},
		}));
		await Transactions.insertMany(data);
	}

	async delete(transactionId: string): Promise<void> {
		await this.getTransaction(transactionId);
		await Transactions.removeById(transactionId);
	}

	async update(transactionId: string, params: ITransactionUpdateParams): Promise<ITransaction> {
		await this.getTransaction(transactionId);
		const query = {
			_id: transactionId,
		};
		const updateData = {
			...params,
		};
		const result = await Transactions.updateOne(query, { $set: updateData });
		const transaction = await Transactions.findOneById(result.upsertedId._id.toHexString());
		if (!transaction) throw new Error('transaction-does-not-exist');
		return transaction;
	}

	list(
		{ offset, count }: Partial<IPaginationOptions> = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<ITransaction> = { sort: {} },
	): Cursor<ITransaction> {
		return Transactions.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		);
	}
}
