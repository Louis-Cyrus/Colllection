import React from "react";
import styles from './ReviewModal.module.css';

export default function ReviewModal({ onClose, movie }) {
    return (
        <div className={styles.modalOverlay} onClick={ onClose }>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.poster}>
                    <img 
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
                        alt={movie.title} 
                        className={styles.image}
                    />
                </div>
                <div className={styles.informations}>
                    <h3 className={styles.subtitle}>Critique de...</h3>
                    <h2 className={styles.title}>{movie.title}</h2>
                    <span className={styles.date}>
                        <label className={styles.label}>Vu/Lu le :</label> <input type="date" className={styles.input} />
                        <label className={styles.label}>Ma note :</label> <input type="number" className={styles.input} />/20
                    </span>
                    <span className={styles.review}>
                        <textarea className={styles.inputReview} placeholder="Mon avis" cols="53"/ >
                    </span>
                    <button className={styles.submitButton}>Enregistrer</button>
                    <span className={styles.closeButton} onClick={onClose}>X</span>
                </div>
            </div>
            
        </div>
    );
}