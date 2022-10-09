import { createUser, getUsers } from '@/actions/User'
import User from '@/interfaces/User'
import { NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        const users = await getUsers();

        res.status(200).json({
            data: users,
            code: 200
        })
    } else if(req.method === 'POST') {
        
        const user = req.body as User

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