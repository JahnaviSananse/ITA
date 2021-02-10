import {
    FUND_DATA_REQUEST,
    FUND_DATA_SUCCESS,
    FUND_DATA_FAILURE,
    FUND_LIST_LOADMORE
} from './actionTypes'

const intialState = {
    loading: false,
    isSuccess: false,
    isLoadMore: true,
    fund: [],
}

export default (state = intialState, action) => {
    switch (action.type) {
        case FUND_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                fund: []
            };

        case FUND_DATA_SUCCESS:
            let loadedData1 = []
            let loadMore = true
            loadedData1 = state.fund.concat(action.payload.posts)
            if (action.payload.total_pages >= action.payload.current_page) {
                loadMore = false
            }
            return {
                ...state,
                loading: false,
                isSuccess: true,
                isLoadMore: loadMore,
                fund: loadedData1,
            };
        case FUND_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                isSuccess: false,
                fund: []
            };
        case FUND_LIST_LOADMORE:
            let loadedData = state.fund.concat(action.payload.posts)
            let lMore = true
            if (action.payload.total_pages >= action.payload.current_page) {
                lMore = false
            }
            return {
                ...state,
                loading: false,
                isSuccess: true,
                isLoadMore: lMore,
                fund: loadedData
            };
        default:
            return state
    }
}