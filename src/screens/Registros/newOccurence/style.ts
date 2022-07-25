import styled from "styled-components";

export const Container = styled.div`
    background-color: #FFF;
    overflow: scroll;
    height: 100vh;
    padding: 20px 40px 20px 40px;
    display: flex;
    flex-direction: column;
    width: 100%;

    > div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;

        > h1 {
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 34px;
            color: ${props => props.theme.colors.dark};
        }

        > button {
            background: none;
            border: none;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    

    span {
        color: red;
    }
`;

export const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 600px;
    
    > div {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        height: auto;
        padding: 24px;
    }

`;

export const FormTop = styled.div`
    width: 1508px;
    display: flex;
    justify-content: space-between;
`;

export const FieldsetTop = styled.fieldset`
    width: 100%;
    display: flex;
    margin-bottom: 32px;

    > div {
        display: flex;
        
        > fieldset { 
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 91px;
            margin-right: 25px;
        
            > label {
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 19px;
                color: ${props => props.theme.colors.dark};
            }
        }
    }
    
`;

export const FieldMid = styled.fieldset`
    width: 650px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    >div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 25px;
        height: auto;

        > fieldset {
            height: 91px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
        }
    
        > fieldset:nth-child(1){
            width: 370px;
            flex-direction: column;
        
                > label {
                    font-style: normal;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 19px;
                    color: ${props => props.theme.colors.dark};
                    margin-right: 10px;
                }
    
                > p {
                    width: 100%;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 15px;
                    color: #2C3941;
                    opacity: 0.6;
                }
        
                > fieldset {
                    display: flex;
                    align-items: center;
        
                    > label {
                        margin-right: 24px;
                    }
        
                    > input {
                        margin-right: 8px;
                    }
                }
            }
    
            > fieldset:nth-child(2){
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 91px;
            margin-bottom: 24px;
    
            > label {
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
        }
    }
    >span {
        width: 100px;
        >img {
            width: 100%;
        }

    }
`;

export const FieldsetTopCenter = styled.fieldset`
    width: 372px;

    > label {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: ${props => props.theme.colors.dark};
    }

    > div {
        margin-top: 24px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`;

export const FieldsetTopRight = styled.fieldset`
    width: 374px;

    > div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > label {
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            color: ${props => props.theme.colors.dark};
        }
    }

    > div:nth-child(2) {
        margin-top: 24px;
        display: flex;
        flex-direction: row;
        align-items: center;

        > input {
            margin-right: 15px;
        }

        > label {
            margin-right: 24px;
        }
    }
`;

export const FormCenter = styled.fieldset`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > fieldset {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 91px;
        margin-bottom: 24px;

        > label {
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
    }
`;

export const FieldTextArea = styled.fieldset`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 24px;

    > label {
        margin-bottom: 16px;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: ${props => props.theme.colors.dark};
    }

`;

export const RadioFieldset = styled.fieldset`
    > fieldset:nth-child(1){
        display: flex;
        align-items: center;
        margin-bottom: 26px;

        > label {
            display: flex;
            align-items: center;
            margin: 0 !important;
            font-weight: 700;

            > button {
                margin-left: 5px;
                display: flex;
                align-items: center;                
            }
        }
    }

    > fieldset:nth-child(2){
        display: flex;

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

export const FormBottom = styled.fieldset`
    height: 91px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > label {
        width: 900px;
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

export const ContainerBtn = styled.fieldset`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;
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