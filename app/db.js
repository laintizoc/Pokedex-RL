import { MongoClient } from 'mongodb';

let client;
let db;

function getDb() {
	if (!db) {
		client = new MongoClient(process.env.MONGODB_URI);
		db = client.db(process.env.MONGODB_DB_NAME || 'pokedex');
	}
	return db;
}

export default new Proxy({}, {
	get(_, prop) {
		return getDb()[prop];
	}
});
