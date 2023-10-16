import React, { useState } from "react";
import { fetchMovieById } from "../../../api/movies";
import { fetchMovieCredits } from "../../../api/movies";
import ReviewModal from "@/components/ReviewModal/ReviewModal";
import AddToListModal from "@/components/AddToListModal/AddToListModal";
import { BiPen, BiBookmark, BiHeart, BiSolidHeart, BiListPlus } from "react-icons/bi";
import styles from './[id].module.css';

export async function getServerSideProps(context) {
    const { id } = context.params;
    try {
        const movie = await fetchMovieById(id);
        const credits = await fetchMovieCredits(id);
        console.log("Credits:", credits);

        // Recherche du réalisateur dans les crédits (en supposant que le rôle du réalisateur est défini par "Director" dans l'objet crédits)
        const director = credits && credits.crew ? credits.crew.find(crewMember => crewMember.job === "Director") : null;
        const directorName = director ? director.name : "Inconnu";

        const casting = credits && credits.cast ? credits.cast : null;
        console.log(casting);

        // Fusion des informations du film et du nom du réalisateur
        return {
            props: {
                movie: {
                    ...movie,
                    director_name: directorName,
                    casting: casting,
                },
            },
        };
    } catch (error) {
        console.error('Failed to fetch movie or credits:', error.message);
        return {
            notFound: true,
        };
    }
}
  
export default function Movie({ movie }) {
    const [visibleCount, setVisibleCount] = useState(5);

    const handleShowMore = () => {
        setVisibleCount(visibleCount + 5);
    }

    const handleShowLess = () => {
        setVisibleCount(visibleCount - 5);
    }

    const [userRating, setUserRating] = useState(null);

    const handleRatingChange = (e) => {
        setUserRating(e.target.value);
    }

    const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

    const handleRatingSubmit = () => {
        console.log("Note soumise", userRating);
        setIsRatingSubmitted(true);
    }

    const handleEditRating = () => {
        setIsRatingSubmitted(false);
    }

    const [openModal, setOpenModal] = useState(false);

    if (!movie) return <div>Failed to load movie</div>;
    console.log(movie);

    const subtitle = [{
        id: 1,
        name: "Ecrire une critique",
        icon: <BiPen/>,
    },
    {
        id: 2,
        name: "Ajouter à ma whishlist",
        icon: <BiBookmark/>,
    },
    {
        id: 3,
        name: "Coup de coeur",
        icon: <BiHeart/>,
    },
    {
        id: 4,
        name: "Ajouter à une liste",
        icon: <BiListPlus/>,
    }
];

    return (
        <div className={styles.card}>
            <div className={styles.container}>
                <span className={styles.wrapper}>
                    <img className={styles.poster} src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
                </span>
            </div>
            
            <div className={styles.informations}>
                <section className={styles.image}>
                    <img className={styles.backdrop} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />

                    <span className={styles.vote}>
                        {!isRatingSubmitted ? (
                            <>
                                <input
                                    type="number"
                                    value={userRating || ''}
                                    onChange={handleRatingChange}
                                    min="0"
                                    max="20"
                                    className={styles.ratingInput}
                                />
                                <label className={styles.ratingLabel}>/20</label>
                                <button onClick={handleRatingSubmit} className={styles.submitRatingButton}>
                                    Envoyer
                                </button>
                            </>
                        ): (
                            <>
                                <span onClick={handleEditRating} className={styles.submittedRating}>
                                    {userRating}/20
                                </span> 
                            </>
                        )}
                    </span> <br />

                    {openModal === "review" && <ReviewModal movie={movie} onClose={() => setOpenModal(null)} />}
                    {openModal === "addToList" && <AddToListModal onClose={() => setOpenModal(null)} />}

                    <span className={styles.actions}>
                        {subtitle.map((item) => (
                            <span 
                                className={styles.action} 
                                key={item.id}
                                onClick={() => {
                                    if(item.id === 1) setOpenModal("review");
                                    if(item.id === 4) setOpenModal("addToList");
                                }}
                            >
                                <p className={styles.icon}>{item.icon}</p>
                                <p className={styles.item}>{item.name}</p>
                            </span>
                        ))}
                    </span>
                </section>
                <div className={styles.text}>
                    <h1 className={styles.title}>{movie.title}</h1>
                    <p className={styles.details}>{movie.release_date.split('-')[0]} • Réalisé par {movie.director_name} • {movie.runtime} mins</p>
                    <p className={styles.details}><span className={styles.category}>Genres :</span> {movie.genres.map(genre => genre.name).join(', ')} • <span className={styles.category}>Pays :</span> {movie.production_countries.map(production_countrie => production_countrie.name).join(', ')}</p>
                    <h3 className={styles.tagline}>{movie.tagline}</h3>
                    <p className={styles.overview}>{movie.overview}</p>
                    <div className={styles.credits}>
                        <h4 className={styles.subtitle}>Casting</h4>
                        <div className={styles.cast}>
                            {movie.casting && movie.casting.slice(0, visibleCount).map((castMember, index) => (
                                <div className={styles.member} key={index}>
                                    <img className={styles.profile} src={`https://image.tmdb.org/t/p/original/${castMember.profile_path}`} alt={castMember.name} />
                                    <p className={styles.name}>{castMember.name}</p>
                                    <p className={styles.character}>{castMember.character}</p>
                                </div>
                            ))}
                        </div>
                        {movie.casting && visibleCount < movie.casting.length && (
                            <button onClick={handleShowMore} className={styles.showMoreButton}>
                                Voir plus
                            </button>
                        )}
                        {visibleCount > 5 && (
                            <button onClick={handleShowLess} className={styles.showLessButton}>
                                Voir moins
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
