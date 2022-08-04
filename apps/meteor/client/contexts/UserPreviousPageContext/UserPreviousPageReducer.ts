export interface IStateInterface {
	value: { location: string; clickedImage: string };
}

export interface IActionInterface {
	type: string;
	payload?: {
		location?: string;
		clickedImage?: string;
	};
}

const InitialState: IStateInterface = {
	value: { location: '', clickedImage: '' },
};

const UserPreviousPageReducer = (state, action): IStateInterface => {
	switch (action.type) {
		case 'ADD_LOCATION':
			return {
				...state,
				value: action.payload,
			};
		case 'ADD_CLICKED_IMAGE':
			return {
				...state,
				value: action.payload.clickedImage,
			};
		case 'CLEAR_LOCATION':
			return {
				...state,
				value: { location: '', clickedImage: '' },
			};
		default:
			return state;
	}
};

export { UserPreviousPageReducer, InitialState };
