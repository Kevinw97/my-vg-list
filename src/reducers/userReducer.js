import * as Actions from '../constants/actions';

const initialState = {
    error: null
};

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case Actions.ADD_GAME_BEGIN:
            return state;
        case Actions.ADD_GAME_SUCCESS:
            return {
                ...state,
                error: null
            };
        case Actions.ADD_GAME_ERROR:
            return {
                ...state,
                error: action.error.message
            };
        default:
            return state;
    }
}
