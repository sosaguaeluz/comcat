import styled from "styled-components";

export const Container = styled.div`
    > h1 {
        margin-bottom: 32px;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        color: ${props => props.theme.colors.dark};
    }
    
    > div {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
    }

`;

export const Header = styled.header<{ backgroundColor: string }>`
    background: #F8F8F8;
    padding: 24px;
    display: flex;
    align-items: center;

    > div {
        width: 32px;
        height: 32px;
        border-radius: 100%;
        background: ${props => props.backgroundColor};
        display: flex;
        align-items: center;
        justify-content: center;

        > img {
            width: 16px;
            height: 16px;
        }
    }

    > p {
        margin-left: 12px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        display: flex;
        align-items: center;
        color: ${props => props.theme.colors.dark};
    }
`;

export const Section = styled.section`
    padding: 24px;
    display: flex;
    flex-direction: column;

    > div {
        display: flex;
        
        > div {
            > p:nth-child(1){
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 17px;
                color: ${props => props.theme.colors.dark};
            }
    
            > p:nth-child(2){
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 19px;
                color: ${props => props.theme.colors.dark};
            }
        }

    }
`;