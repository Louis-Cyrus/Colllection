import React, { useState } from 'react';
import Link from 'next/link';

import styles from './header.module.css';
import {BiBook, BiCameraMovie, BiAlbum, BiBookAlt, BiBookmark} from 'react-icons/bi';
import {GiHamburgerMenu} from 'react-icons/gi';
import { BsArrowLeftShort} from 'react-icons/bs';

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
    },
    {
        id: 5,
        name: "Liste d'envie",
        icon: <BiBookmark/>,
        link: '/wishlist'
    }
];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [selectedButton, setSelectedButton] = useState(null);
    const handleClick = (index) => {
        setSelectedButton(index);
    };

    {/* 
        Le return doit contenir un bouton avec un icon, un nom et un lien vers la page adéquate 
    */}

    return (
        <>
            <button className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <GiHamburgerMenu />
            </button>

            <div className={`${styles.header} ${isMenuOpen ? styles.open : ''}`}>
                <button className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <BsArrowLeftShort />
                </button>
                <Link href="/">
                    <h1 className={styles.title}>Colllection</h1>
                </Link>

                <span className={styles.section1}>
                        {subtitle.map((item, index) => (
                            <Link href={item.link} key={item.id}>
                                <span
                                    key={item.id}
                                    className={styles.subtitle}
                                >
                                    {item.icon}
                                </span>
                                <button 
                                    key={item.id} 
                                    className={styles.subtitle}
                                    onClick={() => handleClick(index)}
                                >
                                    {item.name}
                                </button>
                            </Link>
                            
                        ))}
                </span>
            </div>
        </>
        
    )
}