import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/auth/authSlice';
import { startLogout } from '../../store/auth/thunks';

export const Navbar = ({ drawerWidth }) => {
	const dispatch = useDispatch();
	const ontLogout = () => {
		dispatch(startLogout());
	};

	return (
		<AppBar
			position="fixed"
			sx={{
				width: { sm: `calc(100% - ${drawerWidth}px)` },
				ml: { sm: `${drawerWidth}px` },
			}}
		>
			<Toolbar>
				{/* toogle button */}
				<IconButton color="inherit" edge="start" sx={{ mr: 2, display: { sm: 'none' } }}>
					<MenuOutlined />
				</IconButton>

				<Grid container direction="row" justifyContent="space-between" alignItems="center">
					{/* title */}
					<Typography variant="h6" noWrap component="div">
						JournalApp
					</Typography>

					{/* logout button */}
					<IconButton color="error" onClick={ontLogout}>
						<LogoutOutlined />
					</IconButton>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};
