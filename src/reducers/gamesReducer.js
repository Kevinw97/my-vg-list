import * as Actions from '../constants/actions'

const initialState = {
    isLoaded: false,
    data: {}
}

export const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_GAMES_BEGIN:
            return {
                ...state,
                isLoaded: false
            };
        case Actions.GET_GAMES_SUCCESS:
            return {
                ...state,
                isLoaded: true,
                data: action.payload
            };
        case Actions.GET_GAMES_ERROR:
            return state;
        default:
            return state;
    }
}
