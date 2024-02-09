import {Request, Response} from 'express';
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');
server.use(cors({
    origin: 'https://movie-reviews-webapp.vercel.app',
    credentials: true
}));

import {getMoviesByFilter, createMovie, getMovieById, deleteMovieById, updateMovieById} from './movieService';
import {getReviews, createReview, getReviewById, deleteReviewById, updateReviewById} from './reviewService';

server.use(bodyParser.json());

// movie API
server.post('/movie',(req:Request,res:Response)=>{
    createMovie(req,res);
})
server.get('/movie/:id',(req:any,res:any)=>{
    getMovieById(req,res);
})
server.put('/movie/:id',(req:any,res:any)=>{
    updateMovieById(req,res);
})
server.delete('/movie/:id',(req:any,res:any)=>{
    deleteMovieById(req,res);
})



server.post('/movies',(req:Request,res:Response)=>{
    getMoviesByFilter(req,res);
})

// Review API
server.post('/review',(req:Request,res:Response)=>{
    createReview(req,res);
})
server.get('/reviews/:id',(req:any,res:any)=>{
    getReviews(req,res);
})
server.get('/review/:id',(req:any,res:any)=>{
    getReviewById(req,res);
})
server.put('/review/:id',(req:any,res:any)=>{
    updateReviewById(req,res);
})
server.delete('/review/:id',(req:any,res:any)=>{
    deleteReviewById(req,res);
})


server.listen(process.env.PORT,()=>{
    console.log("server started");
});