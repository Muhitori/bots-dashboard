import { Box, CircularProgress } from "@mui/material";

export const LoadingComponent = () => {
	return (
		<Box
			width='100%'
			display='flex'
			justifyContent='center'
			alignItems='center'>
			<CircularProgress />
		</Box>
	);
};
