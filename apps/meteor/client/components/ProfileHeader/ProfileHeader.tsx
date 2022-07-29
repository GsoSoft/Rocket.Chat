/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Icon } from '@rocket.chat/fuselage';
import React, { ReactElement } from 'react';

type Props = {
	title: string;
	handleRouteBack: React.MouseEventHandler<HTMLElement>;
	page?: string;
	openModal?: Function;
};

const ProfileHeader = ({ title, handleRouteBack, page, openModal = (): void => {} }: Props): ReactElement => (
	<Box
		style={{ height: '60px', marginTop: '10px', paddingRight: '10px' }}
		display='flex'
		justifyContent='space-between'
		alignItems='center'
	>
		<Box display='flex' alignItems='center'>
			<Icon name='chevron-right' style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={handleRouteBack} fontSize='32px' />
			<h4 style={{ fontWeight: 'bold', fontSize: '24px', marginLeft: '8px' }}>{title}</h4>
		</Box>
		{page === 'instagram' ? (
			<Icon mie='x4' name='plus' size='x20' style={{ cursor: 'pointer' }} onClick={(): void => openModal(true)} />
		) : null}
	</Box>
);

export default ProfileHeader;
