import styled from "styled-components";

export const Container = styled.form`
    background-color: #FFF;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    width: 100%;
    overflow: hidden;

    > h1 { 
        margin-bottom: 24px;
        height: 40px;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        color: ${props => props.theme.colors.dark};
    }
`;

export const Form = styled.form`
    width: 100%;
    height: calc(100% - 150px); 
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    
    > div {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: space-between;
        height: 100%;

        @media screen and (max-height: 1079px) {
            overflow-y: scroll;
            overflow-x: hidden;
        }
    }
`;

export const FieldService = styled.fieldset`
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    column-gap: 24px;

    > div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 32px;
        column-gap: 24px;
        
        >span {
            display: none;
            width: 0px;
            margin-right: 0px;
        }
    }

    > div:nth-child(1) {
        display: flex;
        justify-content: flex-start;
        width: auto;
        column-gap: 24px;
    }

    > div:nth-child(2) {
        width: auto;
        height: 91px;
        justify-content: flex-end;
        

        @media screen and (max-width: 1850px) {
            justify-content: flex-start;
        }
        
        > div {
            display: flex;
            justify-content: flex-end;
            width: auto;
            column-gap: 24px;
        }
    }
`;

export const FieldMid = styled.fieldset`
    width: 100%;
    display: flex;
    justify-content: space-between;
    column-gap: 24px;
    row-gap: 24px;
    margin-bottom: 24px;
    @media screen and (max-width: 1700px) {
        flex-wrap: wrap;
    }

    >div {
        display: flex;
        justify-content: space-between;
        gap: 24px;
        width: 100%;
        flex-wrap: nowrap;

        @media screen and (max-width: 1700px) {
            width: 100%;
            order: 2;
        }
    }
`;

export const FieldDate = styled.fieldset`
    width: 100%;
    max-width: 372px;
    display: flex;
    flex-direction: column;    
    gap: 24px;
    @media screen and (max-width: 1700px) {
        max-width: 100%;
        flex-direction: row;
        justify-content: space-between;
    } 
      
    > div {
        width: 100%;
        max-width: 372px;
        display: flex;
        flex-direction: column;    
        gap: 24px;
        @media screen and (max-width: 1700px) {
            width: 100%;
            max-width: 768px;
            flex-direction: row;
            justify-content: flex-start;
            height: auto;
        } 
    }
`;

export const FieldMap = styled.fieldset`
    width: 100%;
    height: 460px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
    overflow: hidden;

    >div {
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        column-gap: 24px;

        > fieldset {
            width: 372px;
        }
    }
       
    >span {
        width: 100%;
        height: 100%;
        >img {
            width: 100%;
        }

    }
`;

export const FieldTextArea = styled.fieldset`
    width: 100%;   
    max-width: 372px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > label {
        width: 100%;  
        max-width: 372px;   
        margin-bottom: 16px;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: ${props => props.theme.colors.dark};
    }
`;

export const FieldRule = styled.fieldset`
    height: 91px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > label {
        width: auto;
        height: 71px;
        max-width: 900px;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: ${props => props.theme.colors.dark};
        display: flex;
        align-items: flex-start;

        > button {
            margin-left: 5px;
            display: flex;
            align-items: center;                
        }
    }
    
    > fieldset {
        display: flex;
        align-items: center;
        > label {
            margin-left: 10px;
            margin-right: 26px;
        }
    }
`;

export const Fieldset = styled.fieldset`
    width: 100%;   
    max-width: 372px;
    min-width: 250px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > label {
        width: 100%;  
        max-width: 372px;
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: ${props => props.theme.colors.dark};

        > button {
            margin-left: 5px;
            display: flex;
            align-items: center;                
        }  
    }

    > div > div {
        height: 56px;
        > div {
            height: 56px;
        }
    }
`;

export const RadioFieldset = styled.fieldset`
    width: 372px;
    height: 91px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    > fieldset:nth-child(1){
        width: 372px;
        display: flex;
        align-items: start;
        justify-content: flex-start;
        flex-direction: column;

        > label {
            display: flex;
            align-items: start;
            justify-content: flex-start;
            margin: 0 !important;
            font-weight: 700;

            >p {
                width: auto;
                white-space: nowrap;
            }

            > button {
                margin-left: 5px;
                display: flex;
                align-items: center;             
            }
        }

        > p {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 15px;
            color: #2C3941;
            opacity: 0.6;
        }
    }

    > fieldset:nth-child(2){
        display: flex;
        width: 372px;

        > div {
            display: flex;
            align-items: center;

            > label {
                margin-left: 10px;
                margin-right: 26px;
            }
        }
    }
`;

export const ContainerBtn = styled.fieldset`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
`;

export const CancelBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 274px;
    height: 48px;
    border-radius: 6px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    background: none;
    border: 1px solid ${props => props.theme.colors.warning};
    color: ${props => props.theme.colors.warning};
`;

export const SubmitButton = styled.button<{ disabled: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 274px;
    height: 48px;
    border-radius: 6px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    border: none;
    color: ${props => props.disabled == false ? props.theme.colors.white : '#2C3941'};
    background: ${props => props.disabled == false ? props.theme.colors.blue : '#C7C7C7'};
`;

export const Select = styled.div`
`;