import { TurnedInNot } from '@mui/icons-material';
import {
	Divider,
	Drawer,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';

export const SideBar = ({ drawerWidth }) => {
	const {displayName} = useSelector((state) => state.auth);


	return (
		<Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
			<Drawer
				variant="permanent"
				open
				sx={{
					display: { xs: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
			>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						{displayName ? displayName : ''}
					</Typography>
				</Toolbar>
				<Divider />

				<List>
					{['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'].map(
						(month) => (
							<ListItem key={month} disablePadding>
								<ListItemButton>
									<ListItemIcon>
										<TurnedInNot />
									</ListItemIcon>
									<Grid>
										<ListItemText primary={month} />
										<ListItemText secondary={'some description...'} />
									</Grid>
								</ListItemButton>
							</ListItem>
						)
					)}
				</List>
			</Drawer>
		</Box>
	);
};
