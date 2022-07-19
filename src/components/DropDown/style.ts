import styled from "styled-components";


export const Container = styled.div <{ height?: string, width?: string}>`
    @media screen and (max-width: 1560px) {
        height: 68px;
    }
    @media screen and (max-width: 1200px) {
        height: 48px;
    }
`;

export const Card = styled.div`
    display: flex;
    height: 100%;
    margin: 0;
    padding: 0 0 0 20px;
    > img {
        margin-right: 12px;
        width: 48px;
    }
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        > h1 {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: ${props => props.theme.colors.lightGray};
            @media screen and (max-width: 1560px) {
                padding-bottom: 22px;
            }
            @media screen and (max-width: 1200px) {
                padding-bottom: 0;
            }
        }
        > p {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color: ${props => props.theme.colors.dark};
        }
    }
`;

export const List = styled.div`
    width: 100%;
    padding: 28px 0 11px 0;
    background: ${props => props.theme.colors.white};
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 0px 0px 8px 8px;
    
    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;  
        min-height: 19px;
        margin-bottom: 9px;

        > h1 {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            color: ${props => props.theme.colors.dark};
            margin-left: 20px;
        }

        > p {
            color: ${props => props.theme.colors.blue};
            font-size: 16px;
            font-weight: 600;
            line-height: 19px;
            margin-right: 20px;
            flex-direction: row-reverse;
        }
    }
`;