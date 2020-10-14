import * as React from 'react';
import {Box, Button, Card, Dialog, DialogProps, Divider, Grid, TextField} from "@material-ui/core";
import {useEffect, useState} from "react";
import PostDetail from "../../models/PostDetail";
import {Skeleton} from "@material-ui/lab";
import Axios from "axios";
import PostCommentDetail from "../../models/PostCommentDetail";
import styled from "styled-components";
import {CommentDescription} from "../styled/custom-styles";
import {Username} from "../user/Username";
import {HeartIcon} from "../post/HeartIcon";
import {Comment} from "../post/Comment";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {AddComment} from "../post/AddComment";
import PerfectScrollBar from "react-perfect-scrollbar"
import {StarBorderOutlined, StarOutlined} from "@material-ui/icons";


const HeaderDivider = styled(Divider)`
margin: 10px 0;
`

const PostDialog = styled(Dialog)`
.MuiDialog-paper {
border-radius: 0;
}
`

const GridContainer = styled(Grid)`
margin-bottom: -10px;
`

const CommentGridItem = styled(Grid)`
line-height: 18px;
`

const FollowingText = styled.span`
font-size: 14px;
font-weight: 600;
`

interface Props extends DialogProps {
    postDetail?: PostDetail,
    postId?: number
};

export function ViewPostModal(props: Props) {
    const [comments, setComments] = useState([] as PostCommentDetail[]);
    const [imageHeight, setImageHeight] = useState(0);
    const {width, height} = useWindowDimensions();
    const [postDetail, setPostDetail] = useState(props.postDetail ?? new PostDetail())

    useEffect(() => {
        if (props.postDetail) {
            setPostDetail(props.postDetail);
        }
    }, [props.postDetail])

    function onOpen() {
        if (props.postId) {
            Axios.get<PostDetail>(`posts/getpostdetail/${props.postId}`).then(response => {
                setPostDetail(response.data)
                getCommentList();
            })
        }
        else {
            if (props.postDetail) {
                setPostDetail(props.postDetail);
                getCommentList();
            }

        }

    }

    function getCommentList() {
        Axios.get<PostCommentDetail[]>(`comments/getcomments/${postDetail.postId}`).then(response => {
            setComments(response.data);
        })
    }

    function updateComment(detail: PostCommentDetail) {
        const commentList = [...comments];
        const commentIndex = commentList.findIndex(x => x.postCommentId === detail.postCommentId);
        commentList[commentIndex] = {...detail};
        setComments(commentList)
    }

    function CommentList() {
        return <>
            {comments.map(comment => <Grid key={comment.postCommentId} item xs={12}><Comment
                commentUpdated={updateComment} postCommentDetail={comment}/></Grid>)}
        </>
    }

    function getMaxHeight() {
        return Math.round(Math.max(imageHeight, height * 0.25) - 90);
    }

    return (
        <PostDialog open={props.open} onClose={props.onClose} onEnter={onOpen} maxWidth="lg" fullWidth>
            <Card style={{minHeight: "25vh"}}>
                <GridContainer container spacing={1}>
                    <Grid container item xs={8} alignItems="center">
                        <img onLoad={(value) => setImageHeight(value.currentTarget.offsetHeight)} width="100%"
                             src={postDetail.imageBase64}/>

                    </Grid>
                    <Grid item xs={4}>
                        <Grid item xs={12}>
                            <Box pt={1}>
                                <Username username={postDetail.creatorName}/>
                                <FollowingText> &#8226; Following</FollowingText>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <HeaderDivider/>
                        </Grid>
                        <PerfectScrollBar style={{maxHeight: getMaxHeight()}}>
                            <CommentGridItem item xs={12}>
                                {Boolean(postDetail.description) && <Grid item xs={12}>
                                    <Box pb={1} style={{overflowWrap: "break-word"}}>
                                        <Username
                                            username={postDetail.creatorName}/>&nbsp;
                                        <CommentDescription>{postDetail.description}</CommentDescription>
                                    </Box>

                                </Grid>}
                                <CommentList />
                            </CommentGridItem>
                        </PerfectScrollBar>

                        <Grid item xs={12}>
                            <AddComment postId={postDetail.postId} onCommentAdded={getCommentList}/>
                        </Grid>
                    </Grid>
                </GridContainer>
            </Card>

        </PostDialog>
    );
};
