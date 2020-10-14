import * as React from 'react';
import { useLocation } from 'react-router-dom';
import {Box, Grid} from "@material-ui/core";
import styled from "styled-components";
import {useEffect} from "react";
import Axios from "axios";
import UserProfileInfo from "../../models/UserProfileInfo";

const Container = styled.div`
display: flex;
justify-content: center;
`

interface Props {
    username: string;
};

export function UserPage(props: Props) {
    useEffect(() => {
        Axios.get<UserProfileInfo>("user/")
    }, [])

    return <Grid container justify="center">
        <Grid item xs={12}>

        </Grid>
        <Grid item xs={12}>
            <Grid item container xs={12}>
                <Grid item xs={4}>
                    2 posts
                </Grid>
                <Grid item xs={4}>
                    291 followers
                </Grid>
                <Grid item xs={4}>
                    105 following
                </Grid>
            </Grid>
        </Grid>
    </Grid>
};
