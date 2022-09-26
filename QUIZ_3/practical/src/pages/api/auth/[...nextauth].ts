
import NextAuth, { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import Database from '@/resources/database';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    adapter: MongoDBAdapter(Database.getMongoClientPromise(process.env.MONGODB_URI)),

    providers: [
        CredentialsProvider(
            {
                name: 'Email & Password',
                credentials: {
                    username: {
                        label: 'Username',
                        type: 'text',
                        placeholder: ''
                    },
                    password: {
                        label: 'Password',
                        type: 'password'
                    }
                },
                async authorize(credentials) {
                    const { username, password } = credentials;

                    if (!username || username.length < 8 || username.trim() !== username || !password || password.length < 8 || password.trim() !== password) {
                        throw {
                            code: 400,
                            message: 'invalid input'
                        };
                    }

                    await Database.setUpClient(process.env.MONGODB_URI);
                    const database = Database.client.connection.db;

                    const userCollection = database.collection('User');
                    const user = await userCollection.findOne(
                        {
                            username
                        }
                    );

                    if (!user) {
                        throw new Error('no user exists in our system');
                    }

                    const isValid = await compare(password, user.password);
                    if (!isValid) {
                        throw new Error('unable to log in');
                    }

                    console.log('user', JSON.stringify(user));

                    return {
                        id: user._id,
                        name: username
                    };
                }
            }
        )
    ]
};

export default NextAuth(authOptions);