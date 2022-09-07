import { Box, Modal, Icon } from '@rocket.chat/fuselage';
import React, { ReactElement } from 'react';

type Props = {
	closeModal: Function;
	gift: boolean;
};

const TasksModal = ({ closeModal, gift }: Props): ReactElement => (
	<Box>
		<Modal style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: '5' }}>
			<Modal.Header>
				<Modal.Close id='close' onClick={(): void => closeModal(false)} />
			</Modal.Header>
			<Modal.Content>
				{gift ? (
					<Box display='flex' alignItems='center'>
						<div style={{ cursor: 'pointer' }}>
							<Icon name='arrow-down-box' size='x100' />
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
							<span>Here's your gift for today. Click it to receive it</span>
						</div>
					</Box>
				) : (
					<Box display='flex' alignItems='center' flexDirection='column' style={{ margin: '10px 0 40px 0' }}>
						<span style={{ fontWeight: 'bold', marginBottom: '10px' }}>Description</span>
						<span>This task is meant to be completed soon.</span>
					</Box>
				)}
			</Modal.Content>
		</Modal>
	</Box>
);

export default TasksModal;
