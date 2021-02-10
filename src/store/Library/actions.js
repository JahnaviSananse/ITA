import {
    LIBRARY_DATA_REQUEST,
    LIBRARY_DATA_SUCCESS,
    LIBRARY_DATA_FAILURE,
    LIBRARY_SEARCH_REQUEST,
    LIBRARY_SEARCH_SUCCESS,
    LIBRARY_SEARCH_FAILURE,
    LIBRARY_PULL_REQUEST,
    LIBRARY_PULL_SUCCESS,
    LIBRARY_PULL_FAILURE,
    FAVORITE_REQUEST,
    FAVORITE_SUCCESS,
    FAVORITE_LIST_SUCCESS,
    FAVORITE_FAILURE,
    LIBRARY_CLEAR,
    SET_LIBRARY_POST_ID

} from './actionTypes'
import { Alert } from 'react-native';
import * as API from '../../constants/api'
import { serverCall } from '../mainAction'


export const clearData = () => (dispatch) => {
    returnToDispatch(dispatch, LIBRARY_CLEAR)
}

export const setLibraryPostId = (post_id) => (dispatch) => {
    returnToDispatch(dispatch, SET_LIBRARY_POST_ID, post_id);
}

export const getLibraryData = (request) => (dispatch) => {
    returnToDispatch(dispatch, LIBRARY_DATA_REQUEST)
    const url = API.API_LIBRARY_DATA
    serverCall({ url: url, request: request, method: 'post' }).then((response) => {
        returnToDispatch(dispatch, LIBRARY_DATA_SUCCESS, response.data.data)
    }).catch((error) => {
        returnToDispatch(dispatch, LIBRARY_DATA_FAILURE)
        setTimeout(() => {
            showAlert(error)
        }, 100);
    })
}

export const getLibraryDataPull = (request) => (dispatch) => {
    returnToDispatch(dispatch, LIBRARY_PULL_REQUEST)
    const url = API.API_LIBRARY_DATA
    serverCall({ url: url, request: request, method: 'post' }).then((response) => {
        returnToDispatch(dispatch, LIBRARY_PULL_SUCCESS, response.data.data)
    }).catch((error) => {
        returnToDispatch(dispatch, LIBRARY_PULL_FAILURE)
        setTimeout(() => {
            showAlert(error)
        }, 100);
    })
}

export const getLibrarySearchData = (request) => (dispatch) => {
    returnToDispatch(dispatch, LIBRARY_SEARCH_REQUEST)
    const url = API.API_LIBRARY_SEARCH
    serverCall({ url: url, request: request, method: 'post' }).then((response) => {
        returnToDispatch(dispatch, LIBRARY_SEARCH_SUCCESS, response.data.data)
    }).catch((error) => {
        returnToDispatch(dispatch, LIBRARY_SEARCH_FAILURE)
        setTimeout(() => {
            // alert(error)
        }, 100);
    })
}


export const getFavoriteList = (request) => (dispatch) => {
    const url = API.API_GET_LIST_FAV
    serverCall({ url: url, request: request, method: 'post' }).then((response) => {
        returnToDispatch(dispatch, FAVORITE_LIST_SUCCESS, response.data.data)
    }).catch((error) => {
    })
}

export const addRemoveFavorite = (request) => (dispatch) => {
    console.log("request ==>", request);
    returnToDispatch(dispatch, FAVORITE_REQUEST)
    const url = API.API_ADD_REMOVE_FAVORITE
    serverCall({ url: url, request: request, method: 'post' }).then((response) => {
        console.log("FAVORITE_SUCCESS ==>", response.data.data);

        returnToDispatch(dispatch, FAVORITE_SUCCESS, response.data.data)
    }).catch((error) => {
        returnToDispatch(dispatch, FAVORITE_FAILURE)
        setTimeout(() => {
            showAlert(error)
        }, 100);
    })
}

showAlert = (msg) => {
    Alert.alert(
        "",
        msg
    )
}

returnToDispatch = (dispatch, type, payload) => {
    dispatch({
        type: type,
        payload: payload
    })
}