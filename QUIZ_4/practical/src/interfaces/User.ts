import { ObjectId } from 'mongodb'
import Card from '@/interfaces/Cards'

export default interface User {
    id?: string | ObjectId;
    email: string;
    password: string;
    cards: Card[];
}