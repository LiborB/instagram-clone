import styled from "styled-components";

export const CommentDescription = styled.span<{ fontSize?: number }>`
font-size: ${props => props.fontSize ? props.fontSize + "px" : "14px"};
`
