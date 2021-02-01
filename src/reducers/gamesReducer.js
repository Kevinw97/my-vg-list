import * as Actions from '../constants/actions'

const initialState = {
    isLoaded: false,
    isLoading: false,
    data: {}
}

export const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_GAMES_BEGIN:
            return {
                ...state,
                isLoaded: false,
                isLoading: true
            };
        case Actions.GET_GAMES_SUCCESS:
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                data: action.payload
            };
        case Actions.GET_GAMES_ERROR:
            return state;
        default:
            return state;
    }
}

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_GAME_BEGIN:
            return {
                ...state,
                isLoaded: false,
                isLoading: true
            };
        case Actions.GET_GAME_SUCCESS:
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                data: action.payload
            };
        case Actions.GET_GAME_ERROR:
            return state;
        default:
            return state;
    }
}