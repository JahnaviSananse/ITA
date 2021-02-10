import {
	PRODUCT_DATA_REQUEST,
	PRODUCT_DATA_REQUEST_LOAD_MORE,
	PRODUCT_DATA_SUCCESS,
	PRODUCT_DATA_FAILURE,
	PRODUCT_LIST_LOADMORE,
	PRODUCT_LIST_LOADMORE_FAILURE,
	PRODUCT_DATA_PULLTOREFESH
} from './actionTypes';

const intialState = {
	pullToRefresh: true,
	loading: false,
	isSuccess: false,
	isLoadMore: true,
	product: []
};

export default (state = intialState, action) => {
	switch (action.type) {
		case PRODUCT_DATA_REQUEST:
			return {
				...state,
				loading: true,
				product: []
			};
		case PRODUCT_DATA_REQUEST_LOAD_MORE:
			return {
				...state,
				loading: true
			};
		case PRODUCT_DATA_PULLTOREFESH:
			return {
				...state,
				pullToRefresh: true
			};
		case PRODUCT_LIST_LOADMORE_FAILURE:
			return {
				...state,
				loading: false,
				isLoadMore: false
			};

		case PRODUCT_DATA_SUCCESS:
			let loadedData1 = action.payload.posts;

			let loadMoreFlag1 = false;
			if (action.payload.total_pages > action.payload.current_page) {
				loadMoreFlag1 = true;
			}

			return {
				...state,
				pullToRefresh: false,
				loading: false,
				isSuccess: true,
				isLoadMore: loadMoreFlag1,
				product: loadedData1
			};
		case PRODUCT_DATA_FAILURE:
			return {
				...state,
				pullToRefresh: false,
				loading: false,
				isSuccess: false,
				product: []
			};
		case PRODUCT_LIST_LOADMORE:
			let loadedData = state.product.concat(action.payload.posts);
			let loadMoreFlag = false;
			if (action.payload.total_pages > action.payload.current_page) {
				loadMoreFlag = true;
			}
			return {
				...state,
				pullToRefresh: false,
				loading: false,
				isSuccess: true,
				isLoadMore: loadMoreFlag,
				product: loadedData
			};
		default:
			return state;
	}
};
