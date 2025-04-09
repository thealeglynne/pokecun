// components/PokemonCard.jsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './PokemonCard.module.css';
import PokemonPopup from './PokemonPopup';

export default function PokemonCard({ pokemon }) {
  const [showPopup, setShowPopup] = useState(false);

  if (!pokemon) return null;

  return (
    <>
      <div id='nombrePokemon' className={styles.card}>
        <h2 className={styles.name}>{pokemon.name}</h2>
        <div className={styles.imageWrapper}>
        
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={280}
            height={280}

          />
        </div>
        <p><strong>ID:</strong> {pokemon.id}</p>
        <p><strong>Tipo:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
        <button onClick={() => setShowPopup(true)} className={styles.button}>
          Ver Detalles
        </button>
      </div>

      {showPopup && <PokemonPopup pokemon={pokemon} onClose={() => setShowPopup(false)} />}
    </>
  );
}
