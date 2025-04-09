'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './PokemonCarousel.module.css';

export default function PokemonEvs({ onSelect, currentPokemonId }) {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    if (!currentPokemonId) return;

    const fetchGroup = async () => {
      // Calcula el grupo al que pertenece el ID actual
      const groupStart = Math.floor((currentPokemonId - 1) / 3) * 3 + 1;
      const groupIds = [groupStart, groupStart + 1, groupStart + 2].filter(id => id <= 898);

      const promises = groupIds.map(id =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
      );
      const results = await Promise.all(promises);
      setPokemons(results);
    };

    fetchGroup();
  }, [currentPokemonId]);

  return (
    <div className={styles.grid}>
      {pokemons.map(pokemon => (
        <div key={pokemon.id} className={styles.card}>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={80}
            height={80}
          />
          <p className={styles.name}>{pokemon.name}</p>
          <button onClick={() => onSelect(pokemon.name)} className={styles.button}>
            Ver más
          </button>
        </div>
      ))}
    </div>
  );
}
