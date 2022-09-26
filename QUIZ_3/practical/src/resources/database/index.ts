import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

export default class Database {

    static client: typeof mongoose;

    static async setup(uri: string) {
        if(!this.client) {
            await this.setUpClient(uri);
        }

        return this.client;
    }

    static async setUpClient(uri: string) {

        const client = await mongoose.connect(uri);

        this.client = client;
    }

    static async getMongoClientPromise(uri: string): Promise<MongoClient> {
        await this.setUpClient(uri);

        return this.client.connection.getClient();
    }
}