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
import { DispatchInstagramPageContext, InstagramPageGlobalContext } from '../../contexts/InstagramPageContext/GlobalState';
import { UserPreviousPageContext } from '../../contexts/UserPreviousPageContext/GlobalState';
import InstagramPost from './components/InstagramPost';
import CreatePostModal from './components/createPostModal';

export const extractFileType = (url: string): string => {
	if (url) {
		const fileType = url.slice(url.length - 3);
		if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'webp') {
			return 'image';
		}
		return 'video';
	}
	return '';
};

const InstagramClone = (): ReactElement => {
	const [createdPost, setCreatedPost] = useState(false);
	const t = useTranslation();
	const [openModal, setOpenModal] = useState(false);
	const { value } = useContext(UserPreviousPageContext);
	const { numberOfResults, results, clickedPostId } = useContext(InstagramPageGlobalContext);
	const { dispatch } = useContext(DispatchInstagramPageContext);
	// const pageDispatch = useContext(DispatchInstagramPageContext);

	const handleRouteBack = (): void => {
		FlowRouter.go(`${value.location}`);
	};

	useEffect(() => {
		if (!results.length || createdPost || numberOfResults > 10) {
			Meteor.call('getMediaPostsWithoutComment', { offset: 1, count: numberOfResults }, {}, (error, result) => {
				if (result.length) {
					dispatch({ type: 'ADD_POSTS', payload: { results: result } });
					setCreatedPost(false);
				}
				if (error) {
					console.log(error);
				}
			});
		}

		if (clickedPostId) {
			console.log(clickedPostId);
			const clickedPost = document.querySelector(`#${clickedPostId}`);
			if (clickedPost) {
				clickedPost.scrollIntoView();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [results.length, createdPost, numberOfResults, clickedPostId]);

	const loadMore = (): void => {
		dispatch({ type: 'LOAD_MORE', payload: { numberOfResults: numberOfResults + 10 } });
	};
	return (
		<Page id='instagram-clone-page'>
			{/* @ts-ignore */}
			<ProfileHeader title={t('gso_instagramView_title')} handleRouteBack={handleRouteBack} page='instagram' openModal={setOpenModal} />
			<Page.ScrollableContentWithShadow>
				{openModal ? <CreatePostModal setOpenModal={setOpenModal} setCreatedPost={setCreatedPost} /> : null}
				{results.length
					? results.map((post, index) => (
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
				<Button primary onClick={loadMore}>
					Load more
				</Button>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default InstagramClone;
