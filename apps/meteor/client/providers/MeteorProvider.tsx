import React, { FC } from 'react';

import AttachmentProvider from '../components/message/Attachments/providers/AttachmentProvider';
import AuthorizationProvider from './AuthorizationProvider';
import AvatarUrlProvider from './AvatarUrlProvider';
import { CallProvider } from './CallProvider';
import ConnectionStatusProvider from './ConnectionStatusProvider';
import CustomSoundProvider from './CustomSoundProvider';
import { DeviceProvider } from './DeviceProvider';
import LayoutProvider from './LayoutProvider';
import ModalProvider from './ModalProvider';
import OmnichannelProvider from './OmnichannelProvider';
import RouterProvider from './RouterProvider';
import ServerProvider from './ServerProvider';
import SessionProvider from './SessionProvider';
import SettingsProvider from './SettingsProvider';
import ToastMessagesProvider from './ToastMessagesProvider';
import TooltipProvider from './TooltipProvider';
import TranslationProvider from './TranslationProvider';

// gso part
import AddressProvider from './AddressProvider';
import DailyTasksProvider from './DailyTasksProvider';
import PaymentResultProvider from './PaymentResultProvider';
import UserPreviousPageProvider from './UserPreviousPageProvider';
import UserProvider from './UserProvider';

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
													<ModalProvider>
														<AuthorizationProvider>
															<DeviceProvider>
																<CallProvider>
																	<OmnichannelProvider>
																		<UserPreviousPageProvider>
																			<PaymentResultProvider>
																				<DailyTasksProvider>
																					<AddressProvider>
																						<AttachmentProvider>{children}</AttachmentProvider>
																					</AddressProvider>
																				</DailyTasksProvider>
																			</PaymentResultProvider>
																		</UserPreviousPageProvider>
																	</OmnichannelProvider>
																</CallProvider>
															</DeviceProvider>
														</AuthorizationProvider>
													</ModalProvider>
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
