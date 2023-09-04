import styles from './searchresults.module.css';


export default function SearchResults({ results = []}) {
    console.log(results);
    return (
        <div className={styles.results}>
            <ul>
                {results.map((movie, index) => (
                    <li key={index}>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                        <h3>{movie.title}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}