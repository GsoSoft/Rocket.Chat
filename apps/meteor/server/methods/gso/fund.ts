import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { ICurrency, IDeposit, IFundTransaction, ISendFund, IUser, IWithdraw } from '@rocket.chat/core-typings';

import { FundTransactionService } from '../../services/gso';

/**
 * All fund related method exposed to client side
 */
Meteor.methods({
	// Mock trust score
	async listCurrencies() {
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
		} as ICurrency;

		const USD: ICurrency = {
			code: 'USD',
			exchangeRate: {
				GSD: 23.4,
			},
		} as ICurrency;

		return [THB, GSD, USD];
	},

	/**
	 * User decides to deposit an amount of fund. The system check if user is having any pending deposit before, load it or initiate a new one
	 *
	 * @param params
	 */
	async depositFund(params: IDeposit) {
		const nonce = Math.floor(Math.random() * 10);
		// 1. validating data
		check(
			params,
			Match.ObjectIncluding({
				gateway: String,
				quantity: Number,
				amount: Number,
				currency: String,
			}),
		);

		// 2. validating user
		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}

		// if (nonce < 8) {
		// 	const query = { _id: Meteor.userId() };
		// 	// await Users.update(query, { $inc: { credit: params.quantity } });
		// }

		//

		// delegate to gateway adapter

		// update transaction table

		const Transactions = new FundTransactionService();

		const transaction = await Transactions.create({
			...params,
			status: nonce < 8 ? 'success' : 'error',
			createdBy: Meteor.userId(),
		});

		return transaction;
	},
	withdrawFund(params: IWithdraw) {
		// const nonce = Math.floor(Math.random() * 10);
		// 1. validating data
		check(
			params,
			Match.ObjectIncluding({
				gateway: String,
				quantity: Number,
				amount: Number,
				currency: String,
			}),
		);

		// 2. validating user
		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}

		// if (nonce < 8) {
		// 	const query = { _id: Meteor.userId() };
		// 	await Users.update(query, { $inc: { credit: params.quantity } });
		// }

		// delegate to gateway adapter

		// update transaction table

		return null;
	},

	/**
	 *
	 * @param from
	 * @param to
	 */
	exchangeCurrency(from: string, to: string) {
		console.log(from, to);
		return '';
	},

	sendFund(params: ISendFund) {
		return params;
	},

	getUserFund(userId: IUser['_id']) {
		console.log(userId);
		return userId;
	},

	async getTransactions(paginationOptions, queryOptions) {
		check(
			paginationOptions,
			Match.ObjectIncluding({
				offset: Match.Optional(Number),
				count: Match.Optional(Number),
			}),
		);
		check(
			queryOptions,
			Match.ObjectIncluding({
				sort: Match.Optional(Object),
				query: Match.Optional(Object),
			}),
		);

		const Transactions = new FundTransactionService();

		const results = await Transactions.list(paginationOptions, {
			sort: queryOptions.sort,
			query: { ...queryOptions.query, createdBy: Meteor.userId() },
		}).toArray();

		return results;
	},

	async markTransactionAudited(transactionId: IFundTransaction['_id']) {
		check(transactionId, String);

		const Transactions = new FundTransactionService();

		await Transactions.delete(transactionId);

		return true;
	},

	async getOneTransaction(transactionId: IFundTransaction['_id']) {
		check(transactionId, String);

		const Transactions = new FundTransactionService();

		const transaction = await Transactions.getTransaction(transactionId);

		return transaction;
	},
});
