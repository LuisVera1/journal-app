import { signInWithEmailAndPassword } from '@firebase/auth';
import {
	loginWithEmailAndPassword,
	logoutFirebase,
	registerNewUser,
	singWithGoogle,
} from '../../firebase/providers';
import { checkingCredentials, login, logout } from './authSlice';
import { clearNotesLogout } from '../journal/journalSlice';

export const StartLoginWithEmailandPassword = (email, password) => {
	return async (dispatch, getState) => {
		dispatch(checkingCredentials());

		const { ok, displayName, photoURL, uid, errorMessage } = await loginWithEmailAndPassword({
			email,
			password,
		});

		if (!ok) {
			return dispatch(logout(errorMessage));
		}

		dispatch(login({ uid, displayName, email, photoURL }));
	};
};

export const startGoogleSignIn = () => {
	return async (dispatch) => {
		dispatch(checkingCredentials());

		const result = await singWithGoogle();

		if (!result.ok) {
			return dispatch(logout(result.errorMessage));
		}

		dispatch(login(result));
	};
};

export const startCreatingUserwithEmailAndPassword = ({ email, password, displayName }) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());

		const { ok, uid, photoURL, errorMessage } = await registerNewUser({
			email,
			password,
			displayName,
		});

		if (!ok) {
			return dispatch(logout(errorMessage));
		}

		dispatch(login({ uid, displayName, email, photoURL }));
	};
};

export const startLogout = () => {
	return async (dispatch) => {
		await logoutFirebase();

		dispatch(clearNotesLogout());
		dispatch(logout());
	};
};
