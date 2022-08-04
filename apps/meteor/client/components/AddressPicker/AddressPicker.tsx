/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Accordion, Box, CheckBox, Scrollable, Tile } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
import React, { ReactElement, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import CityData from '../../../public/json_data/geo_location.json';
import { DispatchAddressContext } from '../../contexts/AddressContext/GlobalState';
import Page from '../Page';
import ProfileHeader from '../ProfileHeader/ProfileHeader';

type Props = {
	title: string;
	id: string;
	handleRouteBack: Function;
	children: ReactNode;
};

const AddressPicker = ({ title, id, handleRouteBack, children }: Props): ReactElement => {
	const [checkedItem, setCheckedItem] = useState('');
	const [selectedDistricts, setSelectedDistricts] = useState<Record<string, any>[] | undefined>([]);
	const [checkedDistrict, setCheckedDistrict] = useState('');
	const t = useTranslation();
	const { dispatch } = useContext(DispatchAddressContext);

	useEffect(() => {
		// The first city is checked by default.
		if (CityData.length) {
			const firstCity = CityData[0];
			setCheckedItem(firstCity.displayName);
			setCheckedDistrict(firstCity.children ? firstCity.children[0].displayName : '');
		}
	}, []);

	useMemo(() => {
		CityData.map((city) => {
			if (city.displayName === checkedItem) {
				setSelectedDistricts(city.children);
				// Close the Accordion after 7 seconds.
				// It's for UI/UX purposes
				setTimeout(() => {
					const element = document.querySelectorAll('#cityAccordion');
					if (element.length) {
						Array.from(element).map((ele) => {
							// @ts-ignore
							ele.firstElementChild.setAttribute('aria-expanded', 'false');
							// @ts-ignore
							ele.lastElementChild.className = 'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel';
							return null;
						});
					}
				}, 7000);
			}
			return null;
		});
	}, [checkedItem]);

	return (
		<Page id={id}>
			{/* @ts-ignore */}
			<ProfileHeader title={title} handleRouteBack={handleRouteBack} />
			<Page.ScrollableContentWithShadow>
				<Accordion style={{ margin: '15px 0' }}>
					<Accordion.Item
						/* @ts-ignore */
						title={t('gso_hallOfFamePage_cityText')}
						/* @ts-ignore */
						id='cityAccordion'
						defaultExpanded
						style={{ padding: '0 0 0 1rem !important' }}
					>
						<Scrollable smooth>
							<Tile height={200} elevation='0'>
								{CityData.map((city, index) => (
									<Box
										key={index}
										display='flex'
										style={{ marginBottom: '10px' }}
										onClick={(): void => {
											dispatch({ type: 'ADD_ADDRESS', payload: { city: city.displayName, district: checkedDistrict } });
										}}
									>
										<CheckBox checked={checkedItem === city.displayName} onClick={(): void => setCheckedItem(city.displayName)} />
										<p style={{ marginLeft: '8px' }}>{city.displayName}</p>
									</Box>
								))}
							</Tile>
						</Scrollable>
					</Accordion.Item>
					{children}
					{/* @ts-ignore */}
					<Accordion.Item title={t('gso_hallOfFamePage_districtText')} id='cityAccordion' defaultExpanded>
						<Scrollable smooth>
							<Tile height={200} elevation='0'>
								{selectedDistricts?.length ? (
									selectedDistricts.map((district, index) => (
										<Box
											key={index}
											display='flex'
											style={{ marginBottom: '10px' }}
											onClick={(): void => {
												dispatch({ type: 'ADD_ADDRESS', payload: { city: checkedItem, district: district.displayName } });
											}}
										>
											<CheckBox
												checked={checkedDistrict === district.displayName}
												onClick={(): void => setCheckedDistrict(district.displayName)}
											/>
											<p style={{ marginLeft: '8px' }}>{district.displayName}</p>
										</Box>
									))
								) : (
									<div>There are No Districts for this city.</div>
								)}
							</Tile>
						</Scrollable>
					</Accordion.Item>
				</Accordion>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default AddressPicker;
