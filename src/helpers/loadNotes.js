import { collection, getDocs } from 'firebase/firestore/lite';
import { firebaseDB } from '../firebase/config';

export const loadNotes = async (uid = '') => {
	if (!uid) throw new Error('El UID del usuario no existe');

	const collectionRef = collection(firebaseDB, `${uid}/journal/notes`);
	const docs = await getDocs(collectionRef);

	const temp = Math.random();

	const notes = docs._docs.map((note) => ({
		id: note.id,
		...note.data(),
	}));

	return notes;
};
