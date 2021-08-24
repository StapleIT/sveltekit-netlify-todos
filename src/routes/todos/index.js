import { connectToDatabase } from '$lib/db';
import { ObjectId } from 'mongodb';
export async function get(request) {
	try {
		const completed = request.query.get('completed') === 'true' ? true : false;
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = db.collection('todos');
		const todos = await collection.find({ completed }).toArray();

		return {
			status: 200,
			body: {
				todos: todos
			}
		};
	} catch {
		return {
			status: 500,
			body: {
				error: 'A server error occured when fetching data'
			}
		};
	}
}
export async function post(request) {
	try {
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = db.collection('todos');
		const todo = JSON.parse(request.body);
		await collection.insertOne(todo);
		return {
			status: 200,
			body: {
				status: 'success'
			}
		};
	} catch {
		return {
			status: 500,
			body: {
				error: 'A server error occured when posting'
			}
		};
	}
}
export async function put(request) {
	try {
		const dbConnection = await connectToDatabase();
		const db = dbConnection.db;
		const collection = db.collection('todos');
		const todo = JSON.parse(request.body);
		const filter = { _id: ObjectId(todo._id) };
		await collection.updateOne(filter, { $set: { completed: todo.completed } });
		return {
			status: 200,
			body: {
				status: 'success'
			}
		};
	} catch {
		return {
			status: 500,
			body: {
				error: 'A server error occured when updating'
			}
		};
	}
}
export async function del(request) {
	return {
		status: 200,
		body: {
			todo: 'Todo'
		}
	};
}
