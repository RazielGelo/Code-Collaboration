import Database from '@/resources/database';
import Movie from '@/interfaces/Movie';
import User from '@/interfaces/User';
import { Model as MovieModel } from '@/resources/database/models/Movie';
import { Model as UserModel } from '@/resources/database/models/User';
import { Types } from 'mongoose';

export async function getMovies() {
    await Database.setUpClient(process.env.MONGODB_URI);

    const movies = await MovieModel.find({});

    return movies;
}

export async function createMovie(movie: Movie) {
    
    const {id, movieName, description, casts, rating, category} = movie;

    if( !id 
        || !movieName 
        || !description 
        || !casts 
        || !rating 
        || !category) {
            throw {
                code: 400,
                message: 'Invalid movie data'
            };
    }

    await Database.setUpClient(process.env.MONGODB_URI);
    const movieDocument = new UserModel<Movie>(movie);
    return movieDocument.save()
} 
