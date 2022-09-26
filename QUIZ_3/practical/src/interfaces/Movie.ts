import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export default interface Movie {
    id?: string | ObjectId;
    userId: string | mongoose.Types.ObjectId;
    movieName: string;
    description: string;
    casts: string;
    rating: number;
    category: string;
    filePath: {
        type: string,
        required: false
    }
}