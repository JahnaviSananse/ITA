import {
    LIBRARY_PULL_REQUEST,
    LIBRARY_PULL_SUCCESS,
    LIBRARY_PULL_FAILURE,
    FAVORITE_LIST_SUCCESS,
    LIBRARY_DATA_REQUEST,
    LIBRARY_DATA_SUCCESS,
    LIBRARY_CLEAR,
    LIBRARY_DATA_FAILURE,
    CATEGORY_DATA_REQUEST,
    CATEGORY_DATA_SUCCESS,
    CATEGORY_DATA_FAILURE,
    LIBRARY_SEARCH_REQUEST,
    LIBRARY_SEARCH_SUCCESS,
    LIBRARY_SEARCH_FAILURE,
    FAVORITE_REQUEST,
    FAVORITE_SUCCESS,
    FAVORITE_FAILURE,
    VIDEOS_REQUEST,
    VIDEOS_FAILURE,
    SET_LIBRARY_POST_ID
} from './actionTypes'

const intialState = {
    loadingPull: false,
    loading: false,
    isSuccess: false,
    libraryData: [],
    categoryData: [],
    favorites: [],
    librarySearchData: [],
    library_post_id: '',
}

export default (state = intialState, action) => {
    switch (action.type) {
        case SET_LIBRARY_POST_ID:
            return {
                ...state,
                library_post_id: action.payload
            };
        case LIBRARY_PULL_REQUEST:
            return {
                ...state,
                loadingPull: true,
            };
        case LIBRARY_PULL_SUCCESS:
            return {
                ...state,
                loadingPull: false,
                libraryData: action.payload
            };
        case LIBRARY_PULL_FAILURE:
            return {
                ...state,
                loadingPull: false,
            };

        case LIBRARY_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                libraryData: [],
                favorites: [],
            };
        case LIBRARY_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                libraryData: action.payload
            };
        case LIBRARY_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                isSuccess: false,
                libraryData: []
            };
        case LIBRARY_SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
                librarySearchData: []
            };
        case LIBRARY_CLEAR:
            return {
                ...state,
                librarySearchData: []
            };
        case LIBRARY_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                librarySearchData: action.payload.posts,
                favorites: JSON.parse(JSON.stringify(action.payload.favorites)),
            };
        case LIBRARY_SEARCH_FAILURE:
            return {
                ...state,
                loading: false,
                isSuccess: false,
                librarySearchData: []
            };
        case FAVORITE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case FAVORITE_SUCCESS:
            return {
                ...state,
                loading: false,
                isSuccess: true,
                favorites: JSON.parse(JSON.stringify(action.payload.favorites)),
            };
        case FAVORITE_LIST_SUCCESS:
            return {
                ...state,
                favorites: JSON.parse(JSON.stringify(action.payload.favorites)),
            };
        case FAVORITE_FAILURE:
            return {
                ...state,
                loading: false,
                isSuccess: false,
            };

        default:
            return state
    }
}