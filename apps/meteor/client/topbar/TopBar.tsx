import { TopBarTitle, TopBarToolBox, TopBarActions, TopBarAction, Menu, Box, Icon } from '@rocket.chat/fuselage';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { ReactElement, useContext } from 'react';

import { DispatchPreviousPageContext } from '../contexts/UserPreviousPageContext/GlobalState';

type Props = {
	location?: string;
};

const TopBar = ({ location }: Props): ReactElement => {
	const { dispatch } = useContext(DispatchPreviousPageContext);

	return (
		<TopBarToolBox>
			<TopBarTitle>RocketChat App</TopBarTitle>
			<TopBarActions>
				<TopBarAction icon='bell' />
				<Menu
					className='topBarMenu'
					options={{
						employerPreferences: {
							action: function noRefCheck(): void {
								// This so as to allow the linting to pass - @typescript-eslint/no-empty-function
								dispatch({ type: 'ADD_LOCATION', payload: { location: `/${location}` } });
								FlowRouter.go('/employer-preferences');
							},
							label: (
								<Box alignItems='center' display='flex'>
									<Icon mie='x4' name='condensed-view' size='x16' />
									Employer Preferences
								</Box>
							),
						},
						hallOfFame: {
							action: function noRefCheck(): void {
								// This so as to allow the linting to pass - @typescript-eslint/no-empty-function
								dispatch({ type: 'ADD_LOCATION', payload: { location: `/${location}` } });
								FlowRouter.go('/hall-of-fame');
							},
							label: (
								<Box alignItems='center' display='flex'>
									<Icon mie='x4' name='team' size='x20' />
									Hall of Fame
								</Box>
							),
						},
						browseFreelancers: {
							action: function noRefCheck(): void {
								// This so as to allow the linting to pass - @typescript-eslint/no-empty-function
								dispatch({ type: 'ADD_LOCATION', payload: { location: `/${location}` } });
								FlowRouter.go('/browse-freelancers');
							},
							label: (
								<Box alignItems='center' display='flex'>
									<Icon mie='x4' name='magnifier' size='x20' />
									Browse Freelancers
								</Box>
							),
						},
						instagram: {
							action: function noRefCheck(): void {
								// This so as to allow the linting to pass - @typescript-eslint/no-empty-function
								dispatch({ type: 'ADD_LOCATION', payload: { location: `/${location}` } });
								FlowRouter.go('/instagram');
							},
							label: (
								<Box alignItems='center' display='flex'>
									<Icon mie='x4' name='camera' size='x20' />
									Instagram
								</Box>
							),
						},
						instagrmListingPage: {
							action: function noRefCheck(): void {
								// This so as to allow the linting to pass - @typescript-eslint/no-empty-function
								dispatch({ type: 'ADD_LOCATION', payload: { location: `/${location}` } });
								FlowRouter.go('/instagram-listing-page');
							},
							label: (
								<Box alignItems='center' display='flex'>
									<Icon mie='x4' name='dialpad' size='x20' />
									Instagram Listing Page
								</Box>
							),
						},
						tasks: {
							action: function noRefCheck(): void {
								// This so as to allow the linting to pass - @typescript-eslint/no-empty-function
								dispatch({ type: 'ADD_LOCATION', payload: { location: `/${location}` } });
								FlowRouter.go('/daily-tasks');
							},
							label: (
								<Box alignItems='center' display='flex'>
									<Icon mie='x4' name='file' size='x16' />
									Tasks
								</Box>
							),
						},
						selectRole: {
							action: function noRefCheck(): void {
								// This so as to allow the linting to pass - @typescript-eslint/no-empty-function
								dispatch({ type: 'ADD_LOCATION', payload: { location: `/${location}` } });
								FlowRouter.go('/select-role');
							},
							label: (
								<Box alignItems='center' display='flex'>
									<Icon mie='x4' name='user' size='x16' />
									Select a role
								</Box>
							),
						},
						escrowHistory: {
							action: function noRefCheck(): void {
								// This so as to allow the linting to pass - @typescript-eslint/no-empty-function
								dispatch({ type: 'ADD_LOCATION', payload: { location: `/${location}` } });
								FlowRouter.go('/escrow-history');
							},
							label: (
								<Box alignItems='center' display='flex'>
									<Icon mie='x4' name='file' size='x16' />
									Escrow history
								</Box>
							),
						},
						logout: {
							action: function noRefCheck(): void {
								// This so as to allow the linting to pass - @typescript-eslint/no-empty-function
								console.log('refCheck');
							},
							label: (
								<Box alignItems='center' color='danger' display='flex'>
									<Icon mie='x4' name='trash' size='x16' />
									Logout
								</Box>
							),
						},
						changePassword: {
							action: function noRefCheck(): void {
								// This so as to allow the linting to pass - @typescript-eslint/no-empty-function
								console.log('refCheck');
							},
							label: (
								<Box alignItems='center' display='flex'>
									<Icon mie='x4' name='key' size='x16' />
									Change Password
								</Box>
							),
						},
					}}
				>
					<Icon name='avatar' size='x30' />
				</Menu>
			</TopBarActions>
		</TopBarToolBox>
	);
};

export default TopBar;
