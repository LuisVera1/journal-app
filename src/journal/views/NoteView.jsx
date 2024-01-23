import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';

import { ImageGallery } from '../components/ImageGallery';
import { setActiveNote } from '../../store/journal/journalSlice.js';

import { useForm } from '../../hooks/useform';
import { startSavingNote, startUploadingFiles } from '../../store/journal/thunks.js';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { Button } from '@mui/base';
import { SaveOutlined, UploadFileOutlined } from '@mui/icons-material';
import { Grid, IconButton, TextField, Typography } from '@mui/material';


export const NoteView = () => {
	const { active: activeNote, messageSaved, isSaving } = useSelector((state) => state.journal);
	const { formState, body, title, date, onInputChange } = useForm(activeNote);
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(setActiveNote(formState));
	}, [formState]);

	useEffect(() => {
		if (messageSaved.length > 0) {
			Swal.fire({
				title: 'Nota actualizada',
				text: 'Se han guardado los cambios',
				icon: 'success',
				confirmButtonText: 'OK',
			});
		}
	}, [messageSaved]);

	const dateString = useMemo(() => {
		const newDate = new Date(date);
		return newDate.toUTCString();
	}, [date]);

	const onSaveNote = () => {
		dispatch(startSavingNote());
	};

	const onFileInputChange = ({ target }) => {
		if (target.files == 0) return;

		dispatch(startUploadingFiles(target.files));

	}

	return (
		<Grid
			container
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			sx={{ mb: 1 }}
		>
			<Grid item>
				<Typography fontSize={39} fontWeight="light">
					{dateString}
				</Typography>
			</Grid>

			<Grid item>

				<input
					type="file"
					multiple
					id="uploadbtn"
					onChange={onFileInputChange}
					style={{ display: 'none' }}
				/>

				<IconButton
					color="primary"
					disabled={isSaving}
				>
					<label htmlFor="uploadbtn">

						<UploadFileOutlined />
					</label>
				</IconButton>

				<Button color="primary" onClick={onSaveNote} disabled={isSaving}>
					<SaveOutlined sx={{ fontSize: 30, mr: 0 }} />
					<Typography sx={{ fontSize: 10, ml: 1, mr: 1 }}>Guardar</Typography>
				</Button>
			</Grid>

			<Grid container>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					placeholder="Ingrese un título"
					label="Título"
					name="title"
					value={title}
					onChange={onInputChange}
					sx={{ border: 'none', mb: 1 }}
				/>

				<TextField
					type="text"
					variant="filled"
					fullWidth
					multiline
					placeholder="¿Qué sucedió hoy?"
					minRows={5}
					name="body"
					value={body}
					onChange={onInputChange}
				/>

				<ImageGallery images={activeNote.imageUrls} />
			</Grid>
		</Grid>
	);
};
