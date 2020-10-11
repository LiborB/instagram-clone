import * as React from 'react';
import classes from "./PostListItem.module.scss"
import {
    Box,
    Button,
    Card,
    CardActions, Dialog,
    Divider,
    Grid,
    IconButton, TextField,
    Typography
} from '@material-ui/core';
import PostDetail from "../../models/PostDetail";
import {useSelector} from 'react-redux';
import {RootState, UserState} from '../../store/types';
import {
    ChatBubbleOutline,
    ChatBubbleOutlineRounded,
    ChatRounded,
    FavoriteBorderOutlined,
    SendOutlined,
    FavoriteBorder,
    Favorite
} from '@material-ui/icons';
import {useEffect, useState} from "react";
import Axios from "axios";
import Moment from "react-moment";
import {ViewPostModal} from "./ViewPostModal";

interface Props {
    postDetail: PostDetail
};

export function PostListItem(props: Props) {
    const {currentUser} = useSelector((state: RootState) => state.userState);
    const [postDetail, setPostDetail] = useState(props.postDetail);
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setPostDetail({...props.postDetail})
    }, [props.postDetail])

    const UnfollowButton = () => {
        if (props.postDetail.creatorId === currentUser.userId) {
            return <Button size="small" variant="text" className={classes.unfollowButton}>Unfollow</Button>
        }
        return null;
    }

    const HeartIcon = () => {
        if (!postDetail.isLiked) {
            return <FavoriteBorderOutlined onClick={likeClick} className={classes.actionIcon}/>
        } else {
            return <Favorite onClick={unlikeClick} className={`${classes.actionIcon} ${classes.filled}`}/>
        }
    }

    function likeClick() {
        Axios.post(`posts/like/${props.postDetail.postId}`).then(response => {
            setPostDetail({...postDetail, isLiked: true, numberOfLikes: postDetail.numberOfLikes + 1})
        })
    }

    function unlikeClick() {
        Axios.post(`posts/unlike/${props.postDetail.postId}`).then(response => {
            setPostDetail({...postDetail, isLiked: false, numberOfLikes: postDetail.numberOfLikes - 1})
        })
    }

    function postCommentClick() {
        if (comment) {
            Axios.post("comments/add", {
                postId: postDetail.postId,
                commentBody: comment
            }).then(response => {
                setPostDetail({...postDetail, numberOfComments: postDetail.numberOfComments + 1})
                setComment("")
            })
        }
    }

    return (
        <Card variant="outlined">
            <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
                <div className={classes.usernameTitle}>{props.postDetail.creatorName}</div>
                <div>
                    <UnfollowButton/>
                </div>
            </Box>
            <Box>
                <img style={{width: "100%"}} src={props.postDetail.imageBase64}/>
            </Box>
            <Box pl={1} pr={1}>
                <HeartIcon/>
                <ChatBubbleOutlineRounded className={classes.actionIcon}/>
                <SendOutlined className={classes.actionIcon}/>
            </Box>
            <Box pl={1} pr={1} fontWeight={600} fontSize={14}>
                {postDetail.numberOfLikes > 0 && <div>
                    {postDetail.numberOfLikes} {postDetail.numberOfLikes === 1 ? "like" : "likes"}
                </div>}
            </Box>
            <Box pl={1} pr={1} pt={1} fontSize="14px">
                {postDetail.description && <div>
                    <span style={{fontWeight: 600}}>{postDetail.creatorName}</span>&nbsp;
                    <span>{postDetail.description}</span>
                </div>}
            </Box>
            <Box pl={1} pr={1}>
                {Boolean(postDetail.numberOfComments) && <div onClick={() => setOpen(true)} className={classes.moreComments}>
                    View all {postDetail.numberOfComments} comments
                </div>}
            </Box>
            <Box pl={1} pr={1} pt={1}>
                <div className={classes.timeAgo}>
                    <Moment fromNow>{postDetail.created}</Moment>
                </div>
            </Box>
            <Box pt={1} pb={1}>
                <Divider/>
            </Box>
            <Box pl={1} pr={1} display="flex">
                <Box flexGrow={1}>
                    <TextField value={comment} onChange={(event) => setComment(event.target.value)} fullWidth
                               variant="standard" placeholder="Add a comment..."/>

                </Box>
                <Box>
                    <Button onClick={postCommentClick} variant="text" color="primary">Post</Button>

                </Box>
            </Box>
            <ViewPostModal postDetail={postDetail} open={open} onClose={() => setOpen(false)}/>
        </Card>
    );
};
