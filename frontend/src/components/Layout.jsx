import { Outlet } from "react-router-dom"
import { Button, Dialog, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@emotion/react";
import React, { useEffect } from "react";
import axios from "axios";
import {backend} from "./../backendUrl";

function Layout({triggerMoviesFetch, triggerReviewsFetch, setTriggerMoviesFetch, setTriggerReviewsFetch}) {
    const redTheme = createTheme({
        palette: {
          primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#6558f5',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
          },
        },
      });

    const topHeaderStyle={
        backgroundColor:"#9eadba",
        height:"30px"
    }

    const dotStyle={
        height: "15px",
        width: "15px",
        backgroundColor: "#8f9eac",
        borderRadius: "50%",
        display: "inline-block",
        margin:"2px",
        verticalAlign: 'middle'
    }

    const headerStyle ={
        alignItems:"center",
        backgroundColor:"#e3e8ed",
        display:"flex",
        flexDirection:"row",
        height:"80px"
    }

    const footerStyle={
      marginTop:"auto",
        alignItems:"center",
        display:"flex",
        flexDirection:"row",
        backgroundColor:"#9eadba",
        height:"80px",
        position:"relative",
        bottom:'0',
        width:"100%"
    }

    const [openAddMovie, setOpenAddMovie] = React.useState(false);
    const [openAddReview, setOpenAddReview] = React.useState(false);

  
    const handleAddMovieClose = () => {
      setOpenAddMovie(false);
    };

  
    const handleAddReviewClose = () => {
      setOpenAddReview(false);
    };

    const triggerSetMovies = () => {
      setTriggerMoviesFetch(!triggerMoviesFetch);
    }

    const triggerSetReviews = () => {
      setTriggerReviewsFetch(!triggerReviewsFetch);
    }

  return (
    <div style={{display:"flex", flexDirection:"column", minHeight: "100vh"}}>
    <div className="flex items-center ..." style={topHeaderStyle}>
        <span style={dotStyle}></span>
        <span style={dotStyle}></span>
        <span style={dotStyle}></span>
    </div>
    <div style={headerStyle}>

        <div style={{display:"flex",flexDirection:"row"}}>
            <h1 style={{fontWeight:"600", fontFamily:"sans-serif", fontSize:"25px", color:"#262626", margin:"10%"}}>MOVIECRITIC</h1>
        </div>
        <div style={{display:"flex",flexDirection:"row",marginLeft:"auto"}}>
            <ThemeProvider theme={redTheme}>
                <Button style={{backgroundColor:"white",fontWeight:"600", height:"50%", marginRight:"10px", fontFamily:"sans-serif"}} variant="outlined" color="primary" onClick={()=>setOpenAddMovie(true)}>Add New Movie</Button>
            </ThemeProvider>

            <ThemeProvider theme={redTheme}>
                <Button style={{fontWeight:"600", height:"50%", marginRight:"10px", fontFamily:"sans-serif"}} variant="contained" color="primary" onClick={()=>setOpenAddReview(true)}>Add New Review</Button>
            </ThemeProvider>
            
        </div>
    </div>
    <Outlet/>
    <footer style={footerStyle}>
        <h1 style={{fontWeight:"600", fontFamily:"sans-serif", marginLeft:"5%", fontSize:"20px", color:"white"}}>Copyright 2021</h1>
        <h1 style={{fontWeight:"600", fontFamily:"sans-serif", marginRight:"5%", fontSize:"20px", color:"white", marginLeft:"auto"}}>Follow us on instagram</h1>
    </footer>
    <AddMovieDialog
        open={openAddMovie}
        onClose={handleAddMovieClose}
        trigger={triggerMoviesFetch}
        triggerSetMovies={triggerSetMovies}
      />
      <AddReviewDialog
        open={openAddReview}
        onClose={handleAddReviewClose}
        trigger={triggerReviewsFetch}
        triggerSetReviews={triggerSetReviews}
      />
    </div>
  )
}

function AddMovieDialog({open, onClose, trigger, triggerSetMovies}) {

  const [name,setName] = React.useState("");
  const [releaseDate,setReleaseDate] = React.useState("");

  const redTheme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#6558f5',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

  const handleClose = () => {
    onClose();
  };

  function addMovie(){

    const movie = {
      name:name,
      releaseDate:releaseDate
    }

    axios.post(`${backend}movie`,movie,{withCredentials:"true", headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }})
        .then(() => {
            triggerSetMovies(!trigger); 
            handleClose();
        })
        .catch((error) => {
            console.error('Error fetching requests', error);
            handleClose();
        });
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <div style={{display:"flex", flexDirection:"column", height:"360px", width:"300px"}}>
        <div style={{padding:"5%"}}>
          <h1 style={{fontWeight:"500", fontFamily:"sans-serif", fontSize:"30px", color:"#262626", marginTop:"0%"}}>Add New Movie</h1>
        </div>
        <div style={{padding:"5%"}}>
        <ThemeProvider theme={redTheme}>
        <TextField style={{width:"100%"}} id="outlined-basic" label="Name" variant="outlined" onChange={(e) => {setName(e.target.value)}} />
          </ThemeProvider>
          
        </div>
        <div style={{padding:"5%"}}>
        <ThemeProvider theme={redTheme}>
        <TextField style={{width:"100%"}} id="outlined-basic" label="Release date | YYYY-MM-DD" variant="outlined" onChange={(e) => {setReleaseDate(e.target.value)}} />
          </ThemeProvider>
        </div>
        
        <div style={{display:"flex", flexDirection:"row", padding:"5%"}}>
          <ThemeProvider theme={redTheme}>
                <Button style={{margin:"2%", fontWeight:"500", height:"100%", marginLeft:"auto", fontFamily:"sans-serif"}} variant="contained" color="primary" onClick={()=>addMovie()}>Create movie</Button>
          </ThemeProvider>
        </div>
      </div>
    </Dialog>
  );
}

function AddReviewDialog({open, onClose, trigger, triggerSetReviews}) {

  const [movie,setMovie] = React.useState({});
  const [reviewerName,setReviewerName] = React.useState("");
  const [reviewComments,setReviewComments] = React.useState("");
  const [rating,setRating] = React.useState(0);

  const redTheme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#6558f5',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

  function addRating(){

    const review = {
      movieId:movie.id,
      reviewerName:reviewerName,
      reviewComments:reviewComments,
      rating:rating
    }

    axios.post(`${backend}review`,review,{withCredentials:"true", headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }})
        .then(() => {
            triggerSetReviews(!trigger);
            handleClose();
        })
        .catch((error) => {
            console.error('Error fetching requests', error);
            handleClose();
        });
  }

  const handleClose = () => {
    onClose();
  };

  const [movies, setMovies] = React.useState([]);

    useEffect(function() {

        axios.post(`${backend}movies`,{searchKey:""},{withCredentials:"true", headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }})
        .then((response) => {
            console.log(response);
            setMovies(response.data);
        })
        .catch((error) => {
            console.error('Error fetching requests', error);
        });
    },[trigger]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <div style={{display:"flex", flexDirection:"column", height:"500px", width:"300px"}}>
        <div style={{padding:"5%"}}>
          <h1 style={{fontWeight:"500", fontSize:"30px", fontFamily:"sans-serif", color:"#262626", marginTop:"0%"}}>Add Review</h1>
        </div>



        <div style={{padding:"5%", width:"100%"}}>
          <ThemeProvider theme={redTheme}>
            <InputLabel id="demo-select-small-label">Select Movie</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              style={{width:"100%"}}
              value={movie.name}
              label="Age"
              onChange={(e)=>{setMovie(e.target.value)}}
            >
              {movies.map((movie) => {
                return <MenuItem value={movie}>{movie.name}</MenuItem>
              })}
            </Select>
          </ThemeProvider>
        </div>

        <div style={{padding:"5%"}}>
        <ThemeProvider theme={redTheme}>
        <TextField style={{width:"100%"}} id="outlined-basic" label="Your name" variant="outlined" onChange={(e)=>setReviewerName(e.target.value)} />
          </ThemeProvider>
          
        </div>
        <div style={{padding:"5%"}}>
        <ThemeProvider theme={redTheme}>
        <TextField style={{width:"100%"}} id="outlined-basic" label="Rating out of 10" variant="outlined" onChange={(e)=>setRating(Number.parseInt(e.target.value))} />
          </ThemeProvider>
        </div>

        <div style={{padding:"5%"}}>
        <ThemeProvider theme={redTheme}>
        <textarea style={{width:"100%", borderStyle:"solid", border:"1px", borderColor:"grey"}} id="outlined-basic" placeholder="your comments" onChange={(e)=>setReviewComments(e.target.value)}></textarea>
          </ThemeProvider>
        </div>
        
        <div style={{display:"flex", flexDirection:"row", padding:"5%"}}>
          <ThemeProvider theme={redTheme}>
                <Button style={{margin:"2%", fontWeight:"500", height:"100%", marginLeft:"auto", fontFamily:"sans-serif"}} variant="contained" color="primary" onClick={()=>addRating()}>Add Review</Button>
          </ThemeProvider>
        </div>
      </div>
    </Dialog>
  );
}

export default Layout
