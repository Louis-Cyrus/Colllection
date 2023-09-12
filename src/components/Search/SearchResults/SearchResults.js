import React, { useState } from 'react';
import styles from './searchresults.module.css';
import { BsFillBookmarkFill } from 'react-icons/bs';


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
            {results.map((movie, index) => (
                <span
                    key={index}
                    className={`${styles.card} ${clicked.includes(index) ? styles.clicked : ""}`}
                    onClick={() => handleClick(index)}
              >
              
                    <img 
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
                        alt={movie.title} 
                        className={styles.image}
                    />
                    <BsFillBookmarkFill
                        className={styles.bookmark}
                    />
                    <h3 className={styles.title}>{movie.title}</h3>
                </span>
            ))}
        </div>
    );
}