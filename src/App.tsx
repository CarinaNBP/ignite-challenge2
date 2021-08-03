import { useEffect, useState } from "react";

import { Button } from "./components/Button";
// import { MovieCard } from "./components/MovieCard";
import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import { api } from "./services/api";

import "./styles/global.scss";

import "./styles/sidebar.scss";
import "./styles/content.scss";
import { GenreResponseProps } from "./interfaces";

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1); //id do genero
  const [genres, setGenres] = useState<GenreResponseProps[]>([]); //mandar o genero pra tela

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  ); //objeto do genero selecionado

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []); //pegando todos os generos e salvando em set genres

  useEffect(() => {
    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]); //pegando o genero através do id e salvando em setSelecteGenre

  function handleClickButton(id: number) {
    console.log({ id, selectedGenreId });

    setSelectedGenreId(id);
  }

  return (
    <>
      <SideBar
        selectedGenreId={selectedGenreId}
        handleClickButton={handleClickButton}
        genres={genres}
      />
      <Content
        selectedGenreId={selectedGenreId}
        selectedGenre={selectedGenre}
      />
    </>
  );
}
