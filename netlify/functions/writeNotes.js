import Database from '../database.js'
import uid from '../uniqueId.js'

export const handler = async (_event, _context) => {
	const db = Database()

  const noteData = {
    id: uid(),
    title,
    text
  }

  db.data.notes.push({
    ...noteData
  })

	await db.write()

	return {
		statusCode: 200,
		body: JSON.stringify(noteData),
	}
}
