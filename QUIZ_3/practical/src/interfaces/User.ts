import { ObjectId } from 'mongodb';
import Movie from './Movie';

export default interface User {
    id?: string | ObjectId;
    username: string;
    password: string;
}