import * as Actions from '../constants/actions';

const gamesInitialState = {
    data: {},
    isLoading: false
}

export const gamesReducer = (state = gamesInitialState, action) => {
    switch (action.type) {
        case Actions.GET_GAMES_BEGIN:
            return {
                ...state,
                isLoading: true
            };
        case Actions.GET_GAMES_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            };
        case Actions.GET_GAMES_ERROR:
            return state;
        default:
            return state;
    }
}

const gameInitialState = {
    data: {},
    isLoading: false
}

export const gameReducer = (state = gameInitialState, action) => {
    switch (action.type) {
        case Actions.GET_GAME_BEGIN:
            return {
                ...state,
                isLoading: true
            };
        case Actions.GET_GAME_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false
            };
        case Actions.GET_GAME_ERROR:
            return state;
        default:
            return state;
    }
}