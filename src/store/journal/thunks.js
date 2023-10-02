import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote } from './journalSlice';

export const StartNewNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		const newNote = {
			title: 'test note',
			body: 'empty note',
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
