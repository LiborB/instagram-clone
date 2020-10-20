import * as React from 'react';
import {Favorite, FavoriteBorderOutlined} from "@material-ui/icons";
import classes from "./PostListItem.module.scss";
import styled from "styled-components";
import {Icon, SvgIconProps} from "@material-ui/core";

interface StyleProps {
    size?: "small" | "medium" | number
}

const Outlined = styled(FavoriteBorderOutlined)<StyleProps>`
  margin-right: 10px;
  cursor: pointer;
  font-size: ${props => props.size === "small" ? "18px" : "1.5em"};
`

const Filled = styled(Favorite)<StyleProps>`
  margin-right: 10px;
  cursor: pointer;
  color: red;
  font-size: ${props => props.size === "small" ? "18px" : props.size === "medium" ? "1.5em" : props.size ? props.size + "px" : "1.5em"};
`

interface Props extends SvgIconProps{
    isLiked: boolean,
    size?: "small" | "medium" | number
};

export function HeartIcon(props: Props) {
    const {isLiked, ...newProps} = props;
    if (props.isLiked) {
        return <Filled {...newProps} />
    }
    else {
        return <Outlined {...newProps}/>
    }
};
