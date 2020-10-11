import * as React from 'react';
import {createRef, useState} from "react";
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Typography} from "@material-ui/core";
import classes from "./UploadPost.module.scss";
import Axios from "axios";
import PostDetail from "../../models/PostDetail";
import {Add, AddCircleOutline, LibraryAddOutlined} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {SetPostUpdated} from "../../store/actions";

interface Props {

};

export function UploadPost(props: Props) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState("");
    const [description, setDescription] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const fileInput = createRef<HTMLInputElement>();
    const dispatch = useDispatch();

    function handleClose() {
        setImageSrc("")
        setDescription("");
        setSubmitDisabled(true)
        if (fileInput.current) {
            fileInput.current.value = "";
        }
        setDialogOpen(false);
    }

    function handleOpen() {
        setDialogOpen(true)
    }

    function submitClick() {
        if (fileInput.current?.files?.length) {
            const formData = new FormData();
            formData.append("file", fileInput.current.files[0]);
            formData.append("description", description);
            Axios.post<PostDetail>("posts/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => {
                dispatch(SetPostUpdated(true));
                handleClose();
            })
        }

    }

    function fileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files && files.length) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                if (e.target?.result) {
                    setImageSrc(e.target.result.toString());
                    setSubmitDisabled(false)
                }
            }
            fileReader.readAsDataURL(files[0]);
        }
    }

    function UploadBox() {
        if (imageSrc) {
            return <div className={classes.imageContainer} onClick={() => fileInput.current?.click()}>
                <img src={imageSrc} className={classes.image} alt="uploaded image"/>
                <div className={classes.reselectImage}>
                    <Typography color="textSecondary" variant="h6">Select an image</Typography>
                </div>
            </div>
        } else {
            return <div className={classes.selectFile} onClick={() => fileInput.current?.click()}>
                <Typography color="textSecondary" variant="h6">Select an image</Typography>
            </div>
        }
    }

    return (
        <div>
            <Box ml={1}>
                <Button startIcon={<LibraryAddOutlined></LibraryAddOutlined>} variant="text"  onClick={handleOpen}>New Post</Button>

            </Box>
            <Dialog maxWidth="md" fullWidth open={dialogOpen} onClose={handleClose}>
                <DialogTitle>
                    Create a new post
                </DialogTitle>
                <DialogContent dividers>
                    <input type="file" onChange={fileChange} ref={fileInput} hidden accept="image/*"/>
                    <div>
                        <UploadBox/>
                    </div>
                    <Box mt={2}>
                        <TextField inputProps={{maxLength: 1000}} rows={4} label="(Optional) Share some details about your image"
                                   className={classes.description} variant="outlined" fullWidth multiline
                                   value={description}
                                   onChange={(event) => setDescription(event.target.value)}/>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button disabled={submitDisabled} onClick={submitClick} color="primary" variant="contained" disableElevation>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
