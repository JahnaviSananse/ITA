import {
    DISCOVER_LIST_REQUEST,
    DISCOVER_LIST_SUCCESS,
    DISCOVER_LIST_FAILURE,
    DISCOVER_LIST_LOADMORE,
    DISCOVER_DETAIL_REQUEST,
    DISCOVER_DETAIL_SUCCESS,
    DISCOVER_DETAIL_FAILURE,
    DISCOVER_PULL_REQUEST,
    DISCOVER_LIST_CLEAR,

    DISCOVER_PULL_SUCCESS,
    DISCOVER_PULL_FAILURE,
    VOTE_REQUEST,
    VOTE_SUCCESS,
    VOTE_FAILURE,
    SET_DISCOVER_POST_ID


} from './actionTypes'

const intialState = {
    loadingPull: false,
    loading: false,
    isSuccess: false,
    isLoadMore: true,
    discoverListData: [],
    descoverDetail: [],
    dicover_post_id: '',
    pollAnswers: []
}

export default (state = intialState, action) => {
    switch (action.type) {
        case SET_DISCOVER_POST_ID:
            return {
                ...state,
                dicover_post_id: action.payload
            };
        case DISCOVER_PULL_REQUEST:
            return {
                ...state,
                loadingPull: true,
            };
        case DISCOVER_LIST_CLEAR:
            return {
                ...state,
                discoverListData: [],
            };
        case DISCOVER_PULL_SUCCESS:
            let loadMoreFlagPull = false
            if (action.payload.total_pages <= action.payload.current_page) {
                loadMoreFlagPull = true
            }
            return {
                ...state,
                loadingPull: false,
                isLoadMore: loadMoreFlagPull,
                discoverListData: action.payload
            };
        case DISCOVER_PULL_FAILURE:
            return {
                ...state,
                loadingPull: false,
            };
        case DISCOVER_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                //discoverListData: []
            };

        case DISCOVER_LIST_SUCCESS:
            let loadMoreFlag = false
            if (action.payload.total_pages <= action.payload.current_page) {
                loadMoreFlag = true
            }
            return {
                ...state,
                loading: false,
                isSuccess: true,
                isLoadMore: loadMoreFlag,
                discoverListData: action.payload
            };
        case DISCOVER_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                isSuccess: false,
                discoverListData: []
            };

        case DISCOVER_LIST_LOADMORE:
            let loadedData = []
            loadedData = state.discoverListData.posts.concat(action.payload.posts)
            if (action.payload.total_pages >= action.payload.current_page) {
                loadMoreFlag = false
            }
            return {
                ...state,
                loading: false,
                isSuccess: true,
                isLoadMore: loadMoreFlag,
                discoverListData: {
                    ...state.discoverListData,
                    posts: loadedData
                }
            };


        case DISCOVER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                descoverDetail: []
            };

        case DISCOVER_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                // isLoadMore: loadMoreFlag,
                descoverDetail: action.payload
            };
        case DISCOVER_DETAIL_FAILURE:
            return {
                ...state,
                loading: false,
                isSuccess: false,
                descoverDetail: []
            };
        case VOTE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case VOTE_SUCCESS:
            let updateVote = JSON.parse(JSON.stringify(state.discoverListData.posts))
            let post_id = action.payload.post_id
            updateVote.map((value, index) => {
                if (value.post_id === post_id) {
                    // value.users_answer = action.payload.users_answer
                    value.answers = action.payload.answers
                    value.users_answer = action.payload.answers
                }
            })
            return {
                ...state,
                loading: false,
                discoverListData: {
                    ...state.discoverListData,
                    posts: updateVote
                }
            };
        case VOTE_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state
    }
}