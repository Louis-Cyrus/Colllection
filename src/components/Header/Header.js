import React, { useState } from 'react';
import Link from 'next/link';

import styles from './header.module.css';
import {BiBook, BiCameraMovie, BiAlbum, BiBookAlt} from 'react-icons/bi';

export default function Header() {
    const subtitle = [{
        id: 1,
        name: 'Films',
        icon: <BiCameraMovie/>,
        link: '/movies'
    },
    {   
        id: 2,
        name: 'Livres',
        icon: <BiBook/>,
        link: '/books'
    },
    {
        id: 3,
        name: 'Vinyles',
        icon: <BiAlbum/>,
        link: '/vinyles'
    },
    {
        id: 4,
        name: 'BD',
        icon: <BiBookAlt/>,
        link: '/bd'
    }
];

    const [selectedButton, setSelectedButton] = useState(null);
    const handleClick = (index) => {
        setSelectedButton(index);
    };

    {/* Le return doit contenir un bouton avec un icon, un nom et un lien vers la page adéquate */}

    return (
        <div className={styles.header}>
            <Link href="/">
                <h1 className={styles.title}>Colllection</h1>
            </Link>

            <span className={styles.section1}>
                    {subtitle.map((item, index) => (
                        <Link href={item.link}>
                            <button 
                                key={item.id} 
                                className={styles.subtitle}
                                onClick={() => handleClick(index)}
                                style={{backgroundColor: selectedButton === index ? '#DAAA63' : '#F8F3ED'}}
                            >
                                {item.icon}
                                {item.name}
                            </button>
                        </Link>
                        
                    ))}
            </span>
        </div>
    )
}