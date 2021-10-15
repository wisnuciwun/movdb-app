import * as actionTypes from './actionTypes';

const init = {
    movies: [],
    keyword: 'Batman',
    year: ''
}

const rootReducer = (state =  init, action ) => {
    switch (action.type) {
        case actionTypes.MOVIES_DATA:
            return {
                ...state,
                movies: action.data
            }

        case actionTypes.SEARCH_MOVIE_KEYWORD:
            return {
                ...state,
                keyword: action.data
            }
        
        case actionTypes.SEARCH_MOVIE_YEAR:
            return {
                ...state,
                year: action.data
            }
    
        default:
            return state;
    }
}

export default rootReducer