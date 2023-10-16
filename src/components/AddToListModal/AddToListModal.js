import React from "react";
import styles from './AddToListModal.module.css';

export default function AddToListModal({ onClose }) {
    return (
        <div className={styles.modal}>
            <button className={styles.closeButton} onClick={onClose}>X</button>
        </div>
    );
}