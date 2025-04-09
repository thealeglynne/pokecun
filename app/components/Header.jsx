'use client';

import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          src="https://cdn.worldvectorlogo.com/logos/pokemon-23.svg" 
          alt="Pokecunn Logo"
          width={110}
          height={110}
        />

      </div>

      <nav className={styles.nav}>
        <a
          href="https://www.linkedin.com/in/tuusuario"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          LinkedIn
        </a>
       
      </nav>
    </header>
  );
}
