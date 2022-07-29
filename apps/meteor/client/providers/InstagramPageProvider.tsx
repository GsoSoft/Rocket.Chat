import React, { ReactElement, useReducer } from 'react';

import { DispatchInstagramPageContext, InstagramPageGlobalContext } from '../contexts/InstagramPageContext/GlobalState';
import { InstagramPageReducer, InitialState } from '../contexts/InstagramPageContext/InstagramPageReducer';

const InstagramPageContextProvider = ({ children }): ReactElement => {
	const [global, dispatch] = useReducer(InstagramPageReducer, InitialState);
	return (
		<DispatchInstagramPageContext.Provider value={{ dispatch }}>
			<InstagramPageGlobalContext.Provider value={global}>{children}</InstagramPageGlobalContext.Provider>
		</DispatchInstagramPageContext.Provider>
	);
};

export default InstagramPageContextProvider;
