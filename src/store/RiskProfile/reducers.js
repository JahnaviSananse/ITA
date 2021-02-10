import {
    RISK_PROFILE_QUESTION_REQUEST,
    RISK_PROFILE_QUESTION_SUCCESS,
    RISK_PROFILE_QUESTION_FAILURE,
    RISK_PROFILE_DETAILS_REQUEST,
    RISK_PROFILE_DETAILS_SUCCESS,
    RISK_PROFILE_DETAILS_FAILURE,
    RISK_PROFILE_RESOURCE_ID

} from './actionTypes'

const intialState = {
    loading: false,
    riskProfileQuestionList: [],
    riskProfileDetail: null,
    resourceId: 0

}
export default (state = intialState, action) => {
    switch (action.type) {

        case RISK_PROFILE_QUESTION_REQUEST:
            return {
                ...state,
                loading: true,
                riskProfileQuestionList: []
            };
        case RISK_PROFILE_RESOURCE_ID:
            return {
                ...state,
                loading: false,
                resourceId: action.payload,
                //riskProfileQuestionList: action.payload
            };

        case RISK_PROFILE_QUESTION_SUCCESS:
            return {
                ...state,
                loading: false,
                riskProfileQuestionList: action.payload
            };


        case RISK_PROFILE_QUESTION_FAILURE:
            return {
                ...state,
                loading: false,
                riskProfileQuestionList: []
            };
        case RISK_PROFILE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                riskProfileDetail: null
            };

        case RISK_PROFILE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                riskProfileDetail: action.payload
            };
        case RISK_PROFILE_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                riskProfileDetail: null
            };

        default:
            return state
    }
}