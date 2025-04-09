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
          width={140}
          height={140}
        />

      </div>

      <nav className={styles.nav}>
        <a
          href="https://www.linkedin.com/in/alexander-quiroga-a992452b4/"
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
