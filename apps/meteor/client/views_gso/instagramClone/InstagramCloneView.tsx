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

const InstagramClone = (): ReactElement => {
	const [posts, setPosts] = useState<Record<string, any>[]>([]);
	const [createdPost, setCreatedPost] = useState(false);
	const t = useTranslation();
	const [openModal, setOpenModal] = useState(false);
	const { value } = useContext(UserPreviousPageContext);
	const { numberOfResults } = useContext(InstagramPageGlobalContext);
	const { dispatch } = useContext(DispatchInstagramPageContext);

	const handleRouteBack = (): void => {
		FlowRouter.go(`${value.location}`);
	};

	useEffect(() => {
		if (!posts.length || createdPost || numberOfResults > 10) {
			Meteor.call('getMediaPostsWithoutComment', { offset: 1, count: numberOfResults }, {}, (error, result) => {
				console.log(numberOfResults);
				if (result.length) {
					console.log(result);
					setPosts(result);
					setCreatedPost(false);
				}
				if (error) {
					console.log(error);
				}
			});
		}
	}, [posts.length, createdPost, numberOfResults]);

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

	const loadMore = (): void => {
		dispatch({ type: 'LOAD_MORE', payload: { numberOfResults: numberOfResults + 10 } });
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
				<Button primary onClick={loadMore}>
					Load more
				</Button>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default InstagramClone;
