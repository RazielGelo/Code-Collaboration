// Imports database
import Database from "@/resources/database";
// Imports user interface
import User from "@/interfaces/User";
// Imports user Schema/Model
import { Model as UserModel } from "@/resources/database/models/user";

/**
 * @description This function creates a user in the database
 * @param {User} user Accepts a user object
 * @returns The created user
 */
export async function createUser(user: User) {
    try {
        // Sets up the database
        await Database.setup();
        
        // Stores and creates a new user Model
        const userDoc = new UserModel<User>(user)
        
        // Saves the user in the database
        return userDoc.save();
    // Catches and throws error
    } catch (error: any) {
        throw new Error("Error creating a user", error);
    }
}