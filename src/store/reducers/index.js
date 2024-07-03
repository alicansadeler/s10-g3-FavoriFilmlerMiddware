import { movies } from "../../data";
import { ADD_MOVIE } from "../actions";
import { SIRA_CHANGE_AZALT } from "../actions";
import { SIRA_CHANGE } from "../actions";
import { REMOVE_FAV } from "../actions";
import { REMOVE_MOVIE } from "../actions";
import { ADD_FAV } from "../actions";

const initialState = {
  movies: movies,
  favoriteMovie: [],
  sira: 0,
};

export const reducerFn = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAV:
      const updatedMovies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
      return {
        ...state,
        favoriteMovie: [...state.favoriteMovie, action.payload],
        movies: updatedMovies,
        sira: Math.min(state.sira, updatedMovies.length - 1),
      };

    case REMOVE_MOVIE:
      const newMovies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
      return {
        ...state,
        movies: newMovies,
        sira: Math.min(state.sira, newMovies.length - 1),
      };
    case REMOVE_FAV:
      const removedMovie = state.favoriteMovie.find(
        (movie) => movie.id === action.payload
      );
      return {
        ...state,
        favoriteMovie: state.favoriteMovie.filter(
          (movie) => movie.id !== action.payload
        ),
        movies: [...state.movies, removedMovie],
        sira: state.movies.length,
      };
    case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case SIRA_CHANGE_AZALT:
      return {
        ...state,
        sira: state.sira - 1,
      };
    case SIRA_CHANGE:
      return {
        ...state,
        sira: state.sira + 1,
      };

    default:
      return state;
  }
};
