import {
    VIDEO_DATA_REQUEST,
    VIDEO_DATA_SUCCESS,
    VIDEO_DATA_FAILURE,
    VIDEO_LIST_LOADMORE
} from './actionTypes'

const intialState = {
    loading: false,
    isSuccess: false,
    isLoadMore: true,
    video: [],
}

export default (state = intialState, action) => {
    switch (action.type) {
        case VIDEO_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                video: []
            };

        case VIDEO_DATA_SUCCESS:
                let loadedData1 = action.payload.posts                
                let loadMoreFlag1 = true
                if (action.payload.total_pages >= action.payload.current_page) {
                    loadMoreFlag1 = false
                }
            return {
                ...state,
                loading: false,
                isSuccess: true,
                isLoadMore: loadMoreFlag1,
                video: loadedData1,
            };
        case VIDEO_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                isSuccess: false,
                video: []
            };
        case VIDEO_LIST_LOADMORE:            
            let loadedData = state.video.concat(action.payload.posts)
            let loadMoreFlag = true
            if (action.payload.total_pages >= action.payload.current_page) {
                loadMoreFlag = false
            }
            return {
                ...state,
                loading: false,
                isSuccess: true,
                isLoadMore: loadMoreFlag,
                video: loadedData
            };
        default:
            return state
    }
}