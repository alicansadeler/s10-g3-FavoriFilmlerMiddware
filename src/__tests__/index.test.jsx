import React from "react";

import { beforeEach, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import App from "../App";
import { myStore } from "../store/store.js";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import fs from "fs";
import path from "path";

const appComponent = fs
  .readFileSync(path.resolve(__dirname, "../App.jsx"), "utf8")
  .replaceAll(/(?:\r\n|\r|\n| )/g, "");

const movieComponent = fs
  .readFileSync(path.resolve(__dirname, "../components/Movie.jsx"), "utf8")
  .replaceAll(/(?:\r\n|\r|\n| )/g, "");

const favMovieComponent = fs
  .readFileSync(path.resolve(__dirname, "../components/FavMovie.jsx"), "utf8")
  .replaceAll(/(?:\r\n|\r|\n| )/g, "");

const isStoreFileExists = fs.existsSync(
  path.resolve(__dirname, "../store/store.js"),
  "utf8"
);

const storeFile = isStoreFileExists
  ? fs
      .readFileSync(path.resolve(__dirname, "../store/store.js"), "utf8")
      .replaceAll(/(?:\r\n|\r|\n| )/g, "")
  : "";

beforeEach(() => {
  render(
    <Provider store={myStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});

test("store/actions/index.js dosyası oluşturulmuş", () => {
  const isActionsFileExists = fs.existsSync(
    path.resolve(__dirname, "../store/actions/index.js"),
    "utf8"
  );
  expect(isActionsFileExists).toBe(true);
});

test("store/reducers/index.js dosyası oluşturulmuş", () => {
  const isReducersFileExists = fs.existsSync(
    path.resolve(__dirname, "../store/reducers/index.js"),
    "utf8"
  );
  expect(isReducersFileExists).toBe(true);
});

test("store/store.js dosyası oluşturulmuş", () => {
  expect(isStoreFileExists).toBe(true);
});

test("App.jsxde sira, useSelector hooku ile storedan alınıyor", () => {
  expect(appComponent).toContain("sira=useSelector(");
});

test("App.jsxde favMovies, useSelector hooku ile storedan alınıyor", () => {
  expect(appComponent).toContain("favMovies=useSelector(");
});

test("Movie.jsxde movies useSelector hooku ile storedan alınıyor", () => {
  expect(movieComponent).toContain("movies=useSelector(");
});

test("App.jsxde useDispatch hooku kullanılmış", () => {
  expect(appComponent).toContain("=useDispatch(");
});

test("FavMovie.jsxde useDispatch hooku kullanılmış", () => {
  expect(favMovieComponent).toContain("=useDispatch(");
});

test("store.js dosyasında redux-logger kullanılmış", () => {
  expect(storeFile).toContain("redux-logger");
});

test("Sıradaki butonu bir sonraki filmi gösteriyor", async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText("Sıradaki"));
  await screen.findByText("Black Swan");
});

test("Önceki butonu eklenmiş", async () => {
  await screen.findByText("Önceki");
});

test("Önceki butonu bir önceki filmi açıyor", async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText("Önceki"));
  await screen.findByText("Memento");
});

test("İlk film gösterilirken Önceki butonu gözükmüyor", async () => {
  expect(screen.queryByText("Önceki")).not.toBeInTheDocument();
});

test("son film gösterilirken Sıradaki butonu gözükmüyor", async () => {
  const user = userEvent.setup();
  for (let i = 1; i < 20; i++) {
    await user.click(screen.getByText("Sıradaki"));
  }
  await screen.findByText("The Martian");
  expect(screen.queryByText("Sıradaki")).not.toBeInTheDocument();
});

test("Listeme ekle eklenen filmi filmlerim listesinden kaldırıyor", async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText("Listeme ekle"));
  await screen.findByText("Hotel Rwanda");
});

test("Listeme ekle eklenen filmi listeme ekliyor", async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText("Listem"));
  await screen.findByText("The Martian");
});

test("Listem sayfasında çıkar butonu filmi favori listesinden çıkarıyor", async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText("Listem"));
  await screen.findByText("The Martian");
  await user.click(screen.getByText("Çıkar"));
  expect(screen.queryByText("The Martian")).not.toBeInTheDocument();
});

test("App.jsxde movies, film kalmadığında ekranda Gösterilecek film kalmadı mesajını render edebilmek için useSelector hooku ile storedan alınıyor", () => {
  expect(appComponent).toContain("movies=useSelector(");
});

test("Tüm filmler Favori listesine eklenince Eklenecek film bulunamadı mesajı ekranda görünüyor", async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText("Filmler"));
  for (let i = 1; i <= 20; i++) {
    await user.click(screen.getByText("Listeme ekle"));
  }
  expect(
    screen.queryByText("Eklenecek yeni film bulunamadı...")
  ).toBeInTheDocument();
});

test("Favori listesinden çıkan film, film listesine tekrar ekleniyor", async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText("Listem"));
  for (let i = 0; i < 20; i++) {
    await user.click(screen.getAllByText("Çıkar")[i]);
  }
  await user.click(screen.getByText("Filmler"));
  expect(
    screen.queryByText("Eklenecek yeni film bulunamadı...")
  ).not.toBeInTheDocument();
});
