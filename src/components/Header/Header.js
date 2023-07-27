import React, { useState } from 'react';

import styles from './header.module.css';
import {BiBook, BiCameraMovie, BiAlbum, BiBookAlt} from 'react-icons/bi';

export default function Header() {
    const subtitle = [{
        name: 'Films',
        icon: <BiCameraMovie/>
    },
    {   
        name: 'Livres',
        icon: <BiBook/>
    },
    {
        name: 'Vinyles',
        icon: <BiAlbum/>
    },
    {
        name: 'BD',
        icon: <BiBookAlt/>
    }
];

    const [selectedButton, setSelectedButton] = useState(null);
    const handleClick = (index) => {
        setSelectedButton(index);
    };

    return (
        <div className={styles.header}>
            <h1 className={styles.title}>Colllection</h1>

            <span className={styles.section1}>
                    {subtitle.map((item, index) => (
                        <button 
                            key={index} 
                            className={styles.subtitle}
                            onClick={() => handleClick(index)}
                            style={{backgroundColor: selectedButton === index ? '#DAAA63' : '#F8F3ED'}}
                        >
                            {item.icon}
                            {item.name}
                        </button>
                    ))}
            </span>

            <span className={styles.section2}>
                <p className={styles.profil}>Profil</p>
            </span>
        </div>
    )
}