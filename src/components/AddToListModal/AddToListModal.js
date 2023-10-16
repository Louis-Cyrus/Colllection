import React from "react";
import styles from './AddToListModal.module.css';

export default function AddToListModal({ onClose }) {
    return (
        <div className={styles.modalOverlay} onClick={ onClose }>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
            </div>
        </div>
    );
}