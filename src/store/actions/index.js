export const ADD_FAV = 'favorilere ekle';
export const REMOVE_FAV = 'favorilerden çıkar';

export const REMOVE_MOVIE = 'filmi sil';
export const ADD_MOVIE = 'filmi ekle';

export const SIRA_CHANGE = 'sira ekle';
export const SIRA_CHANGE_AZALT = 'sira azalt';

export const addFavoriteMovie = (movie) => {
  return { type: ADD_FAV, payload: movie };
};

export const removeFavoriteMovie = (id) => {
  return { type: REMOVE_FAV, payload: id };
};

export const removeMovie = (id) => {
  return { type: REMOVE_MOVIE, payload: id };
};

export const addMovie = (id) => {
  return { type: ADD_MOVIE, payload: id };
};

export const siraChange = () => {
  return { type: SIRA_CHANGE };
};

export const siraChangeAzalt = () => {
  return { type: SIRA_CHANGE_AZALT };
};
