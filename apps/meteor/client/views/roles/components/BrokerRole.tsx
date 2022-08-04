import { Box, Button } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useContext } from 'react';

import { DispatchPaymentResultContext } from '../../../contexts/PaymentResultContext/GlobalState';
import { useCapitalizeAndJoin } from '../../../hooks/gso/useCapitalization';
import { dispatchToastMessage } from '../../../lib/toast';

type Props = {
	id: string;
	cmpConfig: Record<string, any>;
	credits: number;
	roleState: number;
	setRoleState: Function;
};

const BrokerRole = ({ id, cmpConfig, credits, roleState, setRoleState }: Props): ReactElement => {
	const t = useTranslation();
	const { dispatch } = useContext(DispatchPaymentResultContext);
	const capitalize = useCapitalizeAndJoin();

	const handleSubmit = (): void => {
		if (credits >= cmpConfig.escrow) {
			Meteor.call('addEscrow', { amount: cmpConfig.escrow, type: id }, (error, result) => {
				if (result) {
					setRoleState(roleState + 1);
					// @ts-ignore
					dispatchToastMessage({ type: 'success', message: t('gso_selectRoleView_successMessage') });
					dispatch({
						type: 'ADD_RESULT_DETAILS',
						payload: { status: result.status, role: capitalize(result.type) },
					});
					FlowRouter.go('/role-result');
				}

				if (error) {
					setRoleState(roleState + 1);
					// @ts-ignore
					dispatchToastMessage({ type: 'error', message: error });
				}
			});
		} else {
			// @ts-ignore
			dispatchToastMessage({ type: 'error', message: t('gso_selectRoleView_errorMessage') });
		}
	};
	return (
		<Box>
			<p style={{ fontSize: '15px', fontWeight: 'bold' }}>{`Please escrow ${cmpConfig.escrow} credits to secure the role`}</p>
			{/* @ts-ignore */}
			<p style={{ fontSize: '14px', color: '#808080', marginTop: '10px' }}>{t('gso_selectRoleView_brokerRole_subtitle')}</p>

			<p
				style={{ fontSize: '14px', color: '#808080', marginTop: '10px' }}
			>{`After you submit, ${cmpConfig.escrow} credits will be deducted from your fund`}</p>

			{/* @ts-ignore */}
			<p style={{ fontSize: '15px', fontWeight: 'bold', margin: '20px 0' }}>{t('gso_selectRoleView_brokerRole_footer')}</p>

			<Button primary style={{ float: 'right', marginTop: '20px' }} onClick={handleSubmit}>
				{/* @ts-ignore */}
				{t('gso_selectRoleView_brokerRole_submitBtn')}
			</Button>
		</Box>
	);
};

export default BrokerRole;
