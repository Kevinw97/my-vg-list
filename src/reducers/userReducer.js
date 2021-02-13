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
        default:
            return state;
    }
}
