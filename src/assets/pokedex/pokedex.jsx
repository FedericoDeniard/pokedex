import { useEffect, useRef, useState } from "react";
import "./pokedex.css";
import PokemonInfo from "../pokemonInfo/pokemonInfo";

const Pokedex = ({ pokedex, loading, error }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(1);
  const [pokemonImage, setPokemonImage] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(null);
  const [navKey, setNavKey] = useState("");
  const [pokemonInfoStatus, setPokemonInfoStatus] = useState(false);
  const [pokemonInfo, setPokemonInfo] = useState("");
  const [selectedPokemonName, setSelectedPokemonName] = useState("");

  const highlightRef = useRef(null);

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
    if (
      navKey === "ArrowDown" &&
      selectedPokemon < pokedex.length &&
      pokemonInfoStatus === false
    ) {
      setSelectedPokemon(selectedPokemon + 1);
      setNavKey("");
    } else if (
      navKey === "ArrowUp" &&
      selectedPokemon > 1 &&
      pokemonInfoStatus === false
    ) {
      setSelectedPokemon(selectedPokemon - 1);
      setNavKey("");
    }
  }, [navKey]);

  const handleArrow = (direction) => {
    if (direction === "up" && selectedPokemon > 1) {
      setSelectedPokemon(selectedPokemon - 1);
    } else if (direction === "down" && selectedPokemon < pokedex.length) {
      setSelectedPokemon(selectedPokemon + 1);
    }
  };

  useEffect(() => {
    const getSelectedPokemon = pokedex?.[selectedPokemon - 1];
    setPokemonInfo(getSelectedPokemon?.pokemon_species.url);
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
          setPokemonInfo(data);
        })
        .catch((error) => setImageError(error.toString()))
        .finally(() => setImageLoading(false));
    };
    getPokemonImage();
    if (highlightRef.current) {
      highlightRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedPokemon, pokedex, pokemonInfoStatus]);

  const changePokemon = (entryNumber) => {
    setSelectedPokemon(entryNumber);
  };

  const reset = () => {
    setSelectedPokemon(1);
    setPokemonInfoStatus(false);
  };

  return (
    <div className="pokedex">
      <h1 className="pokedex-title">Pokedex</h1>
      <div className="pokedex-container">
        <div className="pokedex-container__pokemon">
          <div className="image">
            {" "}
            <div className="image-loading">
              {imageLoading && <p className=" loading"></p>}
            </div>
            {pokemonImage && !imageLoading && <img src={pokemonImage}></img>}
            {imageError && <p className="image-error">{error}</p>}
          </div>

          <div className="pokedex-menu">
            <button onClick={reset}> Inicio</button>
            <button onClick={() => setPokemonInfoStatus(!pokemonInfoStatus)}>
              {!pokemonInfoStatus ? "Entrar" : "Salir"}
            </button>
          </div>
        </div>
        {pokemonInfoStatus === false ? (
          <div className="pokedex-container-list">
            <div className="pokedex-label">
              <p className="arrow up" onClick={() => handleArrow("up")}></p>
            </div>
            <ul className="pokedex-container__array">
              {loading && <li>loading...</li>}
              {pokedex?.map((pokemon) => {
                return (
                  <li
                    className={`pokemon ${
                      selectedPokemon === pokemon.entry_number
                        ? "highlight"
                        : ""
                    }`}
                    onClick={() => changePokemon(pokemon.entry_number)}
                    key={pokemon.entry_number}
                    ref={
                      selectedPokemon === pokemon.entry_number
                        ? highlightRef
                        : null
                    }
                  >
                    {`N.°${
                      pokemon.entry_number
                    } ${pokemon.pokemon_species.name.toUpperCase()}`}
                  </li>
                );
              })}
            </ul>
            <div className="pokedex-label">
              <p className="arrow down" onClick={() => handleArrow("down")}></p>
            </div>
          </div>
        ) : (
          <PokemonInfo poke={pokemonInfo} />
        )}
      </div>
    </div>
  );
};
export default Pokedex;
