import { Box, Button } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { useContext } from 'react';

import Page from '../../../components/Page';
import { PaymentResultContext, DispatchPaymentResultContext } from '../../../contexts/PaymentResultContext/GlobalState';
import { UserPreviousPageContext, DispatchPreviousPageContext } from '../../../contexts/UserPreviousPageContext/GlobalState';

const PaymentResult = () => {
	const t = useTranslation();
	const { dispatch } = useContext(DispatchPaymentResultContext);
	const previousPageDispatch = useContext(DispatchPreviousPageContext);
	const { credit, status, gateway } = useContext(PaymentResultContext);
	const { value } = useContext(UserPreviousPageContext);

	const successMessage = `You have successfully paid using`;
	const errorMessage = `Your transaction has failed using`;

	const handleRerouting = () => {
		FlowRouter.go(`${value.location}`);
		previousPageDispatch.dispatch({ type: 'CLEAR_LOCATION' });
		dispatch({ type: 'REMOVE_RESULT_DETAILS' });
	};

	return (
		<Page id='payment-result-page'>
			{/* @ts-ignore */}
			<Page.Header title={t('Payment result')} />
			<Box style={{ margin: '15px 15px 0 15px' }}>
				{/* @ts-ignore */}
				<h3 style={{ fontSize: '19px', marginBottom: '50px' }}>{status === 'success' ? successMessage : errorMessage}</h3>
				<p style={{ fontSize: '16px' }}>
					{/* @ts-ignore */}
					{t('gso_paymentResultPage_gateway')} {gateway}
				</p>
				<p style={{ fontSize: '16px', marginTop: '20px' }}>
					{/* @ts-ignore */}
					{t('gso_paymentResultPage_credit')} {credit}
				</p>
				<Button primary style={{ position: 'absolute', bottom: '70px' }} onClick={handleRerouting}>
					Continue
				</Button>
			</Box>
		</Page>
	);
};

export default PaymentResult;
