import React from "react";
import { fetchMovieById } from "../../../api/movies";
import { fetchMovieCredits } from "../../../api/movies";
import styles from './[id].module.css';

export async function getServerSideProps(context) {
    const { id } = context.params;
    try {
        const movie = await fetchMovieById(id);
        const credits = await fetchMovieCredits(id);
        console.log(credits);

        // Recherche du réalisateur dans les crédits (en supposant que le rôle du réalisateur est défini par "Director" dans l'objet crédits)
        const director = credits && credits.crew ? credits.crew.find(crewMember => crewMember.job === "Director") : null;
        const directorName = director ? director.name : "Inconnu";

        // Fusion des informations du film et du nom du réalisateur
        return {
            props: {
                movie: {
                    ...movie,
                    director_name: directorName
                },
            },
        };
    } catch (error) {
        console.error('Failed to fetch movie or credits:', error.message);
        return {
            notFound: true,
        };
    }
}
  
export default function Movie({ movie }) {
    if (!movie) return <div>Failed to load movie</div>;
    console.log(movie);
    return (
        <div className={styles.card}>
            <div className={styles.container}>
                <span className={styles.wrapper}>
                    <img className={styles.poster} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                </span>
            </div>
            
            <div className={styles.informations}>
                <span className={styles.image}>
                    <img className={styles.backdrop} src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
                </span>
                <div className={styles.text}>
                    <h1 className={styles.title}>{movie.title}</h1>
                    <p className={styles.details}>{movie.release_date.split('-')[0]} • Réalisé par {movie.director_name}</p> {/* Adjust according to your data structure */}
                    <p className={styles.overview}>{movie.overview}</p>
                </div>
            </div>
        </div>
    );
}
