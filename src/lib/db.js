import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

// const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
// export async function connectToDatabase() {
// 	console.log('in the dummy connect database function');
// 	console.log(process.env);
// 	await sleep(1000);
// }

const MONGODB_URI = process.env['MONGODB_URI'];
const MONGODB_DB = process.env['MONGO_DB'];

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!MONGODB_DB) {
	throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
	cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			useNewUrlParser: true,
			useUnifiedTopology: true
		};

		cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
			return {
				client,
				db: client.db(MONGODB_DB)
			};
		});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}
