import { Accordion } from '@rocket.chat/fuselage';
import { useTranslation, useUser } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useContext, useEffect, useMemo, useState } from 'react';

import Page from '../../components/Page';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { UserPreviousPageContext } from '../../contexts/UserPreviousPageContext/GlobalState';
import { useCapitalizeAndJoin } from '../../hooks/gso/useCapitalization';
import { useEndpointData } from '../../hooks/useEndpointData';
import Components from './components/Components';

const SelectRoleView = (): ReactElement => {
	const [fetchedRoles, setFetchedRoles] = useState<Record<string, any>[]>([]);
	const [openRole, setOpenRole] = useState<Record<string, any>>({});
	const [closeRole, setCloseRole] = useState('');
	const [userCredit, setUserCredit] = useState(0);
	const [roleState, setRoleState] = useState(0);
	const t = useTranslation();
	const capitalize = useCapitalizeAndJoin();
	const { value } = useContext(UserPreviousPageContext);

	const user = useUser();
	// @ts-ignore
	const { username } = user;

	const { value: data } = useEndpointData(
		// @ts-ignore
		`/v1/users.info`,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		useMemo(() => ({ ...(username && { username }) }), [username, roleState]),
	);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _setUserData = useMemo(() => {
		if (data) {
			// @ts-ignore
			const { user } = data;
			setUserCredit(user.credit);
		}
	}, [data]);

	const getRolesFn = (): void => {
		Meteor.call('getConfig', (_error, result) => {
			if (result) {
				setFetchedRoles(result);
				console.log(result, 'fetchedRoles');
				// setOpenRole({ open: 'true', id: result[0].id });
				console.log('Roles were fetched');
			}
		});
	};

	useEffect(() => {
		if (!fetchedRoles.length) getRolesFn();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchedRoles]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _openRoleFn = useMemo((): void => {
		if (openRole) {
			const element = document.querySelector(`#${openRole.id}`);
			if (element) {
				// If the Accordion Item is closed then open it, otherwise close it.
				if (openRole.open === 'true') {
					// @ts-ignore
					element.firstElementChild.setAttribute('aria-expanded', 'true');
					// @ts-ignore
					element.lastElementChild.className =
						'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel--expanded rcx-accordion-item__panel';
				} else {
					// @ts-ignore
					element.firstElementChild.setAttribute('aria-expanded', 'false');
					// @ts-ignore
					element.lastElementChild.className = 'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel';
				}
			}
		}
	}, [openRole]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _closePreviousAccordionItem = useMemo(() => {
		if (closeRole) {
			const element = document.querySelector(`#${closeRole}`);
			if (element !== null) {
				// @ts-ignore
				element.firstElementChild.setAttribute('aria-expanded', 'false');
				// @ts-ignore
				element.lastElementChild.className = 'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel';
			}
		}
	}, [closeRole]);

	const onAccordionToggle = (e): void => {
		// Close the previously opened gateway
		if (openRole.id) {
			setCloseRole(openRole.id);
		}
		const accordionItem = e.currentTarget.parentNode;
		let open = 'false';
		if (e.currentTarget.getAttribute('aria-expanded') === 'false') {
			open = 'true';
		}
		setOpenRole({ open, id: accordionItem.id });
	};

	const handleRouteBack = (): void => {
		FlowRouter.go(`${value.location}`);
	};
	return (
		<Page id='topup-page'>
			{/* @ts-ignore */}
			<ProfileHeader title={`${t('gso_selectRoleView_profileHeader')}`} handleRouteBack={handleRouteBack} />
			<Page.ScrollableContentWithShadow>
				{/* @ts-ignore */}
				<p style={{ fontSize: '16px' }}>{t('gso_selectRoleView_info')}</p>
				<Accordion style={{ margin: '15px 0' }}>
					{fetchedRoles.length
						? fetchedRoles.map((role) => {
								if (role.cmpClass === undefined || role.cmpClass === '') {
									return (
										<Accordion>
											<Accordion.Item title={capitalize(role.id)} disabled={true} />
										</Accordion>
									);
								}

								if (role.show === false) {
									return (
										// @ts-ignore
										<Accordion.Item title={capitalize(role.id)} id={role.id} onToggle={onAccordionToggle}>
											{/* eslint-disable-next-line new-cap */}
											{Components({
												id: role.id,
												cmpClass: role.cmpClass,
												cmpConfig: role.cmpConfig,
												show: role.show,
												roleState,
												setRoleState,
												userCredit,
												capitalize,
											})}
										</Accordion.Item>
									);
								}
								return null;
						  })
						: 'Loading...'}
				</Accordion>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default SelectRoleView;
