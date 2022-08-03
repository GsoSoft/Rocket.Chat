/* eslint-disable react/no-multi-comp */
import { Tile, Box, Icon, Tooltip } from '@rocket.chat/fuselage';
import sha256 from 'crypto-js/sha256';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useContext } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import '../instagramCloneCss.css';
import { DispatchInstagramPageContext } from '../../../contexts/InstagramPageContext/GlobalState';

interface ICommentProps {
	author: string;
	content: string;
}

type Props = {
	post: Record<string, any>;
	setOpenModal: Function;
	setCreatedPost: Function;
	type: string;
};

const Comment = ({ author, content }: ICommentProps): ReactElement => (
	<>
		<span style={{ fontWeight: 'bold' }}>{author}</span> {content.length > 55 ? `${content.slice(0, 55)}...` : content}
	</>
);

const InstagramPost = ({ post: { createdBy, _id, images, likes, caption }, setOpenModal, setCreatedPost, type }: Props): ReactElement => {
	const { dispatch } = useContext(DispatchInstagramPageContext);
	const showToolTip = (item: string): void => {
		const element = document.getElementById(item);
		if (element) {
			if (element.classList.contains('invisible')) {
				element.classList.remove('invisible');
				element.classList.add('visible');
			} else {
				element.classList.remove('visible');
				element.classList.add('invisible');
			}
		}
	};
	const deletePost = (postId: string): void => {
		Meteor.call('deleteMediaPost', postId, (error, result) => {
			if (result) {
				console.log(result);
				// This is mean to refresh the ui and trigger fetching the new list of posts from the backend
				setCreatedPost(true);
			}

			if (error) {
				console.error(error);
			}
		});
	};

	const deletePostFromCloudinary = (images: Record<string, any>[], postId: string): void => {
		showToolTip(postId);
		const deleteUrl = `https://api.cloudinary.com/v1_1/${Meteor.settings.public.cloudinary.name}/${type}/destroy`;
		images.forEach(async (fileData, index) => {
			const formData = new FormData();
			const timestamp = new Date().getTime();
			formData.append('public_id', fileData.id);
			formData.append('api_key', Meteor.settings.public.cloudinary.APIKey);
			formData.append('timestamp', `${timestamp}`);
			formData.append(
				'signature',
				sha256(`public_id=${fileData.id}&timestamp=${timestamp}${Meteor.settings.public.cloudinary.APISecret}`).toString(),
			);
			try {
				const response = await fetch(deleteUrl, { method: 'POST', body: formData });
				const data = await response.json();

				if (index === images.length - 1 && data.result === 'ok') {
					deletePost(postId);
				}
			} catch (error) {
				console.error(error);
			}
		});
	};

	const handleUpdate = (oldCaption: string, id: string): void => {
		dispatch({ type: 'ADD_DETAILS', payload: { caption: oldCaption, id } });
		setOpenModal(true);
	};
	return (
		<Tile id={images[0].id} style={{ maxWidth: '473px' }}>
			<Box display='flex' justifyContent='space-between' alignItems='center' style={{ padding: '1rem' }}>
				<Box display='flex' alignItems='center'>
					<Box style={{ border: '3px solid #ff3041', borderRadius: '100%', height: '55px', width: '55px' }}>
						<img
							src={type === 'image' ? images[0].url : 'https://source.unsplash.com/2l0CWTpcChI/300x300/'}
							alt='profile image'
							style={{ width: '50px', height: '50px', borderRadius: '100%' }}
						/>
					</Box>
					<p style={{ fontWeight: 'bold', marginLeft: '8px' }}>{createdBy}</p>
				</Box>
				<Tooltip id={_id} style={{ backgroundColor: 'whitesmoke', pointerEvents: 'all' }} className='invisible' placement='left'>
					{Meteor.user()?.username === createdBy ? (
						<>
							<p style={{ cursor: 'pointer', marginBottom: '8px' }} onClick={(): void => handleUpdate(caption, _id)}>
								Update
							</p>
							<p
								style={{ color: '#ff3041', marginBottom: '8px', cursor: 'pointer' }}
								onClick={(): void => deletePostFromCloudinary(images, _id)}
							>
								Delete
							</p>
						</>
					) : null}
					<p style={{ cursor: 'pointer', marginBottom: '8px' }}>Share</p>
				</Tooltip>
				<Icon onClick={(): void => showToolTip(_id)} mie='x4' name='meatballs' size='x20' style={{ cursor: 'pointer' }} />
			</Box>
			<Box>
				{type === 'image' ? (
					<Swiper pagination={{ clickable: true }} grabCursor={true} modules={[Pagination]}>
						{images.map((img, index) => (
							<SwiperSlide key={index}>
								<img
									src={img.url}
									alt='profile image'
									style={{ maxWidth: '473px', height: '373px', width: '100%', marginBottom: '40px' }}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<Swiper pagination={{ clickable: true }} grabCursor={true} modules={[Pagination]}>
						{images.map((img, index) => (
							<SwiperSlide key={index}>
								<video controls width='100%' style={{ marginBottom: '40px' }}>
									<source src={img.url} type='video/mp4' />
									Sorry, your browser doesn't support embedded videos.
								</video>
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</Box>
			<Box style={{ padding: '10px 16px' }}>
				<Icon mie='x4' name='check' size='x28' style={{ marginLeft: '8px' }} />
				<Icon mie='x4' name='balloon' size='x28' style={{ marginLeft: '8px' }} />
				<Icon mie='x4' name='send-active' size='x28' style={{ marginLeft: '8px' }} />
				<p style={{ fontWeight: 'bold', paddingTop: '10px' }}>{likes} views</p>
				<p style={{ paddingTop: '10px' }}>
					<Comment author={createdBy} content={caption} />
				</p>
				<Box style={{ paddingTop: '10px' }}>
					<p style={{ color: 'rgb(142, 142, 142)' }}>View all 2 comments</p>
					<Box display='flex' flexDirection='column'>
						<Comment author='Nezuko Kamado' content="He's a good brother who's very dedicated and strong" />
					</Box>
				</Box>
				<p style={{ paddingTop: '10px', color: 'rgb(142, 142, 142)' }}>4 HOURS AGO</p>
			</Box>
		</Tile>
	);
};

export default InstagramPost;
