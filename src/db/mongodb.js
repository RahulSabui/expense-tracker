import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://sabuirahul90:g3xveWZcg6vbZkvX@cluster0.icbc7ew.mongodb.net/';
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
