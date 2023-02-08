import Database from '../database.js'

export const handler = async (event, _context) => {
	const db = Database()

	const noteId = JSON.parse(event.body)

	await db.read()

	for (let i = 0; i < db.data.notes.length; i++) {
		if (db.data.notes[i].id === noteId) {
			db.data.notes.splice(i, 1)
		}
	}

	await db.write()

	return {
		statusCode: 200,
		body: JSON.stringify(`Note deleted -> ID: ${noteId}`),
	}
}
