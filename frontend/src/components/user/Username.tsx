import * as React from 'react';
import {Link, LinkProps} from "react-router-dom";
import styled from "styled-components";

const UsernameText = styled(Link)<{fontSize?: number}>`
font-weight: 600;
text-decoration: none;
font-size: ${props => props.fontSize ? props.fontSize + "px" : "14px"};
color: black;
&:hover {
text-decoration: underline;
}
`

interface Props {
    username: string
    fontSize?: number
};

export function Username(props: Props) {
    return (
        <UsernameText fontSize={props.fontSize} to={`/user/${props.username}`}>{props.username}</UsernameText>
    );
};

