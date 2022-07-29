import { Dropzone, FileItem, FileValidated } from '@dropzone-ui/react';
import { IMediaPost } from '@rocket.chat/core-typings';
import { Button, Field, FieldGroup, Icon, Modal, TextAreaInput } from '@rocket.chat/fuselage';
import sha256 from 'crypto-js/sha256';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useContext, useEffect, useState } from 'react';

import { DispatchInstagramPageContext, InstagramPageGlobalContext } from '../../../contexts/InstagramPageContext/GlobalState';

type Props = {
	setOpenModal: Function;
	setCreatedPost: Function;
};

const CreatePostModal = ({ setOpenModal, setCreatedPost }: Props): ReactElement => {
	const [captionText, setcaptionText] = useState<IMediaPost['caption']>('');
	const [files, setFiles] = useState<FileValidated[]>([]);
	const [fileType, setFileType] = useState('image');
	const [update, setUpdate] = useState(false);
	const { caption, id } = useContext(InstagramPageGlobalContext);
	const { dispatch } = useContext(DispatchInstagramPageContext);

	useEffect(() => {
		if (caption !== '') {
			setcaptionText(caption);
			setUpdate(true);
		}
	}, [caption]);

	const postToBackend = (images?: Record<string, any>[]): void => {
		if (update) {
			Meteor.call('updateMediaPost', id, { caption: captionText }, (error, result) => {
				if (result) {
					console.log(result, 'Post updated!');
					setCreatedPost(true);
					setUpdate(false);
					dispatch({ type: 'CLEAR_DETAILS' });
					setOpenModal(false);
				}

				if (error) {
					console.error(error);
					setUpdate(false);
					dispatch({ type: 'CLEAR_DETAILS' });
					setOpenModal(false);
				}
			});
		} else {
			Meteor.call('createMediaPost', { caption: captionText, images }, (error, result) => {
				if (result) {
					console.log(result, 'new post created!');
					setCreatedPost(true);
					setOpenModal(false);
				}

				if (error) {
					console.error(error);
					setOpenModal(false);
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	};
	// The share button should trigger sending the images or videos to cloudinary.
	const share = (): void => {
		const uploadedImages: Record<string, any>[] = [];
		const uploadUrl = `https://api.cloudinary.com/v1_1/${Meteor.settings.public.cloudinary.name}/${fileType}/upload`;
		files.forEach(async (fileData) => {
			const formData = new FormData();
			const timestamp = new Date().getTime();
			formData.append('file', fileData.file);
			formData.append('api_key', Meteor.settings.public.cloudinary.APIKey);
			formData.append('timestamp', `${timestamp}`);
			formData.append('signature', sha256(`timestamp=${timestamp}${Meteor.settings.public.cloudinary.APISecret}`).toString());
			try {
				const response = await fetch(uploadUrl, { method: 'POST', body: formData });
				const data = await response.json();
				uploadedImages.push({ id: data.public_id, url: data.secure_url });

				if (uploadedImages.length === files.length) {
					postToBackend(uploadedImages);
				}
			} catch (error) {
				console.error(error);
			}
		});
	};

	const updateFiles = (incomingFiles: FileValidated[]): void => {
		if (incomingFiles[0].file.type === 'video/mp4') {
			setFileType('video');
		}
		setFiles(incomingFiles);
	};
	const removeFile = (id: string): void => {
		// @ts-ignore
		setFiles(files.filter((x) => x.id !== id));
	};

	const handleModalClose = (): void => {
		setOpenModal(false);
		dispatch({ type: 'CLEAR_DETAILS' });
	};
	return (
		<Modal>
			<Modal.Header display='flex' justifyContent='space-between'>
				<Icon mie='x4' name='chevron-right' size='x28' style={{ cursor: 'pointer' }} onClick={(): void => handleModalClose()} />
				<Modal.Title>Create new post</Modal.Title>
				<Button
					style={{ color: 'rgb(0, 149, 246)', background: 'transparent', border: 'none', fontSize: '16px' }}
					// @ts-ignore
					onClick={update ? postToBackend : share}
				>
					Share
				</Button>
			</Modal.Header>
			<Modal.Content display='flex' flexDirection='column' style={{ paddingBottom: '45px' }}>
				<Dropzone style={{ width: '100%' }} onChange={updateFiles} value={files}>
					{files.map((file) => (
						// @ts-ignore
						<FileItem {...file} onDelete={removeFile} key={file.id} info />
					))}
				</Dropzone>
				<FieldGroup>
					<Field style={{ marginTop: '14px' }}>
						<Field.Label>caption</Field.Label>
						<Field.Row>
							<TextAreaInput
								placeholder='Add your captionText...'
								value={captionText}
								onChange={(e): void => setcaptionText((e.target as HTMLInputElement).value)}
							/>
						</Field.Row>
					</Field>
				</FieldGroup>
			</Modal.Content>
		</Modal>
	);
};

export default CreatePostModal;
