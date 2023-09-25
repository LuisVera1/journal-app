import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useform';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserwithEmailAndPassword } from '../../store/auth/thunks';
import { useMemo } from 'react';

const formData = {
	email: '',
	password: '',
	displayName: '',
};

const formValidations = {
	email: [(value) => value.includes('@'), 'El correo debe tener @'],
	password: [(value) => value.length >= 6, 'El password debe tener 6 o más caracteres'],
	displayName: [(value) => value.length >= 2, 'El nombre tiene que ser 2 o más letras'],
};

export const RegisterPage = () => {
	const { status, errorMessage } = useSelector((state) => state.auth);
	const isCheckingAuthentication = useMemo(() => {
		status === 'checking';
	}, [status]);

	const dispatch = useDispatch();
	const {
		displayName,
		email,
		password,
		onInputChange,
		displayNameValid,
		emailValid,
		passwordValid,
		isFormValid,
	} = useForm(formData, formValidations);
	const [formSubmited, setFormSubmited] = useState(false);

	/**
	 * Submit the form
	 * @param event -event of submit form
	 * @returns
	 */
	const onSubmit = (event) => {
		event.preventDefault();
		setFormSubmited(true);

		if (!isFormValid) return;
		dispatch(startCreatingUserwithEmailAndPassword({ email, password, displayName }));
	};

	return (
		<AuthLayout title="Register">
			<form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Nombre completo"
							type="text"
							placeholder="Nombre"
							name="displayName"
							autoComplete="user name"
							value={displayName}
							onChange={onInputChange}
							fullWidth
							error={!!displayNameValid && formSubmited}
							helperText={displayNameValid}
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							value={email}
							onChange={onInputChange}
							label="correo"
							name="email"
							type="email"
							placeholder="correo@mail.com"
							autoComplete="email"
							fullWidth
							error={!!emailValid && formSubmited}
							helperText={emailValid}
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="contraseña"
							type="password"
							placeholder="contraseña"
							name="password"
							autoComplete="current-password"
							fullWidth
							value={password}
							onChange={onInputChange}
							error={!!passwordValid && formSubmited}
							helperText={passwordValid}
						/>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>

						<Grid item xs={12} sm={12}>
							<Button
								disabled={isCheckingAuthentication}
								variant="contained"
								fullWidth
								type="submit"
							>
								<Typography>Crear cuenta</Typography>
							</Button>
						</Grid>
					</Grid>

					<Grid container direction="row" justifyContent="end">
						<Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
						<Link component={RouterLink} color="inherit" to="/auth/login">
							Ingresar
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
