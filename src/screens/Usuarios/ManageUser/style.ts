import styled from "styled-components";

export const Container = styled.div`
    width: 389px;
    height: 307px;
    text-align: center;


    > h1 {
        margin-bottom: 32px;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        color: ${props => props.theme.colors.dark};
    }
    > form {
        >fieldset {
            >span {
                display: flex;
                align-items: center;
                margin-bottom: 11px;
                >button {
                    width: 13.3px;
                    height: 13.3px;
                    align-items:center;
                    text-align: center;
                }
                >p{
                    margin-right: 10px;
                }
            }
            >div {
                display: flex;
                align-items: center;
                
            }
        }

    }
    > p {
        margin-bottom: 16px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: ${props => props.theme.colors.dark};
    }
`;
export const ContainerBnt = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 32px;

    button { 
        width: 177px;
        height:48px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
    }

    >button:nth-child(1){
        color: ${props => props.theme.colors.warning};
        border: 1px solid ${props => props.theme.colors.warning};
        background: transparent;
    }

    > button:nth-child(2) {
        border: none;
        background: ${props => props.theme.colors.blue};
        color: ${props => props.theme.colors.white};
    }
`;