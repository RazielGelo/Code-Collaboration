import { NextApiRequest, NextApiResponse } from 'next';
import { createMovie } from '@/actions/Movie';
import Movie from '@/interfaces/Movie';
import {getOneUser} from '@/actions/User';
import Database from '@/resources/database';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === 'POST') {
            const { movieName, description, casts, rating, category, filePath } = req.body
    
            if(!movieName 
                || !description
                || !casts
                || !rating
                || !category
                ) {
                    throw {
                        code: 400,
                        message: 'Invalid Movie Input'
                    }
                }
    
                await Database.setUpClient(process.env.MONGODB_URI);
                const database = Database.client.connection.db;
                const movieCollection = database.collection('Movie');
    
                const movie = await movieCollection.insertOne(
                    {
                        movieName,
                        description,
                        casts, 
                        rating, 
                        category,
                        filePath
                    }
                )
    
                res.status(200).json(
                {
                    message:'successful'
                }
            )
        } else {
            throw {
                code: 401,
                message: "Method not supported"
            }
        }

    } catch(error) {
        const { code = 500, message } = error;
        res.status(code).json(
            {
                code,
                data: {
                    message
                }
            }
        );
    }
}