import { Button } from '@mui/base';
import { SaveOutlined } from '@mui/icons-material';
import { Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components/ImageGallery';

export const NoteView = () => {
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
					06 Agosto, 2023
				</Typography>
			</Grid>

			<Grid item>
				<Button color="primary">
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
					sx={{ border: 'none', mb: 1 }}
				/>

				<TextField
					type="text"
					variant="filled"
					fullWidth
					multiline
					placeholder="¿Qué sucedio hoy?"
					minRows={5}
				/>

				<ImageGallery />
			</Grid>
		</Grid>
	);
};
