import { createContext, Dispatch as ReactDispatch } from 'react';

import { InitialState, IInstagramActionInterface } from './InstagramPageReducer';

export const InstagramPageGlobalContext = createContext(InitialState);

export const DispatchInstagramPageContext = createContext<{ dispatch: ReactDispatch<IInstagramActionInterface> }>({
	dispatch: () => undefined,
});
