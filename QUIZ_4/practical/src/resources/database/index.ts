import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

export default class Database {
    static mongooseClient: typeof mongoose;
    static mongoClientPromise: Promise<MongoClient>;


    static async setup(uri: string = process.env.MONGODB_URI!) {
        if (!this.mongooseClient) {
            this.mongooseClient = await mongoose.connect(uri);
        }
        return this.mongooseClient;
    }

    static async setupAdapterConnection(uri: string= process.env.MONGODB_URI!): Promise<MongoClient> {
        if (!this.mongoClientPromise) {
            this.mongoClientPromise = MongoClient.connect(uri);
        }
        
        return this.mongoClientPromise;
    }

    static async getMongoClientPromise(uri: string): Promise<MongoClient> {
        await this.setup(uri);

        return this.mongooseClient.connection.getClient();
    }
}