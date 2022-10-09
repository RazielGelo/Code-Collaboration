import NextAuth, { NextAuthOptions } from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import Database from '@/resources/database'
import { compare } from 'bcrypt'
import {Model as UserModel} from '@/resources/database/models/User'

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
                    email: {
                        label: 'Email',
                        type: 'text',
                        placeholder: ''
                    },
                    password: {
                        label: 'Password',
                        type: 'password'
                    }
                },
                async authorize(credentials, req) {

                    const { email, password } = credentials;
                    console.log(email, password)
                    // validation
                    if (!email || email.length < 8 || email.trim() !== email || !password || password.length < 8 || password.trim() !== password) {
                        throw {
                            code: 400,
                            message: 'invalid input'
                        };
                    }
                    

                    // lowercase the username for query
                    // const lowercasedEmail = email.toLowerCase();

                    // 2) wait for the db connection
                    await Database.setup(process.env.MONGODB_URI);
                    // 3) get the database
                    //const database = Database.mongooseClient.connection.db;

                    const user = await UserModel.findOne({ email })
                    console.log(user)
                    // // 4) access the user collection
                    // const userCollection = database.collection('users');
                    // // 5) check if a user exists with that username
                    // const user = await userCollection.findOne(
                    //     {
                    //         lowercasedEmail
                    //     }
                    // );

                    if (!user) {
                        throw new Error('no user exists in our system');
                    }

                    // 6) compare passwords!
                    // note: user.password is encrypted so cannot do an === compare
                    // const isValid = await compare(password, user.password);
                    // if (!isValid) {
                    //     throw new Error('unable to log in');
                    // }

                    console.log('user', JSON.stringify(user));
                    // 7) return valid user information (for session or token)
                    return {
                        id: user._id,
                        name: email,
                    };
                }
            }
        )
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, user, account }) {
            // console.log('JWT: token', JSON.stringify(token));
            // console.log('JWT: user', JSON.stringify(user));
            // console.log('JWT: account', JSON.stringify(account));
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token, user }) {
            // console.log('SESSSION: token', JSON.stringify(token));
            // console.log('SESSSION: user', JSON.stringify(user));
            if (token && token.user) {
                session.user = token.user;
            }
            return session;
        }
    }
};

export default NextAuth(authOptions);