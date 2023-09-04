import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchResults/SearchResults";
import { searchMovies } from "../../../api/movies";
import { useState } from "react";

export default function Search() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (search) => {
        setLoading(true);
        try {
            const data = await searchMovies(search);
            setResults(data);
            console.log(data);
        } catch (error) {
            console.log("Erreur lors de la recherche", error);
            alert("On n'a pas trouvé de résultats pour ta recherche 🥲 Rééssaye avec un autre mot clé !");
        } 
        setLoading(false);
    };

    

    return (
        <div className='search'>
            <SearchBar onSearch={handleSearch} />
            {loading ? (
            <p>La patience adoucit tout mal sans remède.</p>
        ) : (
            <SearchResults results={results} />
        )}
        </div>
    );

}