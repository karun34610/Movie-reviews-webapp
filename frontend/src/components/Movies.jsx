import { OutlinedInput, InputAdornment, ThemeProvider, createTheme, Grid } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import Movie from "./Movie";
import React, { useEffect } from "react";
import axios from "axios";
import { backend } from "../backendUrl";


function Movies({triggerMoviesFetch}) {

    const [movies, setMovies] = React.useState([]);
    const [searchKey, setSearchKey] = React.useState("");

    useEffect(function() {

        axios.post(`${backend}movies`,{searchKey:searchKey},{withCredentials:"true", headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }})
        .then((response) => {
            setMovies(response.data);
        })
        .catch((error) => {
            console.error('Error fetching requests', error);
        });
    },[searchKey, triggerMoviesFetch]);

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

    const containerStyle={
        display:"flex",
        padding:"2%",
        flexDirection:"column",
        alignItems:"center",
        height:"100%"
    }

    return (
      <div style={containerStyle}>
        <div style={{width:"100%"}}>
            <h1 style={{fontWeight:"600", fontSize:"45px", fontFamily:"sans-serif", color:"black"}}>The best movies review site!</h1>
        </div>
        <div style={{width:"100%"}}>
            <ThemeProvider theme={redTheme}>
                <OutlinedInput
                    style={{width:"30%",marginTop:"1%"}}
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="start"> <SearchIcon/> </InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    placeholder="search for your favorite movie"
                    inputProps={{
                    'aria-label': 'weight',
                    }}
                    color="primary"
                    onChange={(e)=>{setSearchKey(e.target.value)}}
                />
            </ThemeProvider>
        </div>
        <div style={{width:"100%",marginTop:"2%",display:"flex",flexDirection:"row"}}>
        <Grid container spacing={5}>
            {movies.map(movie => {
                return <Grid item xs={4}>
                        <Movie movie={movie}/>
                    </Grid>
            })}
        </Grid>
        </div>
      </div>
    )
  }
  
  export default Movies