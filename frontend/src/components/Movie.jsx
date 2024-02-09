import React from "react";
import { useNavigate } from "react-router-dom";

function Movie({movie}) {

    const movieStyle={
        height:"100%",
        width:"100%",
        padding:"5%",
        backgroundColor:"#e0defd"
    }

    const navigate = useNavigate();

    return (
      <div style={movieStyle} onClick={() => {navigate(`/movie/${movie.id}`)}}>
        <h1 style={{fontWeight:"500", fontFamily:"sans-serif", fontSize:"30px", color:"#262626", marginTop:"0%"}}>{movie.name}</h1>
        <h2 style={{fontWeight:"500", fontFamily:"sans-serif", fontSize:"25px", color:"#262626", marginTop:"3%"}}><i>Released: {formatDate(movie.releaseDate)}</i></h2>
        <h2 style={{fontWeight:"700", fontFamily:"sans-serif", fontSize:"25px", color:"#262626", marginTop:"3%"}}>Rating: {getRating(movie)}</h2>
      </div>
    )
  }

  function getRating(movie){
     if(movie.averageRating){return Math.round(movie.averageRating) + '/10';}else{return 'NA';}
  }

  export function formatDate(d) {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
}
  
  export default Movie