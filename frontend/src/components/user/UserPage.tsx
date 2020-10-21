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
import {ViewPostModal} from "../home/ViewPostModal";
import {Favorite, QuestionAnswer, QuestionAnswerOutlined} from "@material-ui/icons";

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

const ImageGridContainer = styled.div`
margin-top: 50px;
display: grid;
grid-template-columns: 300px 300px 300px;
grid-auto-rows: 300px;
grid-gap: 20px;
justify-content: center;
`



const ImageLikesOverlay = styled.div`
position: absolute;
background-color: rgba(0, 0, 0, 0.3);
opacity: 0;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`

const ImageThumbnail = styled.img<{portrait: boolean}>`
    ${props => props.portrait &&
        'width: 100%'
    }
    ${props => !props.portrait &&
        'height: 100%'
    }   
`
const ImageContainer = styled.div`
position: relative;
overflow: hidden;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
&:hover {
    ${ImageLikesOverlay} {
      opacity: 1;
    }
}
`

interface Props {
    username: string;
};

export function UserPage(props: Props) {
    const [profileInfo, setProfileInfo] = useState(new UserProfileInfo());
    const [openPostId, setOpenPostId] = useState(0);
    useEffect(() => {
        let isCancelled = false;
        Axios.get<UserProfileInfo>(`user/getprofileinfo/${props.username}`).then(response => {
            if (response.data.postDetailSimples.length) {
                for (let i = 0; i < response.data.postDetailSimples.length; i++){
                    let x = response.data.postDetailSimples[i];
                    let image = new Image()
                    image.onload = () => {
                        x.aspectRatio = image.width / image.height;
                        if (i === response.data.postDetailSimples.length - 1) {
                            if (!isCancelled) {
                                setProfileInfo(response.data);

                            }
                        }
                    }
                    image.src = x.imageBase64;
                }
            }
            else {
                setProfileInfo(response.data);
            }
        })
        return () => {
            isCancelled = true;
        }
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
        return <ImageContainer onClick={() => setOpenPostId(postDetail.postId)}>
            <ImageThumbnail portrait={postDetail.aspectRatio <= 1} src={postDetail.imageBase64} alt="user image"/>
            <ImageLikesOverlay style={{color: "white"}}>
                <Favorite style={{paddingRight: 5}} /> {postDetail.numberOfLikes}
                <QuestionAnswer style={{marginLeft: 20, paddingRight: 5}} /> {postDetail.numberOfComments}
            </ImageLikesOverlay>
            <ViewPostModal onClose={() => setOpenPostId(0)} open={openPostId === postDetail.postId} postId={postDetail.postId}/>
        </ImageContainer>
    }

    function ImageList() {
        const postImages = profileInfo.postDetailSimples.map(item => <PostImage key={item.postId} {...item} />)
        return <>
            {postImages}
        </>
    }

    return <>{isLoaded() ? <Container>
        <UsernameRow>{profileInfo.username}
            {!profileInfo.isFollowing && <Button disableElevation style={{marginLeft: 20}} variant="contained" color="primary" onClick={followClick}>Follow</Button>}
        </UsernameRow>
        <OverviewRow>
            <div><Number>{profileInfo.numberOfPosts}</Number> posts</div>
            <div><Number>{profileInfo.numberOfFollowers}</Number> followers</div>
            <div><Number>{profileInfo.numberOfFollowing}</Number> following</div>
        </OverviewRow>
        <ImageGridContainer>
            <ImageList/>
        </ImageGridContainer>
    </Container> : <Loader />} </>
};
