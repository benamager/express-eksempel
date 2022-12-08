import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config()

// Connection URI
const uri = process.env.MONGODB_URI;
// Create a new MongoClient
const client = new MongoClient(uri);

async function useDB(dbName, collectionName) {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName); // get db
  const collection = db.collection(collectionName); // get collection of that db
  return { collection, client };
}

export default useDB