import NextAuth, { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import Database from "@/resources/database";
import {Model as UserModel} from "@/resources/database/models/user";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
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
                    // Get the email and password from credentials
                    const { email, password } = credentials;

                    // Simple Validation for email and password
                    // email and pass is required and must be minimum of 8 characters
                    if (!email || email.length < 8 || email.trim() !== email || !password || password.length < 8 || password.trim() !== password) {
                        throw {
                            code: 400,
                            message: 'invalid input of email or password'
                        };
                    }
                    // Sets up the database
                    await Database.setup();

                    // Checks and store the database if the user already exist
                    const user = await UserModel.findOne({ email })

                    // If user is null redirect to signup
                    if (!user) {
                        return '/signup';
                    }
                    // Checks if the your password matches hashed password in the database
                    const isValidPassword = await compare(password, user.password);

                    // Checks if it doesn't match the password and throws an error
                    if (!isValidPassword) {
                        throw new Error('unable to log in');
                    }
                    // Returns the user id and email
                    return {
                        id: user._id,
                        email: email,
                    };
                }
            }
        )
    ],
    // Custom page for login
    pages: {
        signIn: "/login"
    },
    callbacks: {
        // Returns the token
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        // Returns the session
        async session({ session, token }) {
            if (token && token.user) {
                session.user = token.user;
            }
            return session;
        }
    }
}

export default NextAuth(authOptions);