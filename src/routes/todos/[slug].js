import { connectToDatabase } from '$lib/db';
import { ObjectId } from 'mongodb';
export async function get(request) {
	try {
		const id = request.params.slug;
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = db.collection('todos');
		const todo = await collection.findOne({ _id: ObjectId(id) });

		return {
			status: 200,
			body: {
				todo: todo
			}
		};
	} catch {
		return {
			status: 500,
			body: {
				error: 'A server error occured fetching a single item'
			}
		};
	}
}
