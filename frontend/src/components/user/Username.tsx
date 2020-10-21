import * as React from 'react';
import {Link, LinkProps} from "react-router-dom";
import styled from "styled-components";
import {CustomLink} from "../styled/custom-styles";

interface Props {
    username: string
    fontSize?: number,
    onClick?: React.MouseEventHandler<any>
};

export function Username(props: Props) {
    return (
        <CustomLink onClick={props.onClick} fontSize={props.fontSize} to={`/user/${props.username}`}>{props.username}</CustomLink>
    );
};

