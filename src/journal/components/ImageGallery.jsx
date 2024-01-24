import { ImageList, ImageListItem } from '@mui/material';

export const ImageGallery = ({ images }) => {

	return (
		<ImageList sx={{ width: '100%', height: 640 }} cols={4} rowHeight={270}>
			{images.map((item, index) => (
				<ImageListItem key={index}>
					<img
						src={item}
						srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
						alt={index}
						loading="lazy"
					/>
				</ImageListItem>
			))}
		</ImageList>
	);
};
