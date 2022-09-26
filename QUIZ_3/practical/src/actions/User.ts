import Database from '@/resources/database';
import User from '@/interfaces/User';
import { Model as UserModel } from '@/resources/database/models/User';
import { Types } from 'mongoose';

export async function getUsers() {
    await Database.setUpClient(process.env.MONGODB_URI);

    const users = await UserModel.find({});

    return users;
}

export async function createUser(user: User) {
    const {id, username, password } = user;

    if(!username || username.length < 8 || !password || password.length < 8 || !id) {
        throw {
            code: 400,
            message: 'Invalid user data'
        };
    }

    await Database.setUpClient(process.env.MONGODB_URI);
    const existingUser = await UserModel.findOne({ username });
    if(existingUser) {
        throw {
            code: 400,
            message: 'Username already exists'
        }
    }
    const userDocument = new UserModel<User>(user);
    //const userId = user.id.toString();
    // await createMovieArray(userId);

    return userDocument.save()
}

export async function getOneUser(userId: Types.ObjectId | string) {
    await Database.setUpClient(process.env.MONGODB_URI);

    const user = await UserModel.findById({_id: userId});

    return user;
}