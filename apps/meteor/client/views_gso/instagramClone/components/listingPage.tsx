/* eslint-disable @typescript-eslint/no-empty-function */
import { InputBox, Icon, Box, Button } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
import { result } from 'lodash';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { ReactElement, useContext, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Page from '../../../components/Page';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import { DispatchInstagramPageContext, InstagramPageGlobalContext } from '../../../contexts/InstagramPageContext/GlobalState';
import { DispatchPreviousPageContext, UserPreviousPageContext } from '../../../contexts/UserPreviousPageContext/GlobalState';
import { extractFileType } from '../InstagramCloneView';

const ListingPage = (): ReactElement => {
	const t = useTranslation();
	const { value } = useContext(UserPreviousPageContext);
	const { numberOfResults, results, extractedImages, clickedPostId } = useContext(InstagramPageGlobalContext);
	const { dispatch } = useContext(DispatchInstagramPageContext);
	const pageDispatch = useContext(DispatchPreviousPageContext);

	const handleRouteBack = (): void => {
		FlowRouter.go(`/home`);
	};

	useEffect(() => {
		if (!results.length || numberOfResults > 10) {
			Meteor.call('getMediaPostsWithoutComment', { offset: 1, count: numberOfResults }, {}, (error, result) => {
				if (result.length) {
					dispatch({ type: 'ADD_POSTS', payload: { results: result } });
				}
				if (error) {
					console.log(error);
				}
			});
		}

		if (results.length) {
			extractImages();
		}

		if (clickedPostId) {
			const clickedImg = document.querySelector(`#${clickedPostId}`);
			if (clickedImg) {
				clickedImg.scrollIntoView();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [results.length, numberOfResults, dispatch, value]);

	const extractImages = (): void => {
		const imageList: Record<string, any>[] = [];
		results.map((post, index) => {
			// @ts-ignore
			imageList.push(post.images[0]);
			if (index === result.length - 1) {
				dispatch({ type: 'ADD_EXTRACTED_IMAGES', payload: { extractedImages: imageList } });
			}
			return null;
		});
	};

	const routeToInstagramPosts = (id: string): void => {
		dispatch({ type: 'ADD_CLICKED_POST', payload: { clickedPostId: id } });
		pageDispatch.dispatch({ type: 'ADD_LOCATION', payload: { location: '/instagram-listing-page' } });
		FlowRouter.go('/instagram');
	};

	const loadMore = (): void => {
		dispatch({ type: 'LOAD_MORE', payload: { numberOfResults: numberOfResults + 10 } });
	};

	return (
		<Page id='instagram-listing-page'>
			{/* @ts-ignore */}
			<ProfileHeader title={t('gso_listingPageView_title')} handleRouteBack={handleRouteBack} />
			<Page.ScrollableContent>
				<Box display='flex' alignItems='center' style={{ margin: '15px' }}>
					<Icon name='magnifier' size='x20' style={{ paddingRight: '8px' }} />
					<InputBox type='text' placeholder='Search...' style={{ padding: '20px' }} onChange={(): void => {}} />
				</Box>
				<Container>
					<Row>
						{extractedImages.length
							? extractedImages.map((item: Record<string, any>, index) => (
									<Col
										xs={4}
										style={{ padding: '0px', position: 'relative', cursor: 'pointer' }}
										key={index}
										onClick={(): void => routeToInstagramPosts(item.id)}
										id={item.id}
									>
										<Icon
											name={extractFileType(item.url) === 'image' ? 'copy' : 'play-solid'}
											size='x20'
											style={{
												position: 'absolute',
												left: '80%',
												top: '5px',
												background: extractFileType(item.url) === 'image' ? '#fff' : 'transparent',
												color: extractFileType(item.url) === 'image' ? '#333' : '#fff',
											}}
										/>
										<img
											src={extractFileType(item.url) === 'image' ? item.url : 'https://source.unsplash.com/2l0CWTpcChI/300x300/'}
											style={{ height: '130px' }}
											alt='listing-image-1'
										/>
									</Col>
							  ))
							: 'Loading...'}
					</Row>
				</Container>
			</Page.ScrollableContent>
			<Button
				primary
				style={{ position: 'absolute', width: '90%', bottom: '30px', left: '50%', transform: 'translateX(-50%)' }}
				onClick={loadMore}
			>
				Load more
			</Button>
		</Page>
	);
};

export default ListingPage;
