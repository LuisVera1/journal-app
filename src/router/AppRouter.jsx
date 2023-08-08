import { Routes, Route } from 'react-router';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';

export const AppRouter = () => {
	return (
		<Routes>
			{/* sing up, log in */}
			<Route path="/auth/*" element={<AuthRoutes />} />

			{/* journal app */}
			<Route path="/*" element={<JournalRoutes />} />
		</Routes>
	);
};
