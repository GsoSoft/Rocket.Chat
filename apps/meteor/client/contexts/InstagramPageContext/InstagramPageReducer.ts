export interface IInstagramStateInterface {
	id: string;
	caption: string;
}

export interface IInstagramActionInterface {
	type: string;
	payload?: {
		id: string;
		caption: string;
	};
}

const InitialState: IInstagramStateInterface = {
	id: '',
	caption: '',
};

const InstagramPageReducer = (state, action): IInstagramStateInterface => {
	switch (action.type) {
		case 'ADD_DETAILS':
			return {
				...state,
				id: action.payload.id,
				caption: action.payload.caption,
			};
		case 'CLEAR_DETAILS':
			return {
				...state,
				id: '',
				caption: '',
			};
		default:
			return state;
	}
};

export { InstagramPageReducer, InitialState };
