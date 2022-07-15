import styled from "styled-components";

export const Container = styled.div <{icon?: string}>`
    margin: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    > div {
        display: flex;
        align-items: ${props => props.icon === '' ? 'start' : 'center'};
        padding-top: 24px;
        height: 100%;
        > div {   
            margin-left: 16px;
            > h1 {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: ${props => props.theme.colors.lightGray};
            }
            > p {
                font-style: normal;
                font-weight: 600;
                font-size: 20px;
                line-height: 24px;
                color: ${props => props.theme.colors.dark};
            }
        }

        > img {
            margin-left: ${props => props.icon === '' ? '0' : '18px'};
        }
    }
    >span {
        width: 100%;
        height: 100%;
    }
`;