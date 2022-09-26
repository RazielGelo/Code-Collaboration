import { MongoClient } from 'mongodb';

export async function setUpDatabase() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try {
        console.log('[LOG] Initialized the new client');

        return client.connect();
    } catch(error) {
        console.log('[ERROR]', error);

        await client.close();

        throw error;
    }
}