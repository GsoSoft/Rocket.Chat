export interface IInstagramStateInterface {
	id: string;
	caption: string;
	numberOfResults: number;
}

export interface IInstagramActionInterface {
	type: string;
	payload?: {
		id?: string;
		caption?: string;
		numberOfResults?: number;
	};
}

const InitialState: IInstagramStateInterface = {
	id: '',
	caption: '',
	numberOfResults: 10,
};

const InstagramPageReducer = (state, action): IInstagramStateInterface => {
	switch (action.type) {
		case 'ADD_DETAILS':
			return {
				...state,
				id: action.payload.id,
				caption: action.payload.caption,
			};
		case 'LOAD_MORE':
			return {
				...state,
				numberOfResults: action.payload.numberOfResults,
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
