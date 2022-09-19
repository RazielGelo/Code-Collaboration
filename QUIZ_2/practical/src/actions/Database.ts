import { MongoClient } from "mongodb";

export async function setupDatabase() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try {
        console.log('[LOG] initialized new client');

        // database connection
        return client.connect();
    } catch(error) {
        console.log('[ERROR]', error);
        
        // ensures the client will always close
        await client.close();

        throw error;
    }
}