import {Badge, IconButton, Menu, MenuItem} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {HeartIcon} from "../shared/Icons";
import styled from "styled-components";
import {RecentActivityItem, RecentActivityItemType, RecentItem} from "../../models/RecentActivityItem";
import Axios from "axios";
import Moment from "react-moment";
import {Username} from "../user/Username";
import {CustomLinkSpan} from "../styled/custom-styles";
import {ViewPostModal} from "../home/ViewPostModal";

const ActivityBadge = styled(Badge)`
.MuiBadge-badge {
background-color: #ED4956;
}
`

const ListItem = styled(MenuItem)`
font-size: 14px;
&.MuiMenuItem-root:hover {
  cursor: default;
  background-color: transparent;
}
`

const MenuContainer = styled(Menu)`
.MuiMenu-paper {
padding-left: 20px;
padding-right: 20px;
}

`

interface Props {
    className?: string;
}

function NavActivity(props: Props) {
    const [recentActivity, setRecentActivity] = useState(new RecentActivityItem())
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
    const [viewPostOpen, setViewPostOpen] = useState(false);

    useEffect(() => {
        Axios.get<RecentActivityItem>("user/getrecentactivity").then(response => {
            setRecentActivity(response.data);
        })
    }, [])

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuItemClose() {
        setAnchorEl(null);
    }

    function handleMenuOpen() {
        if (!recentActivity.viewedRecentNotifications) {
            Axios.post("user/updateviewedrecentdate").then(response => {
                setRecentActivity({...recentActivity, viewedRecentNotifications: true});
            })
        }
    }

    function FollowItem(item: RecentItem) {
        return <>
            <Username username={item.username}/>&nbsp;started following you.&nbsp;<Moment style={{color: "grey"}}
                                                                                locale="en-short" fromNow
                                                                                utc>{item.created}</Moment>
        </>
    }

    function handleSetViewPostOpen() {
        setViewPostOpen(true);
    }

    function PostLikeItem(item: RecentItem) {
        return <>
            <Username username={item.username}/>&nbsp;liked your&nbsp;<CustomLinkSpan onClick={handleSetViewPostOpen}>post.&nbsp;</CustomLinkSpan> <Moment
            style={{color: "grey"}} locale="en-short" fromNow utc>{item.created}</Moment>
            <ViewPostModal onClose={() => setViewPostOpen(false)} open={viewPostOpen} postId={item.postId} />
        </>
    }

    function CommentLikeItem(item: RecentItem) {
        return <>
            <Username username={item.username}/>&nbsp;liked your comment.&nbsp;<Moment
            style={{color: "grey"}} locale="en-short" fromNow utc>{item.created}</Moment>
        </>
    }

    return (
        <>
            <IconButton
                disableRipple
                style={{marginRight: 10, backgroundColor: "transparent"}}
                size="small"
                onClick={handleClick}
            >
                <ActivityBadge variant="dot" badgeContent=" " invisible={recentActivity.viewedRecentNotifications}
                               color="primary">
                    <HeartIcon filled={false}/>
                </ActivityBadge>

            </IconButton>
            <MenuContainer
                onEnter={handleMenuOpen}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuItemClose}
            >
                {recentActivity.recentItems.map(item => <ListItem key={new Date(item.created).getTime()} disableRipple
                                                                  disableGutters>
                    {item.recentActivityItemType === RecentActivityItemType.Follow ? <FollowItem {...item} />
                        : item.recentActivityItemType === RecentActivityItemType.PostLike ? <PostLikeItem {...item} />
                            : <CommentLikeItem {...item} />}
                </ListItem>)}
            </MenuContainer>

        </>
    );
}

export default NavActivity;
