import React from "react";
import styles from './ReviewModal.module.css';

export default function ReviewModal({ onClose }) {
    return (
        <div className={styles.modal}>
            <button className={styles.closeButton} onClick={onClose}>X</button>
        </div>
    );
}