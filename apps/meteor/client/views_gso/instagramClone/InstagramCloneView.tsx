/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-multi-comp */
import { Button } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useContext, useEffect, useState } from 'react';

import Page from '../../components/Page';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { UserPreviousPageContext } from '../../contexts/UserPreviousPageContext/GlobalState';
import InstagramPost from './components/InstagramPost';
import CreatePostModal from './components/createPostModal';

const InstagramClone = (): ReactElement => {
	const [posts, setPosts] = useState<Record<string, any>[]>([]);
	const [createdPost, setCreatedPost] = useState(false);
	const t = useTranslation();
	const [openModal, setOpenModal] = useState(false);
	const { value } = useContext(UserPreviousPageContext);

	const handleRouteBack = (): void => {
		FlowRouter.go(`${value.location}`);
	};

	useEffect(() => {
		if (!posts.length || createdPost) {
			Meteor.call('getMediaPosts', 10, (error, result) => {
				if (result.length) {
					setPosts(result);
					setCreatedPost(false);
				}

				if (error) {
					console.log(error);
				}
			});
		}
	}, [posts.length, createdPost]);

	const extractFileType = (url: string): string => {
		if (url) {
			const fileType = url.slice(url.length - 3);
			if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
				return 'image';
			}
			return 'video';
		}
		return '';
	};
	return (
		<Page id='instagram-clone-page'>
			{/* @ts-ignore */}
			<ProfileHeader title={t('gso_instagramView_title')} handleRouteBack={handleRouteBack} page='instagram' openModal={setOpenModal} />
			<Page.ScrollableContentWithShadow>
				{openModal ? <CreatePostModal setOpenModal={setOpenModal} setCreatedPost={setCreatedPost} /> : null}
				{posts.length
					? posts.map((post, index) => (
							<div key={index}>
								<InstagramPost
									post={post}
									setOpenModal={setOpenModal}
									setCreatedPost={setCreatedPost}
									type={extractFileType(post.images[0].url)}
								/>
							</div>
					  ))
					: 'Loading...'}
				<Button primary>Load more</Button>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default InstagramClone;
