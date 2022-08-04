import { Accordion, Box, Button, CheckBox, Icon, Tooltip } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useContext, useEffect, useMemo, useState } from 'react';

import TagGroups from '../../../public/json_data/tagGroup.json';
import Tags from '../../../public/json_data/tags.json';
import Page from '../../components/Page';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { UserPreviousPageContext } from '../../contexts/UserPreviousPageContext/GlobalState';
import { useShowTooltip } from '../../hooks/gso/useShowTooltip';
import './tooltip.css';

const EmployerPreferencesView = (): ReactElement => {
	const [openGateway, setOpenGateway] = useState<Record<string, any>>({});
	const [closeGateway, setCloseGateway] = useState('');
	const [createdTags, setCreatedTags] = useState<any>();
	const [numberOfTags, setNumberOfTags] = useState(3);
	const [tags, setTags] = useState<Record<string, any>[]>([]);
	const [tagGroups, setTagGroups] = useState<Record<string, any>[]>([]);
	const [cleanedResults, setCleanedResults] = useState<Record<string, any>[]>([]);
	const [checkedItems, setCheckedItems] = useState<string[]>([]);
	const { value } = useContext(UserPreviousPageContext);
	const t = useTranslation();
	const showToolTip = useShowTooltip();

	const createTagGroups = (): void => {
		Meteor.call('createManyTagGroups', TagGroups.groups, (error, result) => {
			if (result) {
				Meteor.call('createManyTags', Tags.tags, (error, result) => {
					if (result) {
						// Refetch the preferences after the tags have been created.
						setCreatedTags(result);
					}

					if (error) {
						console.log(error, 'createdManyTags');
					}
				});
			}

			if (error) {
				console.log(error, 'createdManyTagGroups');
			}
		});
	};

	// Fetch tag groups and add them to state.
	// which triggers a usememo to filter through the listByCategory
	// and arrange them into an object with an items array.

	useEffect(() => {
		if (!tags.length) {
			Meteor.call('listTagsByCategory', numberOfTags, (error, result) => {
				if (result.length) {
					setTags(result);
				} else {
					createTagGroups();
				}

				if (error) {
					console.log(error);
				}
			});
		}

		if (!tagGroups.length) {
			Meteor.call('getTagGroups', {}, {}, (error, result) => {
				if (result.length) {
					setTagGroups(result);
				} else {
					createTagGroups();
				}

				if (error) {
					console.log(error);
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createdTags]);

	useMemo(() => {
		if (tagGroups.length && tags.length) {
			// Map over both tagGroups and tags to form a new array that contains all the items we need
			// to display.
			tagGroups.map((group) => {
				const groupObj = { id: group._id, title: group.title, description: group.description, items: [] };
				// Map over the tags and add all the ones that match to that specific groupObj
				tags.map((tag) => {
					if (tag.category === group._id) {
						// @ts-ignore
						groupObj.items.push(tag.title);
					}
					return null;
				});
				const currentCleanedResults = cleanedResults;
				currentCleanedResults.push(groupObj);
				setCleanedResults(currentCleanedResults);
				return null;
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tagGroups, tags]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const openGatewayFn = useMemo((): void => {
		if (openGateway) {
			const element = document.querySelector(`#${openGateway.id}`);
			if (element) {
				// If the Accordion Item is closed then open it, otherwise close it.
				if (openGateway.open === 'true') {
					// @ts-ignore
					element.firstElementChild.setAttribute('aria-expanded', 'true');
					// @ts-ignore
					element.lastElementChild.className =
						'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel--expanded rcx-accordion-item__panel';
				} else {
					// @ts-ignore
					element.firstElementChild.setAttribute('aria-expanded', 'false');
					// @ts-ignore
					element.lastElementChild.className = 'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel';
				}
			}
		}
	}, [openGateway]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const closePreviousAccordionItem = useMemo(() => {
		if (closeGateway) {
			const element = document.querySelector(`#${closeGateway}`);
			if (element) {
				// @ts-ignore
				element.firstElementChild.setAttribute('aria-expanded', 'false');
				// @ts-ignore
				element.lastElementChild.className = 'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel';
			}
		}
	}, [closeGateway]);
	const onAccordionToggle = (e): void => {
		// Close the previously opened gateway
		if (openGateway.id) {
			setCloseGateway(openGateway.id);
		}
		const accordionItem = e.currentTarget.parentNode;
		let open = 'false';
		if (e.currentTarget.getAttribute('aria-expanded') === 'false') {
			open = 'true';
		}
		setOpenGateway({ open, id: accordionItem.id });
	};

	const handleCheckBox = (item: string): void => {
		if (!checkedItems.includes(item)) {
			setCheckedItems([...checkedItems, item]);
		}
	};

	const handleRouteBack = (): void => {
		FlowRouter.go(`${value.location}`);
	};

	return (
		<Page id='employer-preferences-page'>
			{/* @ts-ignore */}
			<ProfileHeader title={t('gso_employerPreferencesPage_header')} handleRouteBack={handleRouteBack} />
			<Page.ScrollableContentWithShadow>
				{/* @ts-ignore */}
				<h3 style={{ fontSize: '19px', marginBottom: '10px' }}>{t('gso_employerPreferencesPage_title')}</h3>
				<Accordion style={{ margin: '15px 0' }}>
					{cleanedResults.length
						? cleanedResults.map((pref, index) => (
								/* @ts-ignore */
								<Accordion.Item key={index} title={pref.title} id={pref.id} onToggle={onAccordionToggle} defaultExpanded={index === 0}>
									<Box>
										<p style={{ marginBottom: '15px' }}>{pref.description}</p>
										{pref.items.map((item, index) => (
											<Box display='flex' key={index} justifyContent='space-between' style={{ marginBottom: '9px' }}>
												<Box display='flex'>
													<CheckBox key={index} onClick={(): void => handleCheckBox(item)} />
													<p style={{ marginLeft: '8px' }}>{item}</p>
												</Box>
												<Box style={{ position: 'relative' }}>
													{/* The regex is meant to remove any spacing in the word so that we can later select this element using query selector */}
													<Tooltip id={item.replace(/\s+/g, '-')} className='invisible' placement='left'>
														Description
													</Tooltip>
													{/* Same thing here */}
													<Icon onClick={(): void => showToolTip(item.replace(/\s+/g, '-'))} name='info' size='x32' />
												</Box>
											</Box>
										))}
										<Button secondary onClick={(): void => setNumberOfTags(numberOfTags + 3)}>
											More Tags
										</Button>
									</Box>
								</Accordion.Item>
						  ))
						: '...Loading'}
				</Accordion>
				<Button primary>Save</Button>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default EmployerPreferencesView;
