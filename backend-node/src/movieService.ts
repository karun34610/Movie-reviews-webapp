import { PrismaClient, Movie } from "@prisma/client";
import { Sql } from "@prisma/client/runtime/library";
import {Request, Response} from 'express'
const prisma = new PrismaClient();

export async function createMovie(req:Request,res:Response){
    try{
        const movie = req.body;
        if(!movie){
            res.status(400).json({ error: 'Invalid movie body' });
            return;
        }

        movie.releaseDate = new Date(movie.releaseDate);

        const createdMovie:Movie = await prisma.movie.create({
            data:movie
        });
        res.status(200).json(createdMovie);

    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function updateMovieById(req:Request,res:Response){
    try{
        const movieId:string = req.params.id;
        const movie:Movie = req.body;;
        if(!movie || !movieId){
            res.status(400).json({ error: 'Invalid movie ID' });
            return;
        }

        const currentMovie = await prisma.movie.findUnique({
            where:{
                id:movieId
            }
        })

        if(currentMovie===null){
            res.status(404).json({ error: 'Movie not found' });
            return;
        }

        currentMovie.name = movie.name;
        currentMovie.releaseDate = new Date(movie.releaseDate);

        const updatedMovie = await prisma.movie.update({
        where:{
            id:movieId
        },
        data:currentMovie
        });

        res.status(200).json(updatedMovie);
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getMovieById(req:Request,res:Response){
    try{
        const movieId:string = req.params.id;
        if(!movieId){
            res.status(400).json({ error: 'Invalid movie ID' });
        }
        const movie:Movie | null = await prisma.movie.findUnique({
        where: {
            id: movieId,
        }
        });

        if(movie===null){
            res.status(404).json({ error: 'Movie not found' });
        }else{
            res.status(200).json(movie);
        }
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getMoviesByFilter(req:Request,res:Response){
    try{
        const searchKey:string = req.body.searchKey;
        if(searchKey===null){
            res.status(400).json({ error: 'Search Key is Missing', body:req.body });
        }

        /*
        const result = await prisma.$queryRaw`SELECT * FROM test.Movie where UPPER(name) LIKE UPPER('%dunki%')`;

        This Method wasn't working for some reason. So I have implemented a naive solution for the reason of time constraint

        */

        const movies:Movie[] = await prisma.movie.findMany({
            where: {}
            });

        const filteredMovies:Movie[] = [];

        movies.forEach(movie => {
            if(movie.name.toLowerCase().includes(searchKey)) filteredMovies.push(movie);
        })

        res.status(200).json(filteredMovies);
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function deleteMovieById(req:Request,res:Response){
    try{
        const movieId:string = req.params.id;
        if(!movieId){
            res.status(400).json({ error: 'Invalid movie ID' });
        }

        const deleteReviewResult = await prisma.review.deleteMany({
            where:{
                movieId:movieId
            }
        });

        const movie:Movie | null = await prisma.movie.delete({
        where: {
            id: movieId,
        }
        });

        if(movie===null){
            res.status(404).json({ error: 'Movie not found' });
        }else{
            res.status(200).json({message:`Movie ${movie.name} deleted`});
        }
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}