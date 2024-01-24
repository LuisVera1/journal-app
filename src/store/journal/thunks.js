import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase/config';
import {
	addNewEmptyNote,
	deleteNoteById,
	savingNewNote,
	setActiveNote,
	setNotes,
	setPhotosToActiveNote,
	setSaving,
	updateNote,
} from './journalSlice';
import { loadNotes } from '../../helpers/loadNotes';
import { fileUpload } from '../../helpers/fileUpload';

export const StartNewNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		const newNote = {
			title: 'test note',
			body: 'empty note',
			imageUrls: [],
			date: new Date().getTime(),
		};

		const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
		await setDoc(newDoc, newNote);
		newNote.id = newDoc.id;

		//saving new note: true
		dispatch(savingNewNote());

		//add new note to Firestore
		dispatch(addNewEmptyNote(newNote));

		//Set active note
		dispatch(setActiveNote(newNote));
	};
};

export const startLoadingNotes = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		if (!uid) throw new Error('El UID del usiario no existe');

		const notes = await loadNotes(uid);

		dispatch(setNotes(notes));
	};
};

export const startSavingNote = () => {
	return async (dispatch, getState) => {
		dispatch(setSaving());

		const { uid } = getState().auth;
		const { active: activeNote } = getState().journal;

		const noteToSave = { ...activeNote };
		delete noteToSave.id;

		//update in firebase
		const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
		await setDoc(docRef, noteToSave, { merge: true });

		//update in store
		const { notes } = getState().journal;

		const newStore = notes.map((note) => {
			if (note.id === activeNote.id) {
				return activeNote;
			}

			return note;
		});

		dispatch(updateNote(newStore));
	};
};

export const startUploadingFiles = (files = []) => {
	return async (dispatch) => {
		dispatch(setSaving());

		const fileUploadPromises = [];
		for (const file of files) {
			fileUploadPromises.push(fileUpload(file));
		}

		const photosUrl = await Promise.all(fileUploadPromises);

		dispatch(setPhotosToActiveNote(photosUrl));
	};
};

export const startDeletingNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const { active: activeNote } = getState().journal;

		const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
		await deleteDoc(docRef);

		dispatch(deleteNoteById(activeNote.id));
	};
};
