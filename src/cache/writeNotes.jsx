import { useEffect, useReducer, useContext, createContext } from 'react'

const refreshActionType = 'notesRefreshed'

const refreshAction = (dispatch) =>
	fetch('/api/writeNotes')
		.then((response) => response.json())
		.then((payload) => dispatch({ type: refreshActionType, payload }))

const NotesContext = createContext([])

export default ({ children }) => {
	const [notes, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case refreshActionType:
				return action.payload

			default:
				return state
		}
	}, [])

	useEffect(() => void refreshAction(dispatch), [])

	return (
		<NotesContext.Provider value={[notes, dispatch]}>
			{children}
		</NotesContext.Provider>
	)
}

export const usePostNotes = () => {
	const [notes, dispatch] = useContext(NotesContext)

	return [notes, { refresh: () => refreshAction(dispatch) }]
}
