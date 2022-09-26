import mongoose from 'mongoose';
import Movie from './Movie';

export interface MovieArray {
    id?: string;
    userId: string | mongoose.Types.ObjectId;
    movie: Movie[];
}