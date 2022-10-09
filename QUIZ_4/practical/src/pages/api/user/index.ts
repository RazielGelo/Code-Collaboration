import { createUser, getUsers } from '@/actions/User'
import User from '@/interfaces/User'
import { NextApiRequest, NextApiResponse} from 'next'
import { Model as UserModel } from '@/resources/database/models/User'
import { hash } from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        const users = await getUsers();

        res.status(200).json({
            data: users,
            code: 200
        })
    } else if(req.method === 'POST') {
        
        const {email, password, cards} = req.body as User

        if (!email || email.length < 8 || email.trim() !== email || !password || password.length < 8 || password.trim() !== password) {
            throw {
                code: 400,
                message: 'invalid input'
            };
        }

        const existingUser = await UserModel.findOne({email})

        if(existingUser) {
            throw {
                code: 400,
                message: 'username already exist'
            }
        }

        const hashedPasword = await hash(password,10)

        const user : User = {
            email,
            password: hashedPasword,
            cards
        }

        const doc = await createUser(user)

        user.id = doc.id

        res.status(200).json({
            data: {
                user
            }, code: 200
        })
    } else {
        res.status(404).json({
            data: [],
            code: 400
        })
    }
}