import styled from 'styled-components';

export const Container = styled.div`
    width: 155px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
        height: 38px;
        width:100%;
    }
`;

export const CheckedActive = styled.label<{ checked: boolean }>`
        font-weight: ${props => props.checked ===true? 600 : 400} !important;
        width: 40px;
        font-style: normal;
        font-size: 16px;
        line-height: 18px;
        color: #2C3941;
        cursor: pointer;
        text-align: center;
`;

export const CheckedInative = styled.label<{ checked: boolean }>`
        font-weight: ${props => props.checked ===true? '400' : '600'} !important;
        width: 53px;
        font-style: normal;
        font-size: 16px;
        line-height: 18px;
        color: #2C3941;
        cursor: pointer;
        text-align: center;
`;