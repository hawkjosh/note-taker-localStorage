import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'wouter'

import Icon from '../../components/icons/index.jsx'

import {
	cActionsPanel,
	cHeaderContainer,
	cNavbarTitle,
	cNavbarTitleContainer,
	cNavbarTitlePanel,
	cNavActionIconsContainer,
	cNavActionIcons,
	cSaveNote,
	cNotesPageWrapper,
	cNotesListContainer,
	cNotesListItem,
	cNewNoteContainer,
	cNewNoteTitle,
	cNewNoteText,
	cFooterContainer,
	cDisclaimer,
} from './index.module.css'

export default () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [data, setData] = useState([])
	const [selectedNote, setSelectedNote] = useState({})

	useEffect(() => {
		const readNotes = async () => {
			const response = await fetch('/api/readNotes')
			const newData = await response.json()
			setData(newData)
		}
		readNotes()
	}, [])

	const handleNoteClick = (note) => {
		setSelectedNote(note)
	}

	const addNote = () => {
		setSelectedNote({})
		setTitle('')
		setText('')
	}

	const saveNote = (newNote) =>
		fetch(`/api/writeNotes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newNote),
		}).then(async () => {
			const response = await fetch('/api/readNotes')
			const updatedData = await response.json()
			setData(updatedData)
		})

	const handleSaveNote = () => {
		const newNote = {
			title: title,
			text: text,
		}
		saveNote(newNote)
		setSelectedNote({})
		setTitle('')
		setText('')
	}

	const deleteNote = (noteId) =>
		fetch(`/api/deleteNotes/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(noteId),
		}).then(async () => {
			const response = await fetch('/api/readNotes')
			const updatedData = await response.json()
			setData(updatedData)
		}, setSelectedNote({}))

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
										? `${cSaveNote}`
										: `${cNavActionIcons}`
								}
								name='save'
								width='30px'
								onClick={handleSaveNote}
							/>
							<Icon
								className={cNavActionIcons}
								name='plus'
								width='30px'
								onClick={addNote}
							/>
						</div>
					</div>
				</nav>
			</header>

			<div className={cNotesPageWrapper}>
				<div className={cNotesListContainer}>
					<Fragment>
						{data.map((item, index) => {
							return (
								<Fragment key={index}>
									<div className={cNotesListItem}>
										<h3
											data-status={
												item === selectedNote ? 'active' : 'inactive'
											}
											onClick={() => {
												handleNoteClick(item)
											}}>
											{item.title}
										</h3>
										<Icon
											name='trash'
											width='1.75rem'
											onClick={() => {
												deleteNote(item.id)
											}}
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
						value={selectedNote.title ? selectedNote.title : title}
						onChange={(e) => setTitle(e.target.value)}
						type='text'
					/>
					<textarea
						id='note-text'
						className={cNewNoteText}
						placeholder='Note Text'
						value={selectedNote.title ? selectedNote.text : text}
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
