import styled from "styled-components";

export const DivPoppover = styled.div<{ width: string }>`
    background: ${props => props.theme.colors.white};
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    padding: 8px 8px 24px 8px;
    width: ${props => props.width};
    height: auto;

    button {
        background: none;
        border: none;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
    }
`;
   
export const CloseButton = styled.button`
    margin-bottom: 16px;
    width: 24px;
    height: 24px;
`;

export const DeleteButton = styled.button`
    height: 23px;
    color: ${props => props.theme.colors.warning};
`;

export const Button = styled.button`
    height: 23px;
    margin-bottom: 24px;
    color: ${props => props.theme.colors.dark};
`;
