import { IPaymentGateway } from '@rocket.chat/core-typings';
import { Accordion, Box, Button, Grid, Icon, TextInput } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
// @ts-ignore
import React, { ReactElement, useEffect, useMemo, useState } from 'react';

import Page from '../components/Page';
import { useCapitalizeAndJoin } from '../hooks/gso/useCapitalization';
import SingleGame from './games/SingleGame';

const FundBalanceView = (): ReactElement => {
	const [currencyList, setCurrencyList] = useState([]);
	const [fundBalance, setFundBalance] = useState(null);
	const [amount, setAmount] = useState(1);
	const [topUpAmount, setTopUpAmount] = useState(1);

	const t = useTranslation();
	const capitalize = useCapitalizeAndJoin();

	const fetchData = (): void => {
		Meteor.call('listCurrencies', {}, (error, result) => {
			if (result) {
				setCurrencyList(result);
			} else {
				console.log(error, 'error');
			}
		});

		Meteor.call('getUserFundBalance', Meteor.userId(), (error, result) => {
			if (result) {
				setFundBalance(result);
				console.log(result);
			} else {
				console.log(error, 'error');
			}
		});
	};

	const sendExchangeOrder = (): void => {
		Meteor.call('initCurrencyExchange', 'USD', 'GSD', amount, (error, result) => {
			if (result) {
				setCurrencyList(result);
			} else {
				console.log(error, 'error');
			}
		});
	};

	const submitExchangeOrder = (): void => {
		Meteor.call('initCurrencyExchange', 'USD', 'GSD', amount, (error, result) => {
			if (result) {
				setCurrencyList(result);
			} else {
				console.log(error, 'error');
			}
		});
	};

	const handleTopUp = (): void => {
		FlowRouter.go('/account/topup/USD');
	};
	return (
		<Page id='fund-balance-page'>
			<h1>{t('gso_funBalanceView_title')}</h1>
			<h2>List currencies</h2>

			{currencyList.length && currencyList.map((item, index) => <span key={index}>{item.code}</span>)}
			<hr />
			<h2>Fund balance</h2>
			<span>Owner id: {fundBalance?.owner}</span>

			{fundBalance?.accounts.map((item, index) => (
				<div key={index}>
					<span>
						<b>Currency</b> : {item.currency}
					</span>
					<br />
					<span>
						<b>available </b> :{item.availableAmount}
					</span>
					<br />
					<span>{item.lastTransaction}</span>
					<br />
				</div>
			))}

			<Button primary onClick={(): void => fetchData()}>
				Fetch list currency and fund balance
			</Button>

			<Box color='default' fontScale='p2'>
				<h2> Exchange currency USD - GSO</h2>
				<TextInput type='number' value={amount} onChange={(e: any): void => setAmount(e.target.value)} placeholder='Amount to exchange' />
				<Button onClick={(): void => sendExchangeOrder()}>
					<Icon size='x20' name='arrow-return' /> create Order each time amount if changed
				</Button>
				<Button info onClick={(): void => submitExchangeOrder()}>
					submit order
				</Button>
			</Box>

			<hr />
			<Box color='default' fontScale='p2'>
				<h2> Topup USD </h2>
				<Button onClick={(): void => handleTopUp()}>
					<Icon size='x20' name='arrow-return' /> Topup 50 USD
				</Button>
			</Box>
		</Page>
	);
};

export default FundBalanceView;
