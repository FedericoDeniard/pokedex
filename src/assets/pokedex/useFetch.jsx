import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPokemonArray(data.pokemon_entries);
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  }, []);

  return { pokemonArray, loading, error };
};
