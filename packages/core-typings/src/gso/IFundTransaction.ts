import type { IUser } from '../IUser';
import type { IRocketChatRecord } from '../IRocketChatRecord';
import type { IGatewayTransaction, IPaymentGateway, IPaymentGatewayData } from './IPaymentGateway';
// import type { ICurrency } from './ICurrency';
import type { IFundAccount } from './IFundBalance';

/**
 * All fund related transaction : such as deposit/withdraw/Frozen
 */
export interface IFundTransaction extends IRocketChatRecord {
	createdAt: Date;
	createdBy: IUser;
	amount: number;
	status: any;

	creditType: TransactionType;

	/**
	 * mark if this transaction is audited.
	 */
	audited: boolean;
}

enum TransactionType {
	Debit = -1,
	Credit = 1,
}

export interface ITransactionCreateParams {
	gateway: IPaymentGateway['_id'];
	transactionCode: string;
	quantity: number;
	amount: number;
	currency: string;
	status: 'success' | 'cancelled' | 'error';
	updatedBy?: IUser['_id'];
	createdAt: Date;
	createdBy: IUser['_id'];
	gatewayData: IGatewayTransaction;
}

/**
 * Put it here so less file to manage!?
 * Deposit fund transaction, usually (or always) with the help of a payment gateway (usually from third party payment provider)
 *
 *
 */
export interface IDeposit extends IFundTransaction {
	hash: string;
	gateway: IGatewayTransaction;

	toAccount: IUser['_id'];

	transactionCode: string;
	quantity: number;
	currency: string;
	status: 'success' | 'cancelled' | 'error';
	updatedBy?: IUser['_id'];
	gatewayData: IPaymentGatewayData;
}

/**
 * Put it here so less file to manage!?
 * Withdraw fund transaction, usually (or always) with the help of a payment gateway (usually from third party payment provider)
 *
 */
export interface IWithdraw extends IFundTransaction {
	hash: string;
	gateway: IPaymentGateway['_id'];

	toAccount: IUser['_id'];

	transactionCode: string;
	quantity: number;
	amount: number;
	currency: string;
	status: 'success' | 'cancelled' | 'error';
	updatedBy?: IUser['_id'];
	gatewayData: IPaymentGatewayData;
}

/**
 * Put it here so less file to manage!?
 * Withdraw fund transaction, usually (or always) with the help of a payment gateway (usually from third party payment provider)
 *
 */
export interface IExchangeCurrency extends IFundTransaction {
	from: IFundAccount;
	to: IFundAccount;
	amount: number;

	status: 'init' | 'success' | 'error';
}
