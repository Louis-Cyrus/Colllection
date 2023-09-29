import React, { useState } from 'react';
import styles from './searchresults.module.css';

export default function SearchResults({ results = []}) {
    console.log(results);

    const [clicked, setClicked] = useState([]);

    const handleClick = (index) => {
        if(clicked.includes(index)) {
            setClicked(clicked.filter((item) => item !== index));
        } else {
            setClicked([...clicked, index]);
        }
    }

    return (
        <div className={styles.results}>
            {results.map((movie, index) => {
                const director = movie.credits.crew.find(person => person.job === 'Director');
                const directorName = director ? director.name : 'Inconnu';

                return (
                    <span
                        key={index}
                        className={styles.card}
                        onClick={() => handleClick(index)}
                    >
                        <span className={styles.overlay}>
                            <img 
                                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
                                alt={movie.title} 
                                className={styles.image}
                            />
                        </span>
                        <span className={styles.infos}>
                            <h3 className={styles.title}>{movie.title}</h3>
                            <p className={styles.director}>Un film de {directorName}</p>                     
                        </span>
                        
                    </span>

                    
                );
            })}

            
        </div>
    );
}
