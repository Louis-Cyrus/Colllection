import styles from './searchbar.module.css';
import { useState } from 'react';
import { BsSearch} from 'react-icons/bs';

{/* J'ai envie de faire une barre de recherche sur différents API pour trouver de nouveaux films, livres, vinyles et bd*/ }

export default function SearchBar({ onSearch }) {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        if (search) {
            console.log(search);
            onSearch(search)
        }
    }

    const debounce = (func, delay) => {
        let timerId;
        return (...args) => {
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const debouncedSearch = debounce(handleSearch, 500);

    const handleKeyUp = (event) => {
        const value = event.target.value;
        setSearch(value);
        debouncedSearch(value);
    }

    return (
        <div className={styles.searchbar}>
            <span
                onClick={handleSearch}
                className={styles.button}
                aria-label='searchbutton'
            >
                <BsSearch />
            </span>
            <input
                type="text"
                placeholder="Entre une oeuvre, un artiste, un auteur..."
                value={search}
                onChange={handleKeyUp}
                className={styles.input}
                aria-label='searchbar'
            />

        </div>
    );
}
