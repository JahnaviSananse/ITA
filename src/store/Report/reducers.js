import {
    REPORT_REQUEST,
    REPORT_SUCCESS,
    REPORT_FAILURE,
    REPORT_SUCCESS_PULL,
    REPORT_REQUEST_PULL,
    REPORT_FAILURE_PULL,
    SET_POST_ID,
    COMMENT_REQUEST,
    COMMENT_SUCCESS,
    COMMENT_FAILURE,
    COMMENT_UPDATED_SUCCESS,
    SET_REDIRECTION,
    IS_REPORT_SCREEN
} from './actionTypes'

const intialState = {
    post_id: '',
    loadingPull: false,
    loading: false,
    loadingComment: false,
    isSuccess: false,
    reportList: [],
    commentList: [],
    isRedirected: false,
    isReportScreen: false,
}

export default (state = intialState, action) => {
    switch (action.type) {
        case IS_REPORT_SCREEN:
            return {
                ...state,
                isReportScreen: action.payload,
            };

        case SET_REDIRECTION:
            return {
                ...state,
                //post_id: action.payload,
                isRedirected: action.payload,
                //commentList: [],
            };
        case SET_POST_ID:
            return {
                ...state,
                post_id: action.payload,
                commentList: [],
            };

        case REPORT_REQUEST:
            return {
                ...state,
                loading: true,
                reportList: []
            };
        case REPORT_SUCCESS:
            let loadedData1 = []
            if (action.payload.posts) {
                loadedData1 = state.reportList.concat(action.payload.posts)
            }
            return {
                ...state,
                loading: false,
                isSuccess: true,
                reportList: loadedData1,
            };
        case REPORT_REQUEST_PULL:
            return {
                ...state,
                loadingPull: true
            };
        case REPORT_SUCCESS_PULL:
            let loadedDataPull = []
            if (action.payload.posts) {
                loadedDataPull = action.payload.posts
            }
            return {
                ...state,
                loadingPull: false,
                reportList: loadedDataPull,
            };
        case REPORT_FAILURE_PULL:
            return {
                ...state,
                loadingPull: false
            };
        case REPORT_FAILURE:
            return {
                ...state,
                loading: false,
                isSuccess: false,
                reportList: []
            };
        case COMMENT_REQUEST:
            return {
                ...state,
                loadingComment: true,
                //commentList: []
            };
        case COMMENT_SUCCESS:
            let loadCommentUpdate = []
            if (state.commentList) {
                loadCommentUpdate = action.payload.posts.concat(state.commentList)
            } else {
                loadCommentUpdate = action.payload.posts.reverse()
            }
            return {
                ...state,
                loadingComment: false,
                isSuccess: true,
                commentList: loadCommentUpdate,
                post_id: action.payload.post_id,
            };
        case COMMENT_UPDATED_SUCCESS:
            let loadComment = []
            if (state.commentList) {
                loadComment = action.payload.posts.concat(state.commentList)
            } else {
                loadComment = action.payload.posts.reverse()
            }
            return {
                ...state,
                loadingComment: false,
                commentList: loadComment,
            };
        case COMMENT_FAILURE:
            return {
                ...state,
                loadingComment: false,
                isSuccess: false,
            };
        default:
            return state
    }
}