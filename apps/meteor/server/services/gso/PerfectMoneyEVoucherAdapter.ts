import { IPaymentGateway } from '@rocket.chat/core-typings';
import { IPaymentGatewayAdapter } from './IPaymentGatewayAdapter';

export class PerfectMoneyEVoucherAdapter implements IPaymentGatewayAdapter {
	getId(): string {
		throw new Error('Method not implemented.');
	}

	getGatewayInfo(): IPaymentGateway {
		throw new Error('Method not implemented.');
	}

	init($input: any) {
		throw new Error('Method not implemented.');
	}

	process($input: any) {
		throw new Error('Method not implemented.');
	}

	validate($input: any) {
		throw new Error('Method not implemented.');
	}

	convertDeposit(): any {
	}

	convertWithdrawal(): any {
	}

}
