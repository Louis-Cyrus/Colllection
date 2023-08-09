import styles from './app.module.css';

export default function App() {
    return (
        <>
            <div className={styles.section}>
                <h3 className={styles.title}>
                    Colllection est une médiathéque virtuelle de ce que tous ce que j'ai vu, lu et écouté dernièrement
                </h3>
            </div>

            <div className={styles.section}>
                <h3 className={styles.titleLast}>
                    Derniers ajouts
                </h3>
            </div>
        </>

    )
}