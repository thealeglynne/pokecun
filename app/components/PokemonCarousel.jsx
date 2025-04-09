'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './PokemonCarousel.module.css';

export default function PokemonCarousel({ onSelect }) {
  const [randomPokemons, setRandomPokemons] = useState([]);

  const fetchRandomPokemons = async () => {
    const ids = Array.from({ length: 10 }, () => Math.floor(Math.random() * 898) + 1);
    const promises = ids.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()));
    const results = await Promise.all(promises);
    setRandomPokemons(results);
  };

  useEffect(() => {
    fetchRandomPokemons();
  }, []);

  return (
    <div className={styles.grid}>
      {randomPokemons.map(pokemon => (
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
