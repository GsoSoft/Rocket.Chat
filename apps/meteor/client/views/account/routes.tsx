import { lazy } from 'react';

import { createRouteGroup } from '../../lib/createRouteGroup';

export const registerAccountRoute = createRouteGroup(
	'account',
	'/account',
	lazy(() => import('./AccountRouter')),
);

registerAccountRoute('/preferences', {
	name: 'preferences',
	component: lazy(() => import('./preferences/AccountPreferencesPage')),
});

registerAccountRoute('/profile', {
	name: 'profile',
	component: lazy(() => import('./profile/AccountProfileRoute')),
});

registerAccountRoute('/view-profile', {
	name: 'view-profile',
	component: lazy(() => import('./ViewProfilePage')),
});

registerAccountRoute('/payment-history', {
	name: 'payment-history',
	component: lazy(() => import('../../views_gso/paymentHistory/paymentHistory')),
});

registerAccountRoute('/topup/:currency', {
	name: 'topup',
	component: lazy(() => import('../topup/TopUpView')),
});

registerAccountRoute('/payment-result', {
	name: 'payment-result',
	component: lazy(() => import('../topup/components/PaymentResult')),
});

registerAccountRoute('/security', {
	name: 'security',
	component: lazy(() => import('./security/AccountSecurityRoute')),
});

registerAccountRoute('/integrations', {
	name: 'integrations',
	component: lazy(() => import('./integrations/AccountIntegrationsRoute')),
});

registerAccountRoute('/tokens', {
	name: 'tokens',
	component: lazy(() => import('./tokens/AccountTokensRoute')),
});

registerAccountRoute('/omnichannel', {
	name: 'omnichannel',
	component: lazy(() => import('./omnichannel/OmnichannelPreferencesPage')),
});
