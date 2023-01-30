import React, {useEffect, useState} from "react";
import MovieDetails from "./MovieDetails";
import SearchIcon from './search.svg';
import './App.css';

//http://www.omdbapi.com/?i=tt3896198&apikey=7644dc03

const API_URL="http://www.omdbapi.com?apikey=7644dc03";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies,setMovies] = useState([]);

    const fetchMovie = async (moviename) => {
        const response= await fetch(`${API_URL}&s=${moviename}`);
        const data= await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        fetchMovie('Narnia');
      },[]);

    return (
        <div className="app">
            <h1>FilmZone</h1>
            <div className="search">
                <input
                value={searchTerm}
                placeholder="Find Movies"
                onChange={(e)=> setSearchTerm(e.target.value)}
                />
                <img 
                src={SearchIcon}
                alt="search"
                onClick={()=>fetchMovie(searchTerm)}
                />
            </div>

            {movies?.length>0?
                (
                    <div className="container">
                        {movies.map((movie)=>(
                            <MovieDetails movie = {movie}/>
                        ))}
                    </div>
                )
                :
                (
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                )}
        </div>
    );
};

export default App;