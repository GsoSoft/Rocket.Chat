import { Accordion, Box, Button, TextAreaInput, Field, FieldGroup } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { useContext, useState } from 'react';

import { dispatchToastMessage } from '../../../lib/toast';
import { DispatchPaymentResultContext } from '../../../contexts/PaymentResultContext/GlobalState';
import { useCapitalizeAndJoin } from '../../../hooks/useCapitalization';

type Props = {
	title?: string;
	id: string;
	credits: number;
	cmpConfig: Record<string, any>;
	roleState: number;
	setRoleState: Function;
	onToggle: (e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => void;
};

const EmployeeRole = ({ title, id, credits, cmpConfig, roleState, setRoleState, onToggle }: Props) => {
	const [bio, setBio] = useState('');
	const t = useTranslation();
	const { dispatch } = useContext(DispatchPaymentResultContext);
    const capitalize = useCapitalizeAndJoin()

	const handleSubmit = () => {
		if (credits >= cmpConfig.escrow) {
			Meteor.call('addEscrow', { amount: cmpConfig.escrow, type: id }, (error, result) => {
				if (result) {
					console.log(result, 'result');
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
		// @ts-ignore
		<Accordion.Item title={title} id={id} onToggle={onToggle}>
			<Box>
				<FieldGroup>
					<Field>
						{/* @ts-ignore */}
						<Field.Label>{t('gso_selectRoleView_employeeRole_fieldLabel')}</Field.Label>
						<Field.Row>
							<TextAreaInput value={bio} onChange={(e: any): void => setBio(e.target.value)} />
						</Field.Row>
					</Field>
				</FieldGroup>
				<Button primary style={{ float: 'right', marginTop: '20px' }} onClick={handleSubmit}>
					{/* @ts-ignore */}
					{t('gso_selectRoleView_employeeRole_submitBtn')}
				</Button>
			</Box>
		</Accordion.Item>
	);
};

export default EmployeeRole;
