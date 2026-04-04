import { MongoClient } from 'mongodb';
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.MONGODB_DB_NAME || 'pokedex');

export default db;
