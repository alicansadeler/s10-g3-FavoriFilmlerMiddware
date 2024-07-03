import { useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Movie from "./components/Movie.jsx";
import FavMovie from "./components/FavMovie.jsx";
import { useDispatch, useSelector } from "react-redux";

import { siraChange } from "./store/actions/index.js";
import { siraChangeAzalt } from "./store/actions/index.js";
import { addFavoriteMovie } from "./store/actions/index.js";
import { removeMovie } from "./store/actions/index.js";

function App() {
  const sira = useSelector((store) => store.sira);
  const movies = useSelector((store) => store.movies);
  const favMovies = useSelector((store) => store.favoriteMovie);
  const movie = movies[sira];

  const dispatch = useDispatch();

  const addFavMovie = () => {
    dispatch(addFavoriteMovie(movie));
    dispatch(removeMovie(movie.id));
  };

  function sonrakiFilm() {
    dispatch(siraChange());
  }

  function öncekiFilm() {
    dispatch(siraChangeAzalt());
  }

  return (
    <div className="wrapper max-w-2xl mx-auto">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6"
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Filmler
        </NavLink>
        <NavLink
          to="/listem"
          className="py-3 px-6"
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Listem
        </NavLink>
      </nav>
      <Switch>
        <Route exact path="/">
          {movies.length > 0 ? (
            <>
              <Movie sira={sira} />
              <div className="flex gap-3 justify-end py-3">
                {sira !== 0 && (
                  <button
                    onClick={öncekiFilm}
                    className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
                  >
                    Önceki
                  </button>
                )}
                {sira !== movies.length - 1 && (
                  <button
                    onClick={sonrakiFilm}
                    className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
                  >
                    Sıradaki
                  </button>
                )}
                <button
                  className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
                  onClick={addFavMovie}
                >
                  Listeme ekle
                </button>
              </div>
            </>
          ) : (
            <p>Eklenecek yeni film bulunamadı...</p>
          )}
        </Route>

        <Route path="/listem">
          {favMovies.length > 0 ? (
            favMovies.map((movie, index) => (
              <FavMovie
                key={index}
                title={movie.title}
                id={movie.id}
                movie={movie}
              />
            ))
          ) : (
            <p>Favori film listeniz boş.</p>
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
