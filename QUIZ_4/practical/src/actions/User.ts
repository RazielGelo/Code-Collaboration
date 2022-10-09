import Database from '@/resources/database'
import User from '@/interfaces/User'
import {Model as UserModel} from '@/resources/database/models/User'


export async function getUsers() {
    await Database.setup(process.env.MONGODB_URI)

    const users = await UserModel.find({})

    return users
}

export async function createUser(user: User) {
    const {id, email, password} = user;

    await Database.setup(process.env.MONGODB_URI)

    const userDoc = new UserModel<User>(user)

    return userDoc.save();
}