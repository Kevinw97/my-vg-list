import * as Actions from '../constants/actions';

const initialState = {
    error: null,
    dirtyGames: {}
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
        case Actions.UPDATE_GAMES_BEGIN:
            return state;
        case Actions.UPDATE_GAMES_SUCCESS:
            return {
                ...state,
                dirtyGames: {}
            };
        case Actions.UPDATE_GAMES_ERROR:
            return {
                error: action.error.message
            };
        case Actions.DELETE_GAME_BEGIN:
            return state;
        case Actions.DELETE_GAME_SUCCESS:
            const nextState = {...state};
            delete nextState.dirtyGames[action.payload];
            return nextState;
        case Actions.DELETE_GAME_ERROR:
            return {
                ...state,
                error: action.error.message
            };
        case Actions.ADD_DIRTY_GAME:
            return {
                ...state,
                dirtyGames: {
                    ...state.dirtyGames,
                    [action.payload.id]: {
                        ...state.dirtyGames[action.payload.id],
                        ...action.payload.changes
                    }
                }
            }
        case Actions.CLEAR_DIRTY_GAMES: {
            return {
                ...state,
                dirtyGames: {}
            }
        }
        default:
            return state;
    }
}
