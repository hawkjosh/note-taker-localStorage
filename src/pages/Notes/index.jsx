import React, { Fragment, useEffect, useState } from 'react'
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
	cNewNoteContainer,
	cNewNoteTitle,
	cNewNoteText,
	cFooterContainer,
	cDisclaimer,
	cNotesListActionIcons,
	cHideIcon,
	cDeleteIcon,
	cSaveIcon,
	cEditIcon,
	cAddIcon,
} from './index.module.css'

export default () => {
	const [title, setTitle] = useState('')
	const [titleUpdate, setTitleUpdate] = useState()
	const [text, setText] = useState('')
	const [textUpdate, setTextUpdate] = useState()
	const [notes, setNotes] = useState(
		JSON.parse(localStorage.getItem('notes')) || []
	)
	const [selectedNote, setSelectedNote] = useState({})

	const resetNote = () => {
		setTitle('')
		setText('')
		setSelectedNote({})
	}

	const handleNoteClick = (note) => {
		setSelectedNote(note)
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

	const updateNote = (updatedNote) => {
		const updatedNotes = notes.map((note) => {
			if (note.id === updatedNote.id) {
				return updatedNote
			}
			return note
		})

		setNotes(updatedNotes)

		localStorage.setItem('notes', JSON.stringify(updatedNotes))
	}

	return (
		<>
			<header className={cHeaderContainer}>
				<nav className={cNavbarTitlePanel}>
					<div className={cNavbarTitleContainer}>
						<Icon
							name='leftPencil'
							width='50px'
						/>
						<Link
							className={cNavbarTitle}
							href='/'>
							Note Taker
						</Link>
					</div>
					<div className={cActionsPanel}>
						<div className={cNavActionIconsContainer}>
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
							<Icon
								className={cAddIcon}
								name='add'
								width='30px'
								onClick={resetNote}
							/>
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
												handleNoteClick(note)
											}}>
											{note.title}
										</h3>
										<div className={cNotesListActionIcons}>
											<Icon
												className={
													note === selectedNote
														? `${cEditIcon}`
														: `${cHideIcon}`
												}
												name='edit'
												width='1.75rem'
												onClick={() => {
													updateNote(note.id)
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
						value={selectedNote.title ? selectedNote.title : title}
						onChange={(e) => setTitle(e.target.value)}
						type='text'
					/>
					<textarea
						id='note-text'
						className={cNewNoteText}
						placeholder='Note Text'
						value={selectedNote.text ? selectedNote.text : text}
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
			</div>

			<footer className={cFooterContainer}>
				<p className={cDisclaimer}>
					© {new Date().getFullYear()} Joshua Wilde Hawk. All Rights Reserved.
				</p>
			</footer>
		</>
	)
}
