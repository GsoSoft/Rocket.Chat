import { Meteor } from 'meteor/meteor';
import { IGatewayTransaction } from '@rocket.chat/core-typings';

Meteor.methods({
	getPaymentGateways() {
		const PerfectMoneyVoucher = {
			_id: 'perfect-money-voucher',
			show: false,
			active: true,
			sortOrder: 1,
			icon: 'voucher',
			cmpClass: 'PerfectMoneyVoucherFormCmp',
		};

		const BankTransfer = {
			_id: 'bank-transfer',
			show: false,
			active: true,
			sortOrder: 2,
			icon: 'bank',
			cmpClass: 'BankTransferFormCmp',
		};

		const UsdtBlockChain = {
			_id: 'usdt-blockchain',
			show: false,
			active: true,
			sortOrder: 3,
			icon: 'usdt',
			cmpClass: 'UsdtBlockChainFormCmp',
		};

		const CreditCard = {
			_id: 'credit-card',
			show: false,
			active: true,
			sortOrder: 4,
			icon: 'card',
			cmpClass: '',
		};

		const PaypalClass = {
			_id: 'paypal',
			show: true,
			active: true,
			sortOrder: 5,
			icon: 'paypal-icon',
			cmpClass: 'PaypalClassFormCmp',
		};

		return [PerfectMoneyVoucher, BankTransfer, UsdtBlockChain, CreditCard, PaypalClass];
	},
	/**
	 * user submit payment info
	 * @param transaction
	 */
	submitPayment(transaction: IGatewayTransaction) {
		// 1. data submit from client can be
		console.log(transaction);
		return [];
	},
});
