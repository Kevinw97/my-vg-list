import * as Actions from '../constants/actions';

const initialState = {
    error: null
};

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.LOGIN_BEGIN:
            return state;
        case Actions.LOGIN_SUCCESS:
            return {
                ...state,
                error: null
            };
        case Actions.LOGIN_ERROR:
            return {
                ...state,
                error: action.error.message
            };
        case Actions.SIGNOUT_BEGIN:
            return state;
        case Actions.SIGNOUT_SUCCESS:
            return state;
        case Actions.SIGNOUT_ERROR:
            return {
                ...state,
                error: action.error.message
            };
        case Actions.SIGNUP_BEGIN:
            return state;
        case Actions.SIGNUP_SUCCESS:
            return {
                ...state,
                error: null
            };
        case Actions.SIGNUP_ERROR:
            return {
                ...state,
                error: action.error.message
            };
        default:
            return state;
    }
}
