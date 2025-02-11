import React, { ReactElement, useReducer } from 'react';

import { DispatchPreviousPageContext, UserPreviousPageContext } from '../contexts/UserPreviousPageContext/GlobalState';
import { UserPreviousPageReducer, InitialState } from '../contexts/UserPreviousPageContext/UserPreviousPageReducer';

const UserPreviousPageProvider = ({ children }): ReactElement => {
	const [global, dispatch] = useReducer(UserPreviousPageReducer, InitialState);
	return (
		<DispatchPreviousPageContext.Provider value={{ dispatch }}>
			<UserPreviousPageContext.Provider value={global}>{children}</UserPreviousPageContext.Provider>
		</DispatchPreviousPageContext.Provider>
	);
};

export default UserPreviousPageProvider;
