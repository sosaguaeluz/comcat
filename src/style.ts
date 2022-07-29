import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 80px auto;
    grid-template-rows: 80px auto;
    overflow: hidden;

    grid-template-areas: 
        'AS MH'
        'AS CT'
    ;
`;

export const Content = styled.div`
    grid-area: CT;
    width: 100vw;
    padding: 40px 40px 40px 120px;
    margin-left: -80px;
    background: ${props => props.theme.colors.whiteSecconday};
    overflow: hidden;

`;