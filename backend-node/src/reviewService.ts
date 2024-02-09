import { Movie, PrismaClient, Review } from "@prisma/client";
import {Request, Response} from 'express'
const prisma = new PrismaClient();

export async function createReview(req:Request,res:Response){
    try{
        const review = req.body;
        if(!review){
            res.status(400).json({ error: 'Invalid review body' });
            return;
        }

        const movie:Movie | null = await prisma.movie.findUnique({
            where:{
                id:review.movieId
            }
        });

        if(!movie){
            res.status(400).json({ error: 'Invalid movie id' });
            return;
        }



        const createdReview:Review = await prisma.review.create({
            data:review
        });

        const result = await prisma.review.aggregate({
            _count: true,
            _sum: {
              rating: true, // Field for which sum is calculated
            },
            where: {
                movieId:movie.id
            }
          });

          if(!result || !result._sum.rating){
            throw Error;
          }

        movie.averageRating = result._sum.rating / result._count;

        const updatedMovie:Movie = await prisma.movie.update({
            data:movie,
            where:{
                id:movie.id
            }
        });

            res.status(200).json(createdReview);

    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getReviews(req:Request,res:Response){
    try{
        const movieId:string = req.params.id;
        if(!movieId){
            res.status(400).json({ error: 'Invalid movie ID' });
        }
        const reviews:Review[] = await prisma.review.findMany({
        where: {
            movieId: movieId,
        }
        });

        if(reviews===null){
            res.status(404).json({ error: 'Review not found' });
        }else{
            res.status(200).json(reviews);
        }
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function updateReviewById(req:Request,res:Response){
    try{
        const reviewId:string = req.params.id;
        const review:Review = req.body;;
        if(!review || !reviewId){
            res.status(400).json({ error: 'Invalid review ID' });
            return;
        }

        const currentReview = await prisma.review.findUnique({
            where:{
                id:reviewId
            }
        })

        if(currentReview===null){
            res.status(404).json({ error: 'Review not found' });
            return;
        }

        currentReview.reviewerName = review.reviewerName;
        currentReview.reviewComments = review.reviewComments;
        currentReview.rating = review.rating;

        const updatedReview = await prisma.review.update({
        where:{
            id:reviewId
        },
        data:currentReview
        });

        res.status(200).json(updatedReview);
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getReviewById(req:Request,res:Response){
    try{
        const reviewId:string = req.params.id;
        if(!reviewId){
            res.status(400).json({ error: 'Invalid review ID' });
        }
        const review:Review | null = await prisma.review.findUnique({
        where: {
            id: reviewId,
        }
        });

        if(review===null){
            res.status(404).json({ error: 'Review not found' });
        }else{
            res.status(200).json(review);
        }
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function deleteReviewById(req:Request,res:Response){
    try{
        const reviewId:string = req.params.id;
        if(!reviewId){
            res.status(400).json({ error: 'Invalid movie ID' });
        }
        const review:Review | null = await prisma.review.delete({
        where: {
            id: reviewId,
        }
        });

        if(review===null){
            res.status(404).json({ error: 'Review not found' });
        }else{
            res.status(200).json({message:`Review by ${review.reviewerName} deleted`});
        }
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}