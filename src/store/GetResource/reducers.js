import {
    GET_RESOURCES_REQUEST,
    GET_RESOURCES_SUCCESS,
    GET_RESOURCES_FAILURE
} from './actionTypes'
const intialState = {
    loading: false,
    resourceData: null
}
export default (state = intialState, action) => {
    switch (action.type) {
        case GET_RESOURCES_REQUEST:
            return {
                ...state,
                loading: true,
                resourceData: null
            };

        case GET_RESOURCES_SUCCESS:
            return {
                ...state,
                loading: false,
                resourceData: action.payload
            };
        case GET_RESOURCES_FAILURE:
            return {
                ...state,
                loading: false,
                resourceData: null
            };

        default:
            return state
    }
}