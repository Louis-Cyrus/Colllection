import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchResults/SearchResults";
import styles from "./search.module.css";
import { searchMoviesWithCredits } from "../../../api/movies";
import { useState } from "react";

export default function Search() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Nouvel état pour les total pages

    const handlePageChange = async (direction) => {
        const nextPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
        setCurrentPage(nextPage);
        const { movies } = await searchMoviesWithCredits(search, nextPage); // Extraire uniquement les films ici
        setResults(movies);
    };

    const handleSearch = async (query) => {
        setSearch(query);
        setCurrentPage(1);
        setLoading(true);
        try {
            const { movies, totalPages } = await searchMoviesWithCredits(query); // Destructuration pour obtenir les films et total pages
            setResults(movies);
            setTotalPages(totalPages); // Définir total pages
        } catch (error) {
            console.log("Erreur lors de la recherche", error);
            alert("On n'a pas trouvé de résultats pour ta recherche 🥲 Rééssaye avec un autre mot clé !");
        } 
        setLoading(false);
    };

    return (
        <div className='search'>
            <SearchBar onSearch={handleSearch} />
            {loading ? (
                <p>La patience adoucit tout mal sans remède.</p>
            ) : (
                <SearchResults results={results} />
            )}
    
            <div className={styles.pagination}>
                {currentPage > 1 && (
                    <span 
                        className={styles.previous} 
                        onClick={() => handlePageChange('previous')
                    }>
                        <img 
                            src="/images/gauche.svg" 
                            alt="previous flèche gauche"
                            className={styles.arrow}
                        />
                    </span>
                )}
                <span className={styles.page}>Page {currentPage} sur {totalPages}</span> {/* Afficher le total des pages */}
                {currentPage < totalPages && ( 
                    <span
                        className={styles.next} 
                        onClick={() => handlePageChange('next')
                    }>
                        <img 
                            src="/images/droite.svg" 
                            alt="next flèche droite" 
                            className={styles.arrow}
                        />
                    </span>
                )}
            </div>
        </div>
    );    
}
