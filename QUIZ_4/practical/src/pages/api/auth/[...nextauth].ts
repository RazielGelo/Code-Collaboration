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
                    

                    await Database.setup(process.env.MONGODB_URI);


                    const user = await UserModel.findOne({ email })


                    if (!user) {
                        throw new Error('no user exists in our system');
                    }


                    // const isValid = await compare(password, user.password);
                    // if (!isValid) {
                    //     throw new Error('unable to log in');
                    // }

                    // console.log(isValid)

                    console.log('user', JSON.stringify(user));

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
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token, user }) {
            if (token && token.user) {
                session.user = token.user;
            }
            return session;
        }
    }
};

export default NextAuth(authOptions);