import { IPaymentGateway } from '@rocket.chat/core-typings';
import { Accordion } from '@rocket.chat/fuselage';
import { useRouteParameter, useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
// @ts-ignore
import React, { ReactElement, useEffect, useMemo, useState } from 'react';

import Page from '../../components/Page';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { useCapitalizeAndJoin } from '../../hooks/gso/useCapitalization';
import Components from './components/Components';
import './topup.css';

const TopUpView = (): ReactElement => {
	const [fetchedGateways, setFetchedGateways] = useState<IPaymentGateway[]>([]);
	const [openGateway, setOpenGateway] = useState<Record<string, any>>({});
	const [closeGateway, setCloseGateway] = useState('');
	const t = useTranslation();
	const capitalize = useCapitalizeAndJoin();
	const inputCurrency = useRouteParameter('currency');

	const getGatewaysFn = (): void => {
		Meteor.call('getPaymentGateways', {}, {}, (_error, result) => {
			if (result) {
				if (result.length) {
					setFetchedGateways(result);
					// setOpenGateway({ open: 'true', id: result[0]._id });
					console.log('Gateways were fetched');
				} else {
					console.log(_error, 'error');
				}
			}
		});
	};

	useEffect(() => {
		getGatewaysFn();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _openGatewayFn = useMemo((): void => {
		if (openGateway) {
			const element = document.querySelector(`#${openGateway.id}`);
			if (element) {
				// If the Accordion Item is closed then open it, otherwise close it.
				if (openGateway.open === 'true') {
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
	}, [openGateway]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _closePreviousAccordionItem = useMemo(() => {
		if (closeGateway) {
			const element = document.querySelector(`#${closeGateway}`);
			if (element) {
				// @ts-ignore
				element.firstElementChild.setAttribute('aria-expanded', 'false');
				// @ts-ignore
				element.lastElementChild.className = 'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel';
			}
		}
	}, [closeGateway]);

	const onAccordionToggle = (e): void => {
		// Close the previously opened gateway
		if (openGateway.id) {
			setCloseGateway(openGateway.id);
		}
		const accordionItem = e.currentTarget.parentNode;
		let open = 'false';
		if (e.currentTarget.getAttribute('aria-expanded') === 'false') {
			open = 'true';
		}
		setOpenGateway({ open, id: accordionItem.id });
	};

	const handleRouteBack = (): void => {
		FlowRouter.go('/account/view-profile');
	};

	return (
		<Page id='topup-page'>
			{/* @ts-ignore */}
			<ProfileHeader title={t('gso_topupView_profileHeader')} handleRouteBack={handleRouteBack} />
			<Page.ScrollableContentWithShadow>
				{/* @ts-ignore */}
				<h3 style={{ fontSize: '19px', marginBottom: '10px' }}>{t('gso_topupView_title', { currency: inputCurrency })}</h3>
				{/* @ts-ignore */}
				<p style={{ fontSize: '16px' }}>{t('gso_topupView_info')}</p>
				<Accordion style={{ margin: '15px 0' }}>
					{fetchedGateways.length
						? fetchedGateways.map((gateway) => {
								if (gateway.cmpClass === undefined || gateway.cmpClass === '') {
									return <Accordion.Item title={capitalize(gateway._id)} disabled={true} />;
								}

								if (gateway.show === false) {
									return (
										// @ts-ignore
										<Accordion.Item title={capitalize(gateway._id)} id={gateway._id} onToggle={onAccordionToggle}>
											{/* eslint-disable-next-line new-cap */}
											{Components({
												id: gateway._id,
												cmpClass: gateway.cmpClass,
												capitalize,
												onAccordionToggle,
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

export default TopUpView;
