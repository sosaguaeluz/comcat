import styled from "styled-components";

export const Container = styled.div`
    > h1 {
        margin-bottom: 24px;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        color: ${props => props.theme.colors.dark};
    }
    
    > div {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        height: 600px;
    }

`;

export const Header = styled.header<{ backgroundColor: string }>`
    background: #F8F8F8;
    padding: 18px 24px;
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
    padding: 18px 24px;
    display: flex;
    flex-direction: column;

    > div {
        display: flex;
        margin-bottom: 32px;
        
        > div {
            margin-right: 50px;
            height: 44px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

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
        > img {
            height: 172px;
            width: 607px;
            object-fit: cover;
            margin-right: 90px;
        }

        > span {
            height: 44px;
            width: 350px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

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

    > div:nth-child(5){
        > div {
            height: 61px;
        }
    }
`;

export const Form = styled.form`
    margin-top: 32px;

    > fieldset {
        display: flex;

        > fieldset {
            margin-right: 51px;
            > label {
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 19px;
                color: ${props => props.theme.colors.dark};
            }

            > div {
                margin-top: 24px !important;
            }
        }
    }

    > fieldset:nth-child(2) {
        display: flex;
        justify-content: space-between;
        margin-top: 32px;

        button {
            width: 274px;
            height: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600px;
            border-radius: 8px;
        }
    }
`;

export const Cancel = styled.button`
    margin-top: 32px;
    width: 274px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600px;
    border-radius: 8px;
    background: none;
    border: 1px solid ${props => props.theme.colors.warning};
    color: ${props => props.theme.colors.warning};
    font-weight: 600;
`;

export const Submit = styled.button<{ disabled: boolean }>`
    border: none;
    color: ${props => props.disabled == false ? props.theme.colors.white : '#2C3941'};
    background: ${props => props.disabled == false ? props.theme.colors.blue : '#C7C7C7'};
    font-weight: 600;
`;