import styled from "styled-components";

export const Container = styled.div`
    > div {
        display: flex;
        position: relative;
        
        > button {
            position: absolute;
            border: 1px solid ${props => props.theme.colors.gray};
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
            background: none;
            border-radius: 100%;
            width: 32px;
            height: 32px;

            > img {
                transform: rotate(90deg);
                width: 24px;
            }
        }

        > h1 {
            text-align: center;
        }
    }

    > form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 312px;

        > h1 {
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 34px;
            color: ${props => props.theme.colors.dark};
        }
    }
`;

export const ButtonSubmit = styled.button<{ disabled: boolean }>`
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    width: 274px;
    height: 48px;
    border: none;
    color: ${props => props.disabled == false ? props.theme.colors.white : '#2C3941'};
    background: ${props => props.disabled == false ? props.theme.colors.blue : '#C7C7C7'};
`;