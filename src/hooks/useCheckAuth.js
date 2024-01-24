import { onAuthStateChanged } from '@firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseAuth } from '../firebase/config';
import { logout, login } from '../store/auth/authSlice';
import { useEffect } from 'react';
import { startLoadingNotes } from '../store/journal/thunks';

export const useCheckauth = () => {
	const { status } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, async (user) => {
			if (!user) return dispatch(logout());

			const { uid, email, displayName, photoURL } = user;
			dispatch(login({ uid, email, displayName, photoURL }));
			dispatch(startLoadingNotes());
		});
	}, []);

	return { status };
};
