import * as Actions from "../constants/actions";
import * as RAWG from "../constants/rawg"
import axios from "axios";

export const getGames = (options = {
    params: {
        search: ""
    },
    url: ""
}) => (dispatch, getState) => {

    const Url = options.url || new URL("api/games", RAWG.BASE_URL);
    if (!options.url) {
        Url.searchParams.append("key", process.env.REACT_APP_RAWG_API_KEY);
        if (options.params) {
            Url.searchParams.append("search", options.params.search);
        }
    }

    dispatch({type: Actions.GET_GAMES_BEGIN});

    axios.get(Url.toString())
        .then((response) => {
                dispatch({
                    type: Actions.GET_GAMES_SUCCESS,
                    payload: response.data});
            },
            (error) => {
                dispatch({
                    type: Actions.GET_GAMES_ERROR
                });
            });
};
