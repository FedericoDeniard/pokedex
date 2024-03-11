import { useEffect, useState } from "react";
import "./pokedex.css";

const Pokedex = ({ pokedex, loading, error }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(1);
  const [pokemonImage, setPokemonImage] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(null);
  const [navKey, setNavKey] = useState("");

  useEffect(() => {
    const detectKeyDown = (e) => {
      e.preventDefault();
      if (e.key === "ArrowUp") {
        setNavKey(e.key);
      } else if (e.key === "ArrowDown") {
        setNavKey(e.key);
      }
    };
    document.addEventListener("keydown", detectKeyDown, true);
    return () => {
      document.removeEventListener("keydown", detectKeyDown, true);
    };
  }, []);

  useEffect(() => {
    if (navKey === "ArrowDown") {
      setSelectedPokemon(selectedPokemon + 1);
      setNavKey("");
    } else if (navKey === "ArrowUp") {
      setSelectedPokemon(selectedPokemon - 1);
      setNavKey("");
    }
  }, [navKey]);

  useEffect(() => {
    const getSelectedPokemon = pokedex?.[selectedPokemon - 1];
    console.log(getSelectedPokemon);
    const getPokemonImage = () => {
      setImageLoading(true);
      fetch(
        `https://pokeapi.co/api/v2/pokemon/${getSelectedPokemon?.pokemon_species.name}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setPokemonImage(data.sprites.front_default);
        })
        .catch((error) => setImageError(error.toString()))
        .finally(() => setImageLoading(false));
    };
    getPokemonImage();
  }, [selectedPokemon, pokedex]);

  return (
    <div className="pokedex">
      <h1 className="pokedex-title">Pokedex</h1>
      <div className="pokedex-container">
        <div className="pokedex-container__pokemon">
          <div className="image">
            {" "}
            {imageLoading && <p className=" loading"></p>}
            {pokemonImage && !imageLoading && <img src={pokemonImage}></img>}
            {imageError && <p className="image error">{error}</p>}
          </div>

          <div className="pokedex-menu">
            <button> Menú</button>
            <button>Buscar</button>
          </div>
        </div>
        <ul className="pokedex-container__array">
          {loading && <li>loading...</li>}
          {pokedex?.map((pokemon) => {
            return (
              <li
                className={`pokemon ${
                  selectedPokemon === pokemon.entry_number ? "highlight" : ""
                }`}
                key={pokemon.entry_number}
              >
                {pokemon.pokemon_species.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Pokedex;
