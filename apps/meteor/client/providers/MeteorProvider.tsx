import type { FC } from 'react';
import React from 'react';

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
import UserPreviousPageProvider from './UserPreviousPageProvider';
import UserProvider from './UserProvider';
import VideoConfProvider from './VideoConfProvider';

const MeteorProvider: FC = ({ children }) => (
	<ConnectionStatusProvider>
		<ServerProvider>
			<RouterProvider>
				<TranslationProvider>
					<SessionProvider>
						<TooltipProvider>
							<ToastMessagesProvider>
								<SettingsProvider>
									<LayoutProvider>
										<AvatarUrlProvider>
											<CustomSoundProvider>
												<UserProvider>
													<DeviceProvider>
														<ModalProvider>
															<AuthorizationProvider>
																<VideoConfProvider>
																	<CallProvider>
																		<OmnichannelProvider>
																			<UserPreviousPageProvider>
																				<PaymentResultProvider>
																					<DailyTasksProvider>
																						<AddressProvider>
																							<InstagramPageContextProvider>
																								<AttachmentProvider>{children}</AttachmentProvider>
																							</InstagramPageContextProvider>
																						</AddressProvider>
																					</DailyTasksProvider>
																				</PaymentResultProvider>
																			</UserPreviousPageProvider>
																		</OmnichannelProvider>
																	</CallProvider>
																</VideoConfProvider>
															</AuthorizationProvider>
														</ModalProvider>
													</DeviceProvider>
												</UserProvider>
											</CustomSoundProvider>
										</AvatarUrlProvider>
									</LayoutProvider>
								</SettingsProvider>
							</ToastMessagesProvider>
						</TooltipProvider>
					</SessionProvider>
				</TranslationProvider>
			</RouterProvider>
		</ServerProvider>
	</ConnectionStatusProvider>
);

export default MeteorProvider;
