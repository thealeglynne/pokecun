// components/PokemonPopup.jsx
import styles from './PokemonPopup.module.css';

export default function PokemonPopup({ pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✖</button>
        <h2 className={styles.name}>{pokemon.name}</h2>
        <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
        <p><strong>Movimientos:</strong> {pokemon.moves.slice(0, 5).map(m => m.move.name).join(', ')}...</p>
        <p><strong>Experiencia base:</strong> {pokemon.base_experience}</p>
      </div>
    </div>
  );
}
