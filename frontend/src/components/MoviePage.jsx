import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { backend } from "../backendUrl";

function MoviePage({ triggerReviewsFetch }) {

    const {id} = useParams();

    const movieStyle={
        height:"100%",
        width:"100%",
        padding:"2%"
    }

    const [movie, setMovie] = React.useState({});
    const [reviews, setReviews] = React.useState([]);

    useEffect(function() {

        axios.get(`${backend}reviews/${id}`,{withCredentials:"true", headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }})
        .then((response) => {
            return setReviews(response.data);
        })
        .catch((error) => {
            console.error('Error fetching requests', error);
        });

        axios.get(`${backend}movie/${id}`,{withCredentials:"true", headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }})
        .then((response) => {
            setMovie(response.data);
        })
        .catch((error) => {
            console.error('Error fetching requests', error);
        });

    },[id, triggerReviewsFetch]);

    return (
      <div style={movieStyle}>
        <div style={{marginBottom:"2%", width:"100%", display:"flex", margin:"0%", alignItems:"center", flexDirection:"row"}}>
            <h1 style={{fontWeight:"600", fontFamily:"sans-serif", fontSize:"45px", color:"black"}}>{movie.name}</h1>
            <h1 style={{marginLeft:"auto", fontFamily:"sans-serif", fontWeight:"500", fontSize:"60px", color:"#6558f5", marginTop:"0%"}}> {Math.round(movie.averageRating)}/10</h1>
        </div>
        {reviews.map(review => {
            return <Review review={review}/>
        })}
      </div>
    )
  }

  function Review({review}) {
    return (
        <div style={{display:"flex", margin:"1%", padding:"1%", flexDirection:"column", alignItems:"center", border:"2px", borderColor:"#9eadba", borderStyle:"solid"}}>
            <div style={{width:"100%", display:"flex", margin:"0%", flexDirection:"row"}}>
                <h1 style={{fontWeight:"500", fontFamily:"sans-serif", fontSize:"20px", color:"#262626", marginTop:"0%", marginRight:"auto"}}>{review.reviewerName}</h1>
                <h1 style={{fontWeight:"500", fontFamily:"sans-serif", fontSize:"30px", color:"#6558f5", marginTop:"0%", marginLeft:"auto"}}> {review.rating}/10</h1>
            </div>
            <div style={{width:"100%", marginTop:"1%", display:"flex", alignItems:"flex-start"}}>
                <h1 style={{fontWeight:"500", fontFamily:"sans-serif", fontSize:"20px", color:"#262626", marginTop:"0%"}}><i>{review.reviewComments}</i></h1>
            </div>
        </div>
    );
  }
  
  export default MoviePage