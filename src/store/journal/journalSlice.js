import { createSlice } from '@reduxjs/toolkit';
import { loadNotes } from '../../helpers/loadNotes';

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
		},
		setNotes: (state, action) => {
			state.notes = action.payload;
		},
		setSaving: (state, action) => {},
		updateNote: (state, action) => {},
		deleteNoteById: (state, action) => {},
	},
});

export const { savingNewNote, addNewEmptyNote, setNotes, setSaving, updateNote, deleteNoteById, setActiveNote } =
	journalSlice.actions;
