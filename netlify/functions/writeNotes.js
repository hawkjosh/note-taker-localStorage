import Database from '../database.js'
import { v4 as uuidv4 } from 'uuid'

export const handler = async (event, _context) => {
	const db = Database()

	const { title, text } = JSON.parse(event.body)
	const noteId = uuidv4()

	const newNote = {
		id: noteId,
		title: title,
		text: text,
	}

	await db.read()

	db.data.notes.push({
		...newNote,
	})

	await db.write()

	return {
		statusCode: 200,
		body: JSON.stringify(`New note created -> ID: ${newNote.id}`),
	}
}
