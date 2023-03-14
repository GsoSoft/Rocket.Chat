import type { FC } from 'react';
import React from 'react';

import {
	OmnichannelRoomIconProvider,
} from '../components/RoomIcon/OmnichannelRoomIcon/provider/OmnichannelRoomIconProvider';
import ActionManagerProvider from './ActionManagerProvider';
import AttachmentProvider from '../components/message/Attachments/providers/AttachmentProvider';
import AddressProvider from './AddressProvider';
import AuthorizationProvider from './AuthorizationProvider';
import AvatarUrlProvider from './AvatarUrlProvider';
import { CallProvider } from './CallProvider';
import ConnectionStatusProvider from './ConnectionStatusProvider';
import CustomSoundProvider from './CustomSoundProvider';
import DailyTasksProvider from './DailyTasksProvider';
import { DeviceProvider } from './DeviceProvider/DeviceProvider';
import InstagramPageContextProvider from './InstagramPageProvider';
import LayoutProvider from './LayoutProvider';
import ModalProvider from './ModalProvider';
import OmnichannelProvider from './OmnichannelProvider';
import PaymentResultProvider from './PaymentResultProvider';
import RouterProvider from './RouterProvider';
import ServerProvider from './ServerProvider';
import SessionProvider from './SessionProvider';
import SettingsProvider from './SettingsProvider';
import ToastMessagesProvider from './ToastMessagesProvider';
import TooltipProvider from './TooltipProvider';
import TranslationProvider from './TranslationProvider';
import UserPresenceProvider from './UserPresenceProvider';
import UserPreviousPageProvider from './UserPreviousPageProvider';
import UserProvider from './UserProvider';
import VideoConfProvider from './VideoConfProvider';

const MeteorProvider: FC = ({ children }) => (
	<ConnectionStatusProvider>
		<ServerProvider>
			<RouterProvider>
				<SettingsProvider>
					<TranslationProvider>
						<SessionProvider>
							<TooltipProvider>
								<ToastMessagesProvider>
									<LayoutProvider>
										<AvatarUrlProvider>
											<CustomSoundProvider>
												<UserProvider>
													<DeviceProvider>
														<ModalProvider>
															<AuthorizationProvider>
																<OmnichannelRoomIconProvider>
																	<UserPresenceProvider>
																		<ActionManagerProvider>
																			<VideoConfProvider>
																				<CallProvider>
																					<UserPreviousPageProvider>
																						<PaymentResultProvider>
																							<DailyTasksProvider>
																								<AddressProvider>
																									<InstagramPageContextProvider>

																										<OmnichannelProvider>{children}</OmnichannelProvider>
																									</InstagramPageContextProvider>
																								</AddressProvider>
																							</DailyTasksProvider>
																						</PaymentResultProvider>
																					</UserPreviousPageProvider>
																				</CallProvider>
																			</VideoConfProvider>
																		</ActionManagerProvider>
																	</UserPresenceProvider>
																</OmnichannelRoomIconProvider>
															</AuthorizationProvider>
														</ModalProvider>
													</DeviceProvider>
												</UserProvider>
											</CustomSoundProvider>
										</AvatarUrlProvider>
									</LayoutProvider>
								</ToastMessagesProvider>
							</TooltipProvider>
						</SessionProvider>
					</TranslationProvider>
				</SettingsProvider>
			</RouterProvider>
		</ServerProvider>
	</ConnectionStatusProvider>
);

export default MeteorProvider;
