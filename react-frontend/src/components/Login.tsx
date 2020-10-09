import {
	Container,
	Typography,
	Grid,
	TextField,
	Button,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function Login() {
	return (
		<Container maxWidth="sm">
			<form>
				<Typography variant="h5">Sign In</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label="Username"
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label="Password"
							type="password"
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<Button
							color="primary"
							variant="contained"
							disableElevation
							fullWidth
						>
							Sign In
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Link to="/signup">
							Don't have an account? Create One
						</Link>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}

export default Login;
