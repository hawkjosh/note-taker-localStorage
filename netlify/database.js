import { resolve } from 'path'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

export default () => {
	const filePath = resolve('netlify', 'data', 'db.json')
	const adapter = new JSONFile(filePath)
	return new Low(adapter)
}
