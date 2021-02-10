import {
	RECENT_REQUEST,
	RECENT_SUCCESS,
	RECENT_FAILURE,
	FAV_REQUEST,
	FAV_SUCCESS,
	FAV_FAILURE,
	RECENT_FAV_CLEAR,
	RECENT_PULL_TO_REFRESH_REQUEST
} from './actionTypes';

const intialState = {
	loading: false,
	isSuccess: false,
	recentList: [],
	favoriteList: [],
	pullToRefresh: true
};

export default (state = intialState, action) => {
	switch (action.type) {
		case RECENT_FAV_CLEAR:
			return {
				...state,
				loading: false,
				isSuccess: false,
				recentList: [],
				favoriteList: []
			};
		case RECENT_REQUEST:
			return {
				...state,
				loading: true,
				recentList: []
			};
		case RECENT_PULL_TO_REFRESH_REQUEST:
			return {
				...state,
				pullToRefresh: true
			};
		case RECENT_SUCCESS:
			let loadedData = [];
			loadedData = action.payload;
			return {
				...state,
				loading: false,
				pullToRefresh: false,
				isSuccess: true,
				recentList: loadedData
			};
		case RECENT_FAILURE:
			return {
				...state,
				loading: false,
				pullToRefresh: false,
				isSuccess: false,
				recentList: []
			};
		case FAV_REQUEST:
			return {
				...state,
				loading: true,
				pullToRefresh: false,
				favoriteList: []
			};
		case FAV_SUCCESS:
			let loadedData1 = [];
			if (action.payload.favorite_posts) {
				loadedData1 = action.payload.favorite_posts;
			}
			return {
				...state,
				pullToRefresh: false,
				loading: false,
				isSuccess: true,
				favoriteList: loadedData1
			};
		case FAV_FAILURE:
			return {
				...state,
				pullToRefresh: false,
				loading: false,
				isSuccess: false,
				favoriteList: []
			};
		default:
			return state;
	}
};
