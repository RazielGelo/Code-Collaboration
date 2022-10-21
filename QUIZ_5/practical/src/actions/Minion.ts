// Imports database
import Database from "@/resources/database";
// Imports minion interface
import Minion from "@/interfaces/Minion";
// Imports user Schema/Model
import { Model as MinionModel } from "@/resources/database/models/minion";

/**
 * @description This function creates a minion in the database
 * @param {Minion} minion Accepts a minion object
 * @returns The created minion
 */
export async function createMinion(minion: Minion) {
    try { 
        // Sets up the database
        await Database.setup();
        // Stores and creates a new user Model
        const minionDoc = new MinionModel<Minion>(minion)
        // Saves the user in the database
        return minionDoc.save();
    // Catches and throws error
    } catch(error: any) {
        throw new Error("Error creating a minion")
    }
}