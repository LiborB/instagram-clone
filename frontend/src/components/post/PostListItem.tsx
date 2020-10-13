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
import {useDispatch, useSelector} from 'react-redux';
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
import {ViewPostModal} from "../home/ViewPostModal";
import {SetPostUpdated} from "../../store/actions";
import {Username} from "../user/Username";
import {CommentDescription} from "../styled/custom-styles";
import {HeartIcon} from "./HeartIcon";
import {AddComment} from "./AddComment";

interface Props {
    postDetail: PostDetail
};

export function PostListItem(props: Props) {
    const {currentUser} = useSelector((state: RootState) => state.userState);
    const [postDetail, setPostDetail] = useState(props.postDetail);
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setPostDetail({...props.postDetail})
    }, [props.postDetail])

    const UnfollowButton = () => {
        if (props.postDetail.creatorId !== currentUser.userId) {
            return <Button onClick={unfollowClick} size="small" variant="text"
                           className={classes.unfollowButton}>Unfollow</Button>
        }
        return null;
    }

    function unfollowClick() {
        Axios.post("user/unfollow", null, {
            params: {
                userToUnfollowId: postDetail.creatorId
            }
        }).then(response => {
            dispatch(SetPostUpdated(true));
        })
    }

    function handleLikeClick() {
        if (postDetail.isLiked) {
            unlikePost();
        } else {
            likePost();
        }
    }

    function likePost() {
        Axios.post(`posts/like/${props.postDetail.postId}`).then(response => {
            setPostDetail({...postDetail, isLiked: true, numberOfLikes: postDetail.numberOfLikes + 1})
        })
    }

    function unlikePost() {
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

    function onCommentAdded() {
        setPostDetail({...postDetail, numberOfComments: postDetail.numberOfComments + 1})
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Enter") {
            postCommentClick();
        }
    }

    return (
        <Card variant="outlined">
            <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
                <Username username={props.postDetail.creatorName}/>
                <div>
                    <UnfollowButton/>
                </div>
            </Box>
            <Box>
                <img style={{width: "100%"}} src={props.postDetail.imageBase64}/>
            </Box>
            <Box pl={1} pr={1}>
                <HeartIcon onClick={handleLikeClick} isLiked={postDetail.isLiked}/>
                <ChatBubbleOutlineRounded className={classes.actionIcon}/>
                <SendOutlined className={classes.actionIcon}/>
            </Box>
            <Box pl={1} pr={1} fontWeight={600} fontSize={14}>
                {postDetail.numberOfLikes > 0 && <div>
                    {postDetail.numberOfLikes} {postDetail.numberOfLikes === 1 ? "like" : "likes"}
                </div>}
            </Box>
            {postDetail.description &&
            <Box pl={1} pr={1} pt={1} fontSize="14px" style={{overflowWrap: "break-word"}}>
                <div>
                    <Username username={postDetail.creatorName}/>&nbsp;
                    <CommentDescription>{postDetail.description}</CommentDescription>
                </div>
            </Box>}
            {Boolean(postDetail.numberOfComments) &&
            <Box pl={1} pr={1}>
                <div onClick={() => setOpen(true)} className={classes.moreComments}>
                    View all {postDetail.numberOfComments} comments
                </div>
            </Box>
            }
            <Box pl={1} pr={1} pt={1}>
                <div className={classes.timeAgo}>
                    <Moment fromNow utc>{postDetail.created}</Moment>
                </div>
            </Box>
            <Box pt={1} pb={1}>
                <Divider/>
            </Box>
            <AddComment pl={1} pr={1} postId={postDetail.postId} onCommentAdded={onCommentAdded}/>
            <ViewPostModal postDetail={postDetail} open={open} onClose={() => setOpen(false)}/>
        </Card>
    );
};
