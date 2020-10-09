import {
	Button,
	Container,
	Grid,
	TextField,
	Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./Signup.module.scss";

function Signup() {
	return (
		<Container maxWidth="sm" className="signup-container">
			<form>
				<Typography variant="h5">Sign Up</Typography>
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
							Join
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Link to="/login">Already have an account? Log In</Link>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}

export default Signup;
