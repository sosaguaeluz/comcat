import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 418px;
    padding: 40px 64px 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;

    >div {
        > h1 {
            text-align: center;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 34px;
            color: ${props => props.theme.colors.dark};
            margin-bottom: 32px;
        }
    }
`;

export const ButtonBack = styled.button`
    position: absolute;
    left: 32px;
    border-radius: 100%;
    background: none;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    width: 32px;
    height: 32px;
    border: 1px solid ${props => props.theme.colors.lightGray};
    display: flex;
    align-items: center;
    justify-content: center;

    > img {
        transform: rotate(90deg);
    }
`;
export const Form = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
export const DivForm = styled.div`
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        > h1 {
        text-align: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        color: ${props => props.theme.colors.dark};
        margin-bottom: 32px;
    }
        
        > fieldset {
            display: flex;
            flex-direction: column;
            > span {
                color: red;
                font-size: 14px;
            }
        }
`

export const ButtonSend = styled.button <{ disabled: boolean }>`
    width: 372px;
    height: 48px;
    border: none;
    margin-top: 32px;
    color: ${props => props.disabled == false ? props.theme.colors.white : '#2C3941'};
    background: ${props => props.disabled == false ? props.theme.colors.blue : '#C7C7C7'};
    border-radius: 8px;
`;

export const InputCode = styled.div`

    --ReactInputVerificationCode-itemWidth: 54px;
    --ReactInputVerificationCode-itemHeight: 54px;
    .ReactInputVerificationCode__item{
        border: none !important;
        color: ${props => props.theme.colors.dark};
        background: #F8F8F8;
    }
`;