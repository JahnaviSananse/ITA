import {
    REPORT_REQUEST,
    REPORT_SUCCESS,
    REPORT_FAILURE,
    COMMENT_UPDATED_SUCCESS,
    SET_POST_ID,
    COMMENT_REQUEST,
    COMMENT_SUCCESS,
    COMMENT_FAILURE,
    REPORT_SUCCESS_PULL,
    REPORT_REQUEST_PULL,
    REPORT_FAILURE_PULL,
    SET_REDIRECTION,
    IS_REPORT_SCREEN

} from './actionTypes'
import { Alert } from 'react-native';
import * as API from '../../constants/api'
import { serverCall } from '../mainAction'

export const setPostId = (post_id) => (dispatch) => {
    returnToDispatch(dispatch, SET_POST_ID, post_id);
}
export const setRedirection = (isRedirected) => (dispatch) => {
    returnToDispatch(dispatch, SET_REDIRECTION, isRedirected);
}
export const setReportScreen = (isReport) => (dispatch) => {
    returnToDispatch(dispatch, IS_REPORT_SCREEN, isReport);
}
export const getReportList = (request) => (dispatch) => {
    returnToDispatch(dispatch, REPORT_REQUEST)
    const url = API.API_GET_ALL_REPORT
    serverCall({ url: url, request: request, method: 'post' }).then((response) => {
        returnToDispatch(dispatch, REPORT_SUCCESS, response.data.data)
    }).catch((error) => {
        returnToDispatch(dispatch, REPORT_FAILURE)
        setTimeout(() => {
            showAlert(error)
        }, 100);
    })
}
export const getReportListPullToRefersh = (request) => (dispatch) => {
    const url = API.API_GET_ALL_REPORT
    returnToDispatch(dispatch, REPORT_REQUEST_PULL)
    serverCall({ url: url, request: request, method: 'post' }).then((response) => {
        returnToDispatch(dispatch, REPORT_SUCCESS_PULL, response.data.data)
    }).catch((error) => {
        returnToDispatch(dispatch, REPORT_FAILURE_PULL)
        setTimeout(() => {
            showAlert(error)
        }, 100);
    })
}
export const getAllComment = (request) => (dispatch) => {
    returnToDispatch(dispatch, COMMENT_REQUEST)
    const url = API.API_GET_ALL_COMMENT
    serverCall({ url: url, request: request, method: 'post' }).then((response) => {
        //Convert to GiftedChated
        let data = {}
        let messages = [];
        response.data.data.posts.map((value, index) => {
            let object = {}
            object._id = value.comment_id ? value.comment_id : Math.round(Math.random() * 1000000),
                object.text = value.comment_text
            object.image = value.comment_image
            object.createdAt = value.date
            let user = {}
            user._id = value.author_id
            user.name = value.author_name
            object.user = user
            object.system = value.is_system_generated ? true : false
            messages.push(object)
        })
        data.posts = messages
        data.post_id = response.data.data.post_id
        returnToDispatch(dispatch, COMMENT_SUCCESS, data)
    }).catch((error) => {
        returnToDispatch(dispatch, COMMENT_FAILURE)
        setTimeout(() => {
            //showAlert(error)
        }, 100);
    })
}

export const getUpdatedComment = (request) => (dispatch) => {
    returnToDispatch(dispatch, COMMENT_REQUEST)
    const url = API.API_GET_ALL_COMMENT
    serverCall({ url: url, request: request, method: 'post' }).then((response) => {
        //Convert to GiftedChated
        let data = {}
        let messages = [];
        response.data.data.posts.map((value, index) => {
            let object = {}
            object._id = value.comment_id ? value.comment_id : Math.round(Math.random() * 1000000),
                object.text = value.comment_text
            object.image = value.comment_image
            object.createdAt = value.date
            let user = {}
            user._id = value.author_id
            user.name = value.author_name
            object.user = user
            object.system = value.is_system_generated ? true : false
            messages.push(object)
        })
        data.posts = messages
        data.post_id = response.data.data.post_id
        if (messages.length === 0) {
            // 
            returnToDispatch(dispatch, COMMENT_FAILURE)
            setTimeout(() => {
                showAlert(response.data.message)
            }, 100);
        } else {
            returnToDispatch(dispatch, COMMENT_UPDATED_SUCCESS, data)
        }

    }).catch((error) => {
        returnToDispatch(dispatch, COMMENT_FAILURE)

    })
}
export const sendMessage = (request) => (dispatch) => {
    const url = API.API_GENERATE_A_REPORT
    returnToDispatch(dispatch, COMMENT_REQUEST)
    serverCall({ url: url, request: request, method: 'post' }).then((response) => {
        let data = {}
        let messages = [];
        response.data.data.post.map((value, index) => {
            let object = {}
            object._id = value.comment_id ? value.comment_id : Math.round(Math.random() * 1000000),
                object.text = value.comment_text
            object.image = value.comment_image
            object.createdAt = value.date
            let user = {}
            user._id = value.author_id
            user.name = value.author_name
            object.user = user
            object.system = value.is_system_generated ? true : false
            messages.push(object)
        })
        data.posts = messages
        data.post_id = response.data.data.post_id
        returnToDispatch(dispatch, COMMENT_SUCCESS, data)
    }).catch((error) => {
        returnToDispatch(dispatch, COMMENT_FAILURE)
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