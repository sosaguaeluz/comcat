import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 80px auto;
    grid-template-rows: 80px auto;
    overflow: hidden;

    grid-template-areas:
        "AS MH"
        "AS CT";
`;

export const Content = styled.div`
    grid-area: CT;
    width: calc(100vw - 80px);
    height: calc(100vh - 80px);
    padding: 40px;
    background: ${(props) => props.theme.colors.whiteSecconday};
    overflow-x: hidden;
`;
