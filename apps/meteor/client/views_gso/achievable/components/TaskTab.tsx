import { Box, Tile, Icon } from '@rocket.chat/fuselage';
import React, { ReactElement } from 'react';

type Props = {
	setModal: Function;
	setGift: Function;
	title: string;
	content: Record<string, any>[];
};

const TaskTab = ({ setGift, setModal, title, content }: Props): ReactElement => (
	<>
		<Tile style={{ background: 'rgba(47, 52, 61, 0.1)' }}>{title}</Tile>
		{content.map((item, index) => (
			<Tile key={index}>
				<Box display='flex' justifyContent='space-between' alignItems='center'>
					<span style={{ fontSize: '15px' }}>{item.title.slice(0)}</span>
					<div style={{ display: 'flex' }}>
						<Icon
							onClick={(): void => {
								setModal(true);
								setGift(true);
							}}
							style={{ cursor: 'pointer' }}
							name='arrow-down-box'
							size='x35'
						/>
						<Icon
							onClick={(): void => {
								setModal(true);
								setGift(false);
							}}
							style={{ cursor: 'pointer' }}
							name='info'
							size='x35'
						/>
					</div>
				</Box>
			</Tile>
		))}
	</>
);

export default TaskTab;
