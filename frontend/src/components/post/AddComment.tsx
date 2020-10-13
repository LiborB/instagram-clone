// @flow
import * as React from 'react';
import {Box, BoxProps, Button, TextField} from "@material-ui/core";
import Axios from "axios";
import PostDetail from "../../models/PostDetail";
import {useState} from "react";
import styled from "styled-components";

const CommentInput = styled(TextField)`
input {
font-size: 14px;
}
`

interface Props extends BoxProps {
    postId: number;
    onCommentAdded: () => void;
};

export function AddComment(props: Props) {
    const [comment, setComment] = useState("");
    const {postId, onCommentAdded, ...slicedProps} = props;
    function postCommentClick() {
        if (comment) {
            Axios.post("comments/add", {
                postId: props.postId,
                commentBody: comment
            }).then(response => {
                props.onCommentAdded();
                setComment("")
            })
        }
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Enter") {
            postCommentClick();
        }
    }
    return (
        <Box {...slicedProps} display="flex">
            <Box flexGrow={1}>
                <CommentInput value={comment} onChange={(event) => setComment(event.target.value)} fullWidth InputProps={{ disableUnderline: true }}
                           variant="standard" placeholder="Add a comment..." onKeyPress={handleKeyPress}/>

            </Box>
            <Box>
                <Button onClick={postCommentClick} variant="text" color="primary">Post</Button>
            </Box>
        </Box>
    );
};
