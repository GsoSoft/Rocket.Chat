export interface IInstagramStateInterface {
	id: string;
	caption: string;
	numberOfResults: number;
	results: Record<string, any>[];
	extractedImages: Record<string, any>[];
	clickedPostId?: string;
}

export interface IInstagramActionInterface {
	type: string;
	payload?: {
		id?: string;
		caption?: string;
		numberOfResults?: number;
		results?: Record<string, any>[];
		extractedImages?: Record<string, any>[];
		clickedPostId?: string;
	};
}

const InitialState: IInstagramStateInterface = {
	id: '',
	caption: '',
	numberOfResults: 10,
	results: [],
	extractedImages: [],
	clickedPostId: '',
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
		case 'ADD_POSTS':
			return {
				...state,
				results: action.payload.results,
			};
		case 'ADD_EXTRACTED_IMAGES':
			return {
				...state,
				extractedImages: action.payload.extractedImages,
			};
		case 'ADD_CLICKED_POST':
			return {
				...state,
				clickedPostId: action.payload.clickedPostId,
			};
		case 'CLEAR_DETAILS':
			return {
				...state,
				id: '',
				caption: '',
				numberOfResults: 10,
				results: [],
				extractedImages: [],
			};
		default:
			return state;
	}
};

export { InstagramPageReducer, InitialState };
