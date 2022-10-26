import { createUser } from "@/actions/User";
import User from "@/interfaces/User";
import { NextApiRequest, NextApiResponse } from "next";
import { Model as UserModel } from "@/resources/database/models/user";
import { hash } from "bcrypt";
import Database from "@/resources/database";

/**
 * @description This function handles the request for user
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Checks if the request method is POST
        if(req.method === "POST") {

            // Gets the email and password from the request
            let { email, password } = req.body as User
            
            // Simple Validation for email and password
            // email and pass is required and must be minimum of 8 characters
            // if (!email || email.length < 8 || email.trim() !== email || !password || password.length < 8 || password.trim() !== password) {
            //     throw {
            //         code: 400,
            //         message: 'invalid input'
            //     };
            // }
            // Sets up the database
            await Database.setup();
            // Checks and stores if the email already exist in the database
            const existingUser = await UserModel.findOne({email})
            
            // If the email already exist throw an error
            if(existingUser) {
                throw {
                    code: 400,
                    message: "Email already exist."
                }
            }
            // This will ensure uniformity and that all email is in lowercase
            email = email.toLowerCase();

            // Stores the hashed password using bcrypt
            const hashedPassword = await hash(password, 10);

            // User Object that will be ready to be inserted in the database
            const user: User = {
                email,
                password: hashedPassword
            }
            // Stores and Creates the user using the createUser function
            const userDoc = await createUser(user);
            
            // Return code 200 and the user created
            res.status(200).json({
                code: 200,
                userDoc
            })
        // If there is an error givces code 404 and error message
        } else {
            res.status(404).json({
                code: 404,
                message: "Error creating a user"
            })
        }
    // Catches and throws the error
    } catch (error: any) {
        throw new Error("Error", error)
    }

}