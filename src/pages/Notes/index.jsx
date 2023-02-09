import React, { Fragment, useState } from 'react'
import { Link } from 'wouter'
import uid from '../../utils/uniqueId.js'

import Icon from '../../components/icons/index.jsx'

import {
	cActionsPanel,
	cHeaderContainer,
	cNavbarTitle,
	cNavbarTitleContainer,
	cNavbarTitlePanel,
	cNavActionIconsContainer,
	cNotesPageWrapper,
	cNotesListContainer,
	cNotesListItem,
	cNoteViewContainer,
	cNoteTitle,
	cNoteText,
	cViewOnly,
	cFooterContainer,
	cDisclaimer,
	cNotesListActionIcons,
	cHideIcon,
	cDeleteIcon,
	cSaveIcon,
	cEditIcon,
	cBackIcon,
} from './index.module.css'

export default () => {
	const [title, setTitle] = useState('')
	const [titleUpdate, setTitleUpdate] = useState()
	const [text, setText] = useState('')
	const [textUpdate, setTextUpdate] = useState()
	const [selectedNote, setSelectedNote] = useState({})
	const [updateSelectedNote, setUpdateSelectedNote] = useState({})
	const [notes, setNotes] = useState(
		JSON.parse(localStorage.getItem('notes')) || []
	)

	const resetNote = () => {
		setTitle('')
		setText('')
		setSelectedNote({})
		setUpdateSelectedNote({})
	}

	const handleNoteClickActive = (note) => {
		setSelectedNote(note)
	}

	const handleNoteClickInactive = () => {
		setSelectedNote({})
		setUpdateSelectedNote({})
		setTitleUpdate(selectedNote.title)
		setTextUpdate(selectedNote.text)
	}

	const handleUpdateNoteClick = (note) => {
		setUpdateSelectedNote(note)
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
		<>
			<header className={cHeaderContainer}>
				<nav className={cNavbarTitlePanel}>
					<Link
						className={cNavbarTitleContainer}
						href='/'>
						<Icon
							name='leftPencil'
							width='50px'
						/>
						<div className={cNavbarTitle}>Note Taker</div>
					</Link>
					<div className={cActionsPanel}>
						<div className={cNavActionIconsContainer}>
							{updateSelectedNote.id ? (
								<Icon
									className={cSaveIcon}
									name='save'
									width='30px'
									onClick={updateNote}
								/>
							) : (
								<Icon
									className={
										!title.trim() || !text.trim()
											? `${cHideIcon}`
											: `${cSaveIcon}`
									}
									name='save'
									width='30px'
									onClick={saveNote}
								/>
							)}
						</div>
					</div>
				</nav>
			</header>

			<div className={cNotesPageWrapper}>
				<div className={cNotesListContainer}>
					<Fragment>
						{notes.map((note, index) => {
							return (
								<Fragment key={index}>
									<div className={cNotesListItem}>
										<h3
											data-status={
												note === selectedNote ? 'active' : 'inactive'
											}
											onClick={() => {
												handleNoteClickActive(note)
											}}>
											{note.title}
										</h3>
										{selectedNote.title && (
											<div className={cNotesListActionIcons}>
												<Icon
													className={
														note === selectedNote
															? `${cBackIcon}`
															: `${cHideIcon}`
													}
													name='back'
													width='1.75rem'
													onClick={handleNoteClickInactive}
												/>
												<Icon
													className={
														note === updateSelectedNote
															? `${cHideIcon}`
															: `${cEditIcon}`
													}
													name='edit'
													width='1.75rem'
													onClick={() => {
														handleUpdateNoteClick(note)
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
							)
						})}
					</Fragment>
				</div>
				<form className={cNoteViewContainer}>
					{updateSelectedNote.id ? (
						<Fragment>
							<input
								className={cNoteTitle}
								placeholder={selectedNote.title}
								maxLength='30'
								value={titleUpdate || selectedNote.title}
								onChange={(e) => setTitleUpdate(e.target.value)}
								type='text'
							/>
							<textarea
								className={cNoteText}
								placeholder={selectedNote.text}
								value={textUpdate || selectedNote.text}
								onChange={(e) => setTextUpdate(e.target.value)}
							/>
						</Fragment>
					) : (
						<Fragment>
							<input
								className={
									selectedNote.title
										? `${cNoteTitle} ${cViewOnly}`
										: `${cNoteTitle}`
								}
								placeholder='Note Title'
								maxLength='30'
								value={selectedNote.title ? selectedNote.title : title}
								onChange={(e) => setTitle(e.target.value)}
								type='text'
							/>
							<textarea
								className={
									selectedNote.text
										? `${cNoteText} ${cViewOnly}`
										: `${cNoteText}`
								}
								placeholder='Note text...'
								value={selectedNote.text ? selectedNote.text : text}
								onChange={(e) => setText(e.target.value)}
							/>
						</Fragment>
					)}
				</form>
			</div>

			<footer className={cFooterContainer}>
				<p className={cDisclaimer}>
					© {new Date().getFullYear()} Joshua Wilde Hawk. All Rights Reserved.
				</p>
			</footer>
		</>
	)
}
