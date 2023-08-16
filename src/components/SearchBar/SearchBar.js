import styles from './searchbar.module.css';
import { useState } from 'react';

{/* J'ai envie de faire une barre de recherche sur différents API pour trouver de nouveaux films, livres, vinyles et bd*/ }

export default function SearchBar() {
    const [search, setSearch] = useState('');

    return (
        <div className={styles.searchbar}>
            <input
                type="text"
                placeholder="Entre une oeuvre, un artiste, un auteur..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className={styles.input}
                aria-label='searchbar'
            />
            <button className={styles.button} aria-label='button, search'>Rechercher</button>
        </div>
    );
}
