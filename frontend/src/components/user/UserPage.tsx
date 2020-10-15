import * as React from 'react';
import {useLocation} from 'react-router-dom';
import {Box, Button, Grid} from "@material-ui/core";
import styled from "styled-components";
import {useEffect, useState} from "react";
import Axios from "axios";
import UserProfileInfo from "../../models/UserProfileInfo";
import {Skeleton} from "@material-ui/lab";
import PostDetailSimple from "../../models/PostDetailSimple";
import {BounceLoader, PulseLoader} from "react-spinners";
import Loader from "../shared/Loader";

const Container = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
width: 50%;
margin: 0 auto;
`

const UsernameRow = styled.div`
display: flex;
justify-content: center;
margin: 0 auto 10px auto;
font-weight: 300;
font-size: 28px;
`

const OverviewRow = styled.div`
font-size: 16px;
display: flex;
margin: 0 auto;
`

const Number = styled.span`
font-weight: 600;
margin-left: 20px;
`

interface Props {
    username: string;
};

export function UserPage(props: Props) {
    const [profileInfo, setProfileInfo] = useState(new UserProfileInfo());
    useEffect(() => {
        Axios.get<UserProfileInfo>(`user/getprofileinfo/${props.username}`).then(response => {
            setProfileInfo(response.data);
        })
    }, [props.username])

    function followClick() {
        Axios.post("/user/followuser", null, {
            params: {
                userToFollowId: profileInfo.userId
            }
        }).then(response => {
            setProfileInfo({...profileInfo, isFollowing: true});
        })
    }

    function isLoaded() {
        return profileInfo.userId > 0;
    }

    function PostImage(postDetail: PostDetailSimple) {
        return <Grid item xs={4}>
            <img width="100%" src={postDetail.imageBase64} alt="user image"/>
        </Grid>
    }

    function ImageList() {
        const postImages = profileInfo.postDetailSimples.map(item => <PostImage key={item.postId} {...item} />)
        const remainingItems = 3 - (postImages.length % 3);
        for (let i = 0; i < remainingItems; i++) {
            postImages.push(<Grid item xs={4}/>)
        }
        return <>
            {postImages}
        </>
    }

    return <>{isLoaded() ? <Container>
        <UsernameRow>{profileInfo.username}
            {!profileInfo.isFollowing && <Button onClick={followClick}>Follow</Button>}
        </UsernameRow>
        <OverviewRow>
            <div><Number>{profileInfo.numberOfPosts}</Number> posts</div>
            <div><Number>{profileInfo.numberOfFollowers}</Number> followers</div>
            <div><Number>{profileInfo.numberOfFollowing}</Number> following</div>
        </OverviewRow>
        <Grid container style={{textAlign: "center", marginTop: 50}} justify="center" spacing={3}>
            <ImageList/>
        </Grid>
    </Container> : <Loader />} </>
};
