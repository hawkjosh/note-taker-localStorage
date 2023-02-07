import { Fragment } from 'react'
import { useGetNotes } from '../../cache/readNotes.jsx'
import Icon from '../../components/icons/index.jsx'

import {
	cNotesPageWrapper,
	cNotesListContainer,
	cNotesListItem,
	cNewNoteContainer,
	cNewNoteTitle,
	cNewNoteText,
} from './index.module.css'

export default () => {
	const [notes] = useGetNotes()

	return (
		<div className={cNotesPageWrapper}>
			<div className={cNotesListContainer}>
				<Fragment>
					{notes.map((note) => {
						return (
							<Fragment key={note.id}>
								<div className={cNotesListItem}>
									<h3>{note.title}</h3>
									<Icon
										name='trash'
										width='1.75rem'
										onClick={() => {console.log('clicked')}}
									/>
								</div>
							</Fragment>
						)
					})}
				</Fragment>
			</div>

			<div className={cNewNoteContainer}>
				<input
					id='note-title'
					className={cNewNoteTitle}
					placeholder='Note Title'
					maxLength='30'
					type='text'
				/>
				<textarea
					id='note-text'
					className={cNewNoteText}
					placeholder='Note Text'>
				</textarea>
			</div>
		</div>
	)
}
