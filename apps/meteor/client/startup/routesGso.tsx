// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
// @ts-ignore
import React, { lazy } from 'react';

import { appLayout } from '../lib/appLayout';
import MainLayout from '../views/root/MainLayout';
import FundBalanceView from '../views_gso/FundBalanceView';

const BlogViewPage = lazy(() => import('../views_gso/blog/BlogView'));
const GamesViewPage = lazy(() => import('../views_gso/games/GamesView'));
const ProductsViewPage = lazy(() => import('../views_gso/products/ProductsView'));
const StoreViewPage = lazy(() => import('../views/store/StoreView'));
const MessagesViewPage = lazy(() => import('../views/messages/MessagesView'));
const EmployerPreferencesView = lazy(() => import('../views_gso/employerPreferences/EmployerPreferencesView'));
const HallOfFameView = lazy(() => import('../views_gso/hallOfFame/HallOfFameView'));
const BrowseFreelancersView = lazy(() => import('../views_gso/browseFreelancers/BrowseFreelancersView'));
const InstagramCloneView = lazy(() => import('../views_gso/instagramClone/InstagramCloneView'));
const ListingPageView = lazy(() => import('../views_gso/instagramClone/components/listingPage'));
const SelectRoleViewPage = lazy(() => import('../views/roles/SelectRoleView'));
const RoleResultViewPage = lazy(() => import('../views/roles/components/RoleResult'));
const EscrowHistoryViewPage = lazy(() => import('../views_gso/escrowHistory/escrowHistory'));
const BlogDetailPageView = lazy(() => import('../views_gso/blog/BlogDetail'));
const GameDetailPageView = lazy(() => import('../views_gso/games/SingleGameDetails'));
const ProductDetailPageView = lazy(() => import('../views_gso/products/SIngleProductDetails'));
const DailyTasksPageView = lazy(() => import('../views_gso/achievable/DailyTasks'));

// New Routes for GSO app

FlowRouter.route('/blogs', {
	name: 'blogs',
	action: () => {
		appLayout.render(
			<MainLayout>
				<BlogViewPage />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/games', {
	name: 'games',
	action: () => {
		appLayout.render(
			<MainLayout>
				<GamesViewPage />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/products', {
	name: 'products',
	action: () => {
		appLayout.render(
			<MainLayout>
				<ProductsViewPage />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/store', {
	name: 'store',
	action: () => {
		appLayout.render(
			<MainLayout>
				<StoreViewPage />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/messages', {
	name: 'messages',
	action: () => {
		appLayout.render(
			<MainLayout>
				<MessagesViewPage />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/employer-preferences', {
	name: 'employer-preferences',
	action: () => {
		appLayout.render(
			<MainLayout>
				<EmployerPreferencesView />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/hall-of-fame', {
	name: 'hall-of-fame',
	action: () => {
		appLayout.render(
			<MainLayout>
				<HallOfFameView />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/browse-freelancers', {
	name: 'browse-freelancers',
	action: () => {
		appLayout.render(
			<MainLayout>
				<BrowseFreelancersView />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/instagram', {
	name: 'instagram',
	action: () => {
		appLayout.render(
			<MainLayout>
				<InstagramCloneView />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/instagram-listing-page', {
	name: 'instagram-listing-page',
	action: () => {
		appLayout.render(
			<MainLayout>
				<ListingPageView />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/select-role', {
	name: 'select-role',
	action: () => {
		appLayout.render(
			<MainLayout>
				<SelectRoleViewPage />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/role-result', {
	name: 'role-result',
	action: () => {
		appLayout.render(
			<MainLayout>
				<RoleResultViewPage />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/escrow-history', {
	name: 'escrow-history',
	action: () => {
		appLayout.render(
			<MainLayout>
				<EscrowHistoryViewPage />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/daily-tasks', {
	name: 'daily-tasks',
	action: () => {
		appLayout.render(
			<MainLayout>
				<DailyTasksPageView />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/blog/detail/:id', {
	name: 'blog-detail',
	action: () => {
		appLayout.render(
			<MainLayout>
				<BlogDetailPageView />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/games/detail/:id', {
	name: 'games-detail',
	action: () => {
		appLayout.render(
			<MainLayout>
				<GameDetailPageView />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/products/detail/:id', {
	name: 'products-detail',
	action: () => {
		appLayout.render(
			<MainLayout>
				<ProductDetailPageView />
			</MainLayout>,
		);
	},
});

FlowRouter.route('/fund/balance', {
	name: 'fund-balance',
	action: () => {
		appLayout.render(
			<MainLayout>
				<FundBalanceView />
			</MainLayout>,
		);
	},
});
