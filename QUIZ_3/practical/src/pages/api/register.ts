import Database from '@/resources/database';
import { ResponseType } from '@/interfaces/Next';
import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
    id: string;
}

interface ResponseErrorData {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType<ResponseData | ResponseErrorData>>) {
    try{
        if(req.method === 'POST') {
            const {username, password}: {username: string, password: string} = req.body

            if (!username || username.length < 8 || username.trim() !== username || !password || password.length < 8 || password.trim() !== password) {
                throw {
                    code: 400,
                    message: 'invalid input'
                };
            }

            await Database.setUpClient(process.env.MONGODB_URI);

            const database = Database.client.connection.db;

            const userCollection = database.collection('User');

            const existingUser = await userCollection.findOne(
                {
                    username
                }
            )

            if(existingUser) {
                throw {
                    code: 400,
                    message: 'Username already exist'
                };
            }

            const hashedPassword = await hash(password, 10);

            const user = await userCollection.insertOne(
                {
                    username,
                    password: hashedPassword
                }
            )

            res.status(201).json(
                {
                    code: 201,
                    data: {
                        id: user.insertedId.toString()
                    }
                }
            )
        } else {
            throw {
                code: 401,
                message: `${req.method} method not supported`
            }
        }
    }catch(error) {
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