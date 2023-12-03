import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
	name: 'journal',
	initialState: {
		isSaving: false,
		messageSaved: '',
		notes: [],
		active: null,
		// active: {
		//   id: '123',
		//   title: '',
		//   body: '',
		//   date: 1234567,
		//   imageUrls: ['','']
		// }
	},
	reducers: {
		savingNewNote: (state) => {
			state.isSaving = true;
		},
		addNewEmptyNote: (state, action) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},
		setActiveNote: (state, action) => {
			state.active = action.payload;
			state.messageSaved = '';
		},
		setNotes: (state, action) => {
			state.notes = action.payload;
		},
		setSaving: (state, action) => {
			state.isSaving = true;
			state.messageSaved = '';
		},
		updateNote: (state, action) => {
			state.isSaving = false;
			state.notes = action.payload;
			state.messageSaved = `${action.payload.title}, actualizada correctamente`
		},
		deleteNoteById: (state, action) => {},
	},
});

export const {
	savingNewNote,
	addNewEmptyNote,
	setNotes,
	setSaving,
	updateNote,
	deleteNoteById,
	setActiveNote,
} = journalSlice.actions;
