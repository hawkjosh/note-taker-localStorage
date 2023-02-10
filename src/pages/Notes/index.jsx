import React, { Fragment, useState } from 'react'
import { Link } from 'wouter'
import uid from '../../utils/uniqueId.js'

import CustomInput from '../../components/CustomInput/index.jsx'
import CustomTextarea from '../../components/CustomTextarea/index.jsx'

import Icon from '../../components/icons/index.jsx'
import PencilIcon from '../../components/PencilIcon/index.jsx'

import {
	cHeaderContainer,
	cNavbarTitleContainer,
	cNavbarTitle,
	cNotesPageWrapper,
	cNotesListContainer,
	cNotesListItem,
	cNotesListItemTitle,
	cNotesListActionIcons,
	cNoteViewContainer,
	cNoteTitleWrapper,
	cNoteTitle,
	cNoteText,
	cViewOnly,
	cBackIcon,
	cSaveIcon,
	cEditIcon,
	cDeleteIcon,
	cSaveNew,
	cHideIcon,
} from './index.module.css'

export default () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [selectedNote, setSelectedNote] = useState({})
	const [titleUpdate, setTitleUpdate] = useState()
	const [textUpdate, setTextUpdate] = useState()
	const [updateSelectedNote, setUpdateSelectedNote] = useState({})
	const [notes, setNotes] = useState(
		JSON.parse(localStorage.getItem('notes')) || []
	)

	const resetNote = () => {
		setTitle('')
		setText('')
		setTitleUpdate('')
		setTextUpdate('')
		setSelectedNote({})
		setUpdateSelectedNote({})
	}

	const handleNoteSelectActive = (note) => {
		resetNote()
		setSelectedNote(note)
	}

	const handleNoteSelectInactive = () => {
		resetNote()
		setTitleUpdate(selectedNote.title)
		setTextUpdate(selectedNote.text)
	}

	const handleUpdateNoteActive = (note) => {
		setUpdateSelectedNote(note)
	}

	const handleUpdateNoteInactive = () => {
		resetNote()
		setTitleUpdate(selectedNote.title)
		setTextUpdate(selectedNote.text)
	}

	const saveNote = () => {
		const newNote = {
			id: uid(),
			title: title,
			text: text,
		}

		setNotes([...notes, newNote])

		localStorage.setItem('notes', JSON.stringify([...notes, newNote]))

		resetNote()
	}

	const deleteNote = (noteId) => {
		const updatedNotes = notes.filter((note) => note.id !== noteId)

		setNotes(updatedNotes)

		localStorage.setItem('notes', JSON.stringify(updatedNotes))

		resetNote()
	}

	const updateNote = () => {
		const updatedNote = {
			id: selectedNote.id,
			title: titleUpdate ? titleUpdate : selectedNote.title,
			text: textUpdate ? textUpdate : selectedNote.text,
		}

		const updatedNotes = notes.map((note) => {
			if (note.id === updatedNote.id) {
				return updatedNote
			}
			return note
		})

		setNotes(updatedNotes)

		localStorage.setItem('notes', JSON.stringify(updatedNotes))

		resetNote()
	}

	return (
		<Fragment>
			<header className={cHeaderContainer}>
				<Link
					className={cNavbarTitleContainer}
					href='/'>
					<PencilIcon iconSize='60px' />
					<div className={cNavbarTitle}>Note Taker</div>
				</Link>
			</header>

			<div className={cNotesPageWrapper}>
				<div className={cNotesListContainer}>
					{notes.map((note, index) => (
						<Fragment key={index}>
							<div className={cNotesListItem}>
								<div
									className={cNotesListItemTitle}
									data-status={note === selectedNote ? 'active' : 'inactive'}
									onClick={() => {
										handleNoteSelectActive(note)
									}}>
									{note.title}
								</div>
								{selectedNote.title && (
									<div className={cNotesListActionIcons}>
										<Icon
											className={
												note === selectedNote && note !== updateSelectedNote
													? `${cBackIcon}`
													: `${cHideIcon}`
											}
											name='back'
											width='1.75rem'
											onClick={handleNoteSelectInactive}
										/>
										<Icon
											className={
												note === updateSelectedNote
													? `${cBackIcon}`
													: `${cHideIcon}`
											}
											name='back'
											width='1.75rem'
											onClick={handleUpdateNoteInactive}
										/>
										<Icon
											className={
												note === updateSelectedNote
													? `${cSaveIcon}`
													: `${cHideIcon}`
											}
											name='save'
											width='30px'
											onClick={updateNote}
										/>
										<Icon
											className={
												note === selectedNote && note !== updateSelectedNote
													? `${cEditIcon}`
													: `${cHideIcon}`
											}
											name='edit'
											width='1.75rem'
											onClick={() => {
												handleUpdateNoteActive(note)
											}}
										/>
										<Icon
											className={
												note === selectedNote
													? `${cDeleteIcon}`
													: `${cHideIcon}`
											}
											name='trash'
											width='1.75rem'
											onClick={() => {
												deleteNote(note.id)
											}}
										/>
									</div>
								)}
							</div>
						</Fragment>
					))}
				</div>
				<div className={cNoteViewContainer}>
					{updateSelectedNote.id ? (
						<Fragment>
							<CustomInput
								className={cNoteTitle}
								type='text'
								value={titleUpdate ? titleUpdate : selectedNote.title}
								onChange={(e) => setTitleUpdate(e.target.value)}
								placeholder={selectedNote.title}
							/>
							<CustomTextarea
								className={cNoteText}
								value={textUpdate ? textUpdate : selectedNote.text}
								onChange={(e) => setTextUpdate(e.target.value)}
								placeholder={selectedNote.text}
							/>
						</Fragment>
					) : (
						<Fragment>
							<div className={cNoteTitleWrapper}>
								<CustomInput
									className={
										selectedNote.title
											? `${cNoteTitle} ${cViewOnly}`
											: `${cNoteTitle}`
									}
									type='text'
									value={selectedNote.title ? selectedNote.title : title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder='Note Title'
								/>
								<Icon
									className={
										!title.trim() || !text.trim()
											? `${cHideIcon}`
											: `${cSaveIcon} ${cSaveNew}`
									}
									name='save'
									width='30px'
									onClick={saveNote}
								/>
							</div>
							<CustomTextarea
								className={
									selectedNote.text
										? `${cNoteText} ${cViewOnly}`
										: `${cNoteText}`
								}
								value={selectedNote.text ? selectedNote.text : text}
								onChange={(e) => setText(e.target.value)}
								placeholder='Note text...'
							/>
						</Fragment>
					)}
				</div>
			</div>
		</Fragment>
	)
}
