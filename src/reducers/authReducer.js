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
                ... state,
                error: null
            };
        case Actions.LOGIN_ERROR:
            return {
                ...state,
                error: "Could not login"
            };
        case Actions.SIGNOUT_BEGIN:
            return state;
        case Actions.SIGNOUT_SUCCESS:
            return state;
        case Actions.SIGNOUT_ERROR:
            return state;
        default:
            return state;
    }
}
