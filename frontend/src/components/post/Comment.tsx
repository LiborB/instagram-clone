// @flow
import * as React from 'react';
import {Box, Grid, GridProps} from "@material-ui/core";
import PostCommentDetail from "../../models/PostCommentDetail";
import {Username} from "../user/Username";
import {HeartIcon} from "./HeartIcon";
import {useEffect, useState} from "react";
import Axios from "axios";
import {CommentDescription} from "../styled/custom-styles";
import Moment from "react-moment";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../../store/types";

const CommentFooterContainer = styled.div`
font-size: 12px;
color: #8e8e8e;
padding-bottom: 10px;
`

const Likes = styled.span`
font-weight: 600;
padding-left: 10px;
`

const GridComment = styled(Grid)`
overflow-wrap: break-word;
padding-right: 10px;
`

interface Props extends GridProps {
    postCommentDetail: PostCommentDetail
    commentUpdated: (commentDetail: PostCommentDetail) => void;
};

export function Comment(props: Props) {

    const {postCommentDetail, commentUpdated, ...slicedProps} = props;

    function handleClick() {
        if (props.postCommentDetail.isLiked) {
            Axios.post(`comments/unlike/${props.postCommentDetail.postCommentId}`).then(response => {
                props.commentUpdated({...props.postCommentDetail, isLiked: false, numberOfLikes: props.postCommentDetail.numberOfLikes - 1});
            })
        } else {
            Axios.post(`comments/like/${props.postCommentDetail.postCommentId}`).then(response => {
                props.commentUpdated({...props.postCommentDetail, isLiked: true, numberOfLikes: props.postCommentDetail.numberOfLikes + 1});
            })
        }
    }

    return (
        <Grid {...slicedProps} container>
            <GridComment item xs={11}>
                <Username username={props.postCommentDetail.username}/>

                <CommentDescription>&nbsp;{props.postCommentDetail.commentBody}</CommentDescription>
            </GridComment>
            <Grid item xs={1}>
                {!props.postCommentDetail.isSelfComment && <Box position="relative" top="10px"><HeartIcon size="small" onClick={handleClick} isLiked={props.postCommentDetail.isLiked}/></Box>}

            </Grid>
            <Grid item xs={12}>
                <CommentFooterContainer>
                    <Moment locale="en-short" fromNow utc>{props.postCommentDetail.created}</Moment>
                    {props.postCommentDetail.numberOfLikes > 0 && <Likes>
                    {props.postCommentDetail.numberOfLikes} {props.postCommentDetail.numberOfLikes > 1 ? 'likes' : 'like'}
                </Likes>}
                </CommentFooterContainer>

            </Grid>
        </Grid>
    );
};
