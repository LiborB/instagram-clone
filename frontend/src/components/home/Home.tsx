import * as React from "react";
import { useEffect, useState } from "react";
import PostDetail from "../../models/PostDetail";
import Axios from "axios";
import { PostListItem } from "./PostListItem";
import classes from "./Home.module.scss"
import {Container, Dialog, Grid} from "@material-ui/core";
import {useSelector} from "react-redux";
import {RootState} from "../../store/types";

function Home() {
    const [postDetails, setPostDetails] = useState([] as PostDetail[]);
    const {postUpdated} = useSelector((state: RootState) => state.postState);
    useEffect(() => {
        loadPosts();
    }, []);
    useEffect(() => {
        console.log(postUpdated.updated)
        if (postUpdated.updated) {
            loadPosts();
        }
    }, [postUpdated])

    function loadPosts() {
        Axios.get<PostDetail[]>("posts/postlist", {
            params: {
                skip: 0,
                take: 100
            }
        }).then(response => {
            setPostDetails(response.data.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()));
        })
    }

    function PostList() {
        return <>{postDetails.map(item => <Grid key={item.postId} item xs={12}><PostListItem key={item.postId} postDetail={item} /></Grid>)}</>
    }

    return <Container maxWidth="md">
        <Grid container justify="center" spacing={4}>
            <Grid item xs={8}>
                <Grid container spacing={4}>
                    <PostList></PostList>
                </Grid>

            </Grid>
            <Grid item xs={4}>
                placehgolder stuff
            </Grid>
        </Grid>
    </Container>;
}

export default Home;
