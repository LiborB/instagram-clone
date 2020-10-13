import {
    Container,
    Typography,
    Grid,
    TextField,
    Button,
} from "@material-ui/core";
import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Axios from "axios";
import {UserDetails} from "../../models/UserDetails";
import {useDispatch} from "react-redux";
import {SetCurrentUser} from "../../store/actions";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("")
    const dispatch = useDispatch();
    const history = useHistory()

    function loginClick(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (username && password) {
            Axios.post<UserDetails>("user/login", {
                username, password
            }).then(response => {
                dispatch(SetCurrentUser(response.data))
                history.push("/home")
            }).catch(error => {
                setUsernameError(error.response?.data)
            })
        }
    }

    return (
        <Container maxWidth="sm">
            <form style={{textAlign: "center"}} onSubmit={loginClick}>
                <Typography variant="h5">Sign In</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
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
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            fullWidth
                            variant="outlined"
                            label="Password"
                            type="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
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

export default LoginPage;
