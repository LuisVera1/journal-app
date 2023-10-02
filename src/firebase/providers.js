import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from 'firebase/auth';
import { firebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const singWithGoogle = async () => {
	try {
		const result = await signInWithPopup(firebaseAuth, googleProvider);
		const { displayName, email, photoURL, uid } = result.user;

		return {
			ok: true,
			displayName,
			email,
			photoURL,
			uid,
		};
	} catch (err) {
		const errorCode = err.code;
		const errorMessage = err.message;

		return {
			ok: false,
			errorMessage,
			errorCode,
		};
	}
};

export const registerNewUser = async ({ email, password, displayName }) => {
	try {
		const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password);
		
		const { uid, photoURL } = resp.user;

		//update profile
		await updateProfile(firebaseAuth.currentUser, { displayName });

		return {
			ok: true,
			uid,
			displayName,
			email,
			photoURL,
		};
	} catch (err) {
		console.error(err);
		return { ok: false, errorMessage: err.message };
	}
};

export const loginWithEmailAndPassword = async ({ email, password }) => {
	try {
		const resp = await signInWithEmailAndPassword(firebaseAuth, email, password);
		const { displayName, photoURL, uid } = resp.user;
		return { ok: 'ok', email, displayName, photoURL, uid };
	} catch (err) {
		return { ok: false, errorMessage: err.message };
	}
};

export const logoutFirebase = async () => {
	return await firebaseAuth.signOut();
};
