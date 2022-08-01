/* eslint-disable @typescript-eslint/no-empty-function */
import { InputBox, Icon, Box, Button } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { ReactElement, useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Page from '../../../components/Page';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import { UserPreviousPageContext } from '../../../contexts/UserPreviousPageContext/GlobalState';

const ListingPage = (): ReactElement => {
	const t = useTranslation();
	const { value } = useContext(UserPreviousPageContext);

	const handleRouteBack = (): void => {
		FlowRouter.go(`${value.location}`);
	};

	const images: Record<string, any>[] = [
		{ img: '/images/blog_images/Kimetsu_no_yaiba_1.jpg' },
		{ img: '/images/blog_images/Kimetsu_no_yaiba_2.jpg' },
		{ img: '/images/blog_images/Kimetsu_no_yaiba_3.png' },
		{ img: '/images/blog_images/Kimetsu_no_yaiba_4.jpg' },
		{ img: '/images/blog_images/Kimetsu_no_yaiba_5.png' },
		{ img: '/images/blog_images/Kimetsu_no_yaiba_6.jpg' },
		{ img: '/images/blog_images/Kimetsu_no_yaiba_7.png' },
		{ img: '/images/blog_images/Kimetsu_no_yaiba_9.jpg' },
	];
	return (
		<Page id='instagram-listing-page'>
			{/* @ts-ignore */}
			<ProfileHeader title={t('gso_listingPageView_title')} handleRouteBack={handleRouteBack} />
			<Page>
				<Box display='flex' alignItems='center' style={{ margin: '15px' }}>
					<Icon name='magnifier' size='x20' style={{ paddingRight: '8px' }} />
					<InputBox type='text' placeholder='Search...' style={{ padding: '20px' }} onChange={(): void => {}} />
				</Box>
				<Container>
					<Row>
						{images.map((item, index) => (
							<Col xs={4} style={{ padding: '0px', position: 'relative' }} key={index}>
								<Icon name='copy' size='x20' style={{ position: 'absolute', left: '80%', top: '5px', background: '#fff' }} />
								<img src={item.img} style={{ height: '130px' }} alt='listing-image-1' />
							</Col>
						))}
					</Row>
				</Container>

				<Button primary style={{ position: 'absolute', width: '90%', bottom: '30px', left: '50%', transform: 'translateX(-50%)' }}>
					Load more
				</Button>
			</Page>
		</Page>
	);
};

export default ListingPage;
