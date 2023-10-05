import React from "react";
import { fetchMovieById } from "../../../api/movies";
import styles from "./[id].module.css";
  
function Movie({ movie }) {
    if (!movie) return <div>Failed to load movie</div>;
    return (
        <div>
            <h1 className={styles.title}>{movie.title}</h1>
            <p className={styles.overview}>{movie.overview}</p>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    try {
        const movie = await fetchMovieById(id);
        return {
            props: {
                movie,
            },
        };
    } catch (error) {
        console.error('Failed to fetch movie:', error.message);
        return {
            notFound: true,
        };
    }
}

export default Movie;
