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

interface Props extends DialogProps {
    postDetail: PostDetail
};

export function ViewPostModal(props: Props) {
    const [comments, setComments] = useState([] as PostCommentDetail[]);
    const [imageHeight, setImageHeight] = useState(0);
    const {width, height} = useWindowDimensions();

    function onOpen() {
        getCommentList();
    }

    function getCommentList() {
        Axios.get<PostCommentDetail[]>(`comments/getcomments/${props.postDetail.postId}`).then(response => {
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
        <PostDialog open={props.open} onClose={props.onClose} onEnter={onOpen} maxWidth="md" fullWidth>
            <Card style={{minHeight: "25vh"}}>
                <GridContainer container spacing={1}>
                    <Grid container item xs={8} alignItems="center">
                        <img onLoad={(value) => setImageHeight(value.currentTarget.offsetHeight)} width="100%"
                             src={props.postDetail.imageBase64}/>

                    </Grid>
                    <Grid item xs={4}>
                        <Grid item xs={12}>
                            <Box pt={1}>
                                <Username username={props.postDetail.creatorName}/>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <HeaderDivider/>
                        </Grid>
                        <PerfectScrollBar style={{maxHeight: getMaxHeight()}}>
                            <CommentGridItem item xs={12}>
                                {Boolean(props.postDetail.description) && <Grid item xs={12}>
                                    <Box pb={2}>
                                        <Username
                                            username={props.postDetail.creatorName}/>&nbsp;
                                        <CommentDescription>{props.postDetail.description}</CommentDescription>
                                    </Box>

                                </Grid>}
                                <CommentList />
                            </CommentGridItem>
                        </PerfectScrollBar>

                        <Grid item xs={12}>
                            <AddComment postId={props.postDetail.postId} onCommentAdded={getCommentList}/>
                        </Grid>
                    </Grid>
                </GridContainer>
            </Card>

        </PostDialog>
    );
};
