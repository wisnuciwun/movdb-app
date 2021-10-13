import * as actionTypes from './actionTypes';

export const getMoviesData = (data) => {
    return{
        type: actionTypes.MOVIES_DATA,
        data: data,
    }
}

export const searchMovieKeyword = (data) => {
    return{
        type: actionTypes.SEARCH_MOVIE_KEYWORD,
        data: data,
    }
}