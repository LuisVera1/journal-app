import { AddOutlined } from '@mui/icons-material';
import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView, NoteView } from '../views';
import { IconButton } from '@mui/material';
import { StartNewNote } from '../../store/journal/thunks';
import { useDispatch, useSelector } from 'react-redux';

export const JournalPage = () => {
	const dispatch = useDispatch();
	const { isSaving, active } = useSelector((state) => state.journal);

	const onClickNewNote = () => {
		dispatch(StartNewNote());
	};

	return (
		<JournalLayout>
			{!active && <NothingSelectedView />}

			{active && <NoteView />}

			{/* <NothingSelectedView /> */}
			{/* <NoteView /> */}

			<IconButton
				size="large"
				onClick={onClickNewNote}
				disabled={isSaving}
				sx={{
					color: 'white',
					backgroundColor: 'error.main',
					':hover': { backgroundColor: 'error.main', opacity: 0.8 },
					position: 'fixed',
					right: 50,
					bottom: 50,
				}}
			>
				<AddOutlined sx={{ fontSize: 30 }} />
			</IconButton>
		</JournalLayout>
	);
};
