import { MongoClient } from 'mongodb'

// This is the connection string
const uri = process.env.MONGODB_URI

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// check if there is a connection string in the env file if not throw an error
if(!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env file")
}


if(process.env.NODE_ENV === "development") {
    // this will use global variable if you are in a development setting
    if(!global._mongoclientPromise) {
        client = new MongoClient(uri)
        global._mongoclientPromise = client.connect()
    }
    clientPromise = global._mongoCLientPromise
} else {
    // this will handle the production mode and not use global variable
    client = new MongoClient(uri)
    clientPromise = client.connect()
}

export default clientPromise;