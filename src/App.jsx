import { useState, useEffect } from "react";
import Pokedex from "./assets/pokedex/pokedex";
import "./App.css";
import { useFetch } from "./assets/pokedex/useFetch";

function App() {
  const { apiStatus, pokemonArray, loading, error } = useFetch(
    "https://pokeapi.co/api/v2/pokedex/hoenn"
  );
  return (
    <>
      <div className="container">
        {error && <p>Error {error}</p>}
        <Pokedex pokedex={pokemonArray} loading={loading} error={error} />
      </div>
    </>
  );
}

export default App;
