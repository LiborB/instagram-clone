import {
    Button,
    Container,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";
import React, {useEffect, useRef, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import "./Signup.module.scss";
import Axios from "axios";
import {UserDetails} from "../models/UserDetails";
import {useDispatch} from "react-redux";
import {SetCurrentUser} from "../store/actions";

interface FormErrors {
    username: string,
    password: string,
    confirmPassword: string
}

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPsswordError, setConfirmPasswordError] = useState("");
    const dispatch = useDispatch();
    const history = useHistory()

    function signupClick() {
        usernameBlur()
        passwordBlur()
        confirmPasswordBlur()
        if (usernameError || passwordError || confirmPsswordError || !username || !password || confirmPassword !== password) {
            return;
        }
        Axios.post<UserDetails>("user/create", {
            username, password
        }).then(response => {
            dispatch(SetCurrentUser(response.data));
            history.push("/home")
        }).catch(error => {
            setUsernameError(error.response?.data)
        })
    }

    function confirmPasswordBlur() {
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match")
        } else {
            setConfirmPasswordError("")
        }
    }

    function usernameBlur() {
        if (!username) {
            setUsernameError("Please enter a username")
        }
        else {
            setUsernameError("")
        }
    }

    function passwordBlur() {
        if (!password) {
            setPasswordError("Please enter a password")
        }
        else {
            setPasswordError("")
        }
    }

    return (
        <Container maxWidth="sm" className="signup-container">
            <form style={{textAlign: "center"}}>
                <Typography variant="h5">Sign Up</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            onBlur={usernameBlur}
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            fullWidth
                            variant="outlined"
                            label="Username"
                            helperText={usernameError}
                            error={Boolean(usernameError)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onBlur={passwordBlur}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            fullWidth
                            variant="outlined"
                            label="Password"
                            type="password"
                            helperText={passwordError}
                            error={Boolean(passwordError)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onBlur={confirmPasswordBlur}
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            fullWidth
                            variant="outlined"
                            label="Confirm Password"
                            type="password"
                            helperText={confirmPsswordError}
                            error={Boolean(confirmPsswordError)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={signupClick}
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
