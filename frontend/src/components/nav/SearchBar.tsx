import {TextField, CircularProgress, Grid, Box} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import React, {ChangeEvent, useState} from "react";
import classes from "./SearchBar.module.scss"
import Axios from "axios";
import UserSearchItem from "../../models/UserSearchItem";
import {PersonAddOutlined} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {makeFriendly} from "../../utility/Helper";
import {useDispatch} from "react-redux";
import {SetPostUpdated} from "../../store/actions";

function SearchBar() {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([] as UserSearchItem[]);
    const history = useHistory()
    const dispatch = useDispatch();

    function handleChange(value: string) {
        if (!value) {
            setOptions([])
            setLoading(false)
            return;
        }
        setLoading(true)
        Axios.get<UserSearchItem[]>("user/findusers", {
            params: {
                usernameQuery: value
            }
        }).then(response => {
            setOptions([...response.data]);
            setLoading(false)
        })
    }

    function handleFollowClick(event: React.SyntheticEvent, option: UserSearchItem) {
        event.stopPropagation();
        Axios.post("user/followuser", null, {
            params: {
                userToFollowId: option.userId
            }
        }).then(response => {
            const newOptions = [...options];
            const newOption = newOptions.find(x => x.userId === option.userId);
            if (newOption) {
                newOption.isFollowing = true;
            }
            setOptions(newOptions);
            dispatch(SetPostUpdated(true));
        })
    }

    function optionClick(option: UserSearchItem) {
        history.push(`/user/${option.username}`)
    }

    function NumberOfFollowers(option: UserSearchItem) {
        if (option.numberOfFollowers) {
            return <span className={classes.numberOfFollowers}>{makeFriendly(option.numberOfFollowers)}</span>;
        }
        return null;
    }
    return (
        <Box display="flex" flexGrow={1}>
            <Autocomplete
                fullWidth
                size="small"
                filterOptions={(x) => x}
                options={options}
                freeSolo
                onInputChange={(event, value) => handleChange(value)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search"
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps, endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                </React.Fragment>
                            ), classes: {root: classes.searchInput}
                        }}
                    />
                )}
                renderOption={(option) => <Grid container justify="space-between" alignItems="center" onClick={() => optionClick(option)}>
                    <Grid item xs>
                        <div>
                            <span style={{fontWeight: 600, fontSize: 14}}>{option.username}</span>&#8239;
                            <NumberOfFollowers {...option}></NumberOfFollowers>
                        </div>
                    </Grid>
                    <Grid item container justify="flex-end" xs>
                        <div>
                            {!option.isFollowing && <PersonAddOutlined className={classes.followIcon}
                                                                       onClick={(event) => handleFollowClick(event, option)}/>}
                        </div>
                    </Grid>
                </Grid>}
            />
        </Box>

    );
}

export default SearchBar;
