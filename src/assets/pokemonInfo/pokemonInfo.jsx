import { useEffect, useState } from "react";
import "./pokemonInfo.css";

const PokemonInfo = (poke) => {
  useEffect(() => {
    console.log(poke);
  }, []);

  const getTypeClassName = (type) => {
    switch (type) {
      case "normal":
        return "normal-type";
      case "fire":
        return "fire-type";
      case "water":
        return "water-type";
      case "electric":
        return "electric-type";
      case "grass":
        return "grass-type";
      case "ice":
        return "ice-type";
      case "fighting":
        return "fighting-type";
      case "poison":
        return "poison-type";
      case "ground":
        return "ground-type";
      case "flying":
        return "flying-type";
      case "psychic":
        return "psychic-type";
      case "bug":
        return "bug-type";
      case "rock":
        return "rock-type";
      case "ghost":
        return "ghost-type";
      case "dragon":
        return "dragon-type";
      case "dark":
        return "dark-type";
      case "steel":
        return "steel-type";
      case "fairy":
        return "fairy-type";
      default:
        return "unknown-type";
    }
  };

  return (
    <div className="pokemon-info__container">
      <p className="title">{poke?.poke.name?.toUpperCase()}</p>
      <ul className="types">
        {poke?.poke.types?.map((typeData, index) => (
          <li
            className={`${getTypeClassName(typeData.type.name)} type`}
            key={index}
          >
            {typeData.type.name.toUpperCase()}
          </li>
        ))}
      </ul>
      <ul className="stats">
        {" "}
        {poke?.poke.stats?.map((statData, index) => (
          <li className="stat" key={index}>
            {statData.stat.name}
            <p className="stat-number">{statData.base_stat}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonInfo;
