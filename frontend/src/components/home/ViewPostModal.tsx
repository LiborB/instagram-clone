import * as React from 'react';
import {Card, Dialog, DialogProps, Divider, Grid} from "@material-ui/core";
import {useEffect, useState} from "react";
import PostDetail from "../../models/PostDetail";
import {Skeleton} from "@material-ui/lab";
import Axios from "axios";
import PostCommentDetail from "../../models/PostCommentDetail";

interface Props extends DialogProps{
    postDetail: PostDetail
};

export function ViewPostModal(props: Props) {
    const [comments, setComments] = useState([] as PostCommentDetail[]);

    function onOpen() {
        Axios.get<PostCommentDetail[]>(`comments/getcomments/${props.postDetail.postId}`).then(response => {
            setComments(response.data);
        })
    }

    function CommentList() {
        return <>
            {comments.map(comment => <Grid key={comment.postCommentId} item xs={12}>{comment.commentBody}</Grid>)}
            </>
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} onEnter={onOpen} maxWidth="md" fullWidth>
            <Card>
                <Grid container>
                    <Grid item xs={8}>
                        <img width="100%" src={props.postDetail.imageBase64} />
                    </Grid>
                    <Grid item xs={4}>
                        <Grid item xs={12}>
                            {props.postDetail.creatorName}
                        </Grid>
                        <Grid item xs={12}>
                            <Divider></Divider>
                        </Grid>
                        {Boolean(props.postDetail.description) && <Grid item xs={12}>
                            <span>{props.postDetail.creatorName}</span>
                            <span>{props.postDetail.description}</span>
                        </Grid>}
                        <CommentList></CommentList>
                    </Grid>
                </Grid>
            </Card>

        </Dialog>
    );
};
