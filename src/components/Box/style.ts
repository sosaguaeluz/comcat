import styled from "styled-components";

export const Container = styled.div <{ padding: string; width?: string; height?: string}>`
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: ${props => props.padding};
    width: ${props => props.width == '' ? '100%' : props.width};
    background: ${props => props.theme.colors.white};
    height: ${props => props.height == '' ? '100%' : props.height};
`;