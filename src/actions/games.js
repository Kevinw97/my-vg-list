import * as Actions from "../constants/actions";
import * as RAWG from "../constants/rawg"
import axios from "axios";

/*
Game fetching related action creators using the RAWG/games API
 */

export const getGames = (options = {
    params: {
        search: ""
    },
    url: ""
}) => (dispatch) => {
    return new Promise((resolve, reject) => {
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
                        payload: response.data
                    });
                    resolve(response.data);
                },
                (error) => {
                    dispatch({
                        type: Actions.GET_GAMES_ERROR
                    });
                    reject();
                });
    });
};

export const getGame = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const Url = new URL("api/games/" + id, RAWG.BASE_URL);
        Url.searchParams.append("key", process.env.REACT_APP_RAWG_API_KEY);

        dispatch({type: Actions.GET_GAME_BEGIN});

        axios.get(Url.toString())
            .then((response) => {
                    dispatch({
                        type: Actions.GET_GAME_SUCCESS,
                        payload: response.data
                    });
                    resolve(response.data);
                },
                (error) => {
                    dispatch({
                        type: Actions.GET_GAME_ERROR
                    });
                    reject();
                });
    });
}