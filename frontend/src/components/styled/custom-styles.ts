import styled from "styled-components";
import {Link} from "react-router-dom";

export const CommentDescription = styled.span<{ fontSize?: number }>`
font-size: ${props => props.fontSize ? props.fontSize + "px" : "14px"};
`

export const CustomLink = styled(Link)<{fontSize?: number}>`
font-weight: 600;
text-decoration: none;
font-size: ${props => props.fontSize ? props.fontSize + "px" : "14px"};
color: black;
&:hover {
text-decoration: underline;
}
`

export const CustomLinkSpan = styled.span<{fontSize?: number}>`
cursor: pointer;
font-weight: 600;
text-decoration: none;
font-size: ${props => props.fontSize ? props.fontSize + "px" : "14px"};
color: black;
&:hover {
text-decoration: underline;
}
`
