import React, { FC } from 'react';

import AttachmentProvider from '../components/message/Attachments/providers/AttachmentProvider';
import AuthorizationProvider from './AuthorizationProvider';
import AvatarUrlProvider from './AvatarUrlProvider';
import { CallProvider } from './CallProvider';
import ConnectionStatusProvider from './ConnectionStatusProvider';
import CustomSoundProvider from './CustomSoundProvider';
import DailyTasksProvider from './DailyTasksProvider';
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
													<AuthorizationProvider>
														<CallProvider>
															<OmnichannelProvider>
																<ModalProvider>
																	<UserPreviousPageProvider>
																		<PaymentResultProvider>
																			<DailyTasksProvider>
																				<AttachmentProvider>{children}</AttachmentProvider>
																			</DailyTasksProvider>
																		</PaymentResultProvider>
																	</UserPreviousPageProvider>
																</ModalProvider>
															</OmnichannelProvider>
														</CallProvider>
													</AuthorizationProvider>
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
