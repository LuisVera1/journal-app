import { Routes, Route, Navigate } from 'react-router';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { useCheckauth } from '../hooks/useCheckAuth';

export const AppRouter = () => {
	const { status } = useCheckauth();

	if (status === 'checking') {
		return <CheckingAuth />;
	}

	return (
		<Routes>
			{status === 'authenticated' ? (
				<Route path="/*" element={<JournalRoutes />} />
			) : (
				<Route path="/auth/*" element={<AuthRoutes />} />
			)}

			<Route path="/*" element={<Navigate to="/auth/login" />} />
		</Routes>
	);
};
