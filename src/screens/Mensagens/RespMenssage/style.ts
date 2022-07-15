import styled from "styled-components";

export const Container = styled.div`
    > div {
        > h1 {
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 34px;
            margin-bottom: 24px;
            text-align: center;
            color: ${props => props.theme.colors.dark};
        }

        > div {
            background: #FFFFFF;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
            border-radius: 8px;

            > header {
                background: #F8F8F8;
                border-radius: 8px 8px 0px 0px;
                padding: 24px;

                > h1 {
                    font-style: normal;
                    font-weight: 600;
                    font-size: 18px;
                    line-height: 22px;
                    color: ${props => props.theme.colors.dark};
                }
            }

            > section {
                display: flex;
                padding: 24px;
                
                > div {
                    margin-right: 73px;

                    > p:nth-child(1){
                        font-style: normal;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 17px;
                        margin-bottom: 8px;
                    }
                }

                > div:nth-child(4){
                    margin-right: 0 !important;
                }
            }
        }
    }
`;

export const Text = styled.p`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.dark};
`;

export const Answer = styled.p<{ answer: string }>`
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 23px;
    padding: 4px 12px;
    border-radius: 20px;

    ${props => {
        if(props.answer === 'Denounce'){
            return `
                color: #FF3053;
                background: rgba(255, 48, 83, 0.1);
            `;
        } else if (props.answer === 'Denounce'){
            return `
                color: #FF954E;
                background: rgba(255, 149, 78, 0.1);
            `;
        } else if (props.answer === 'Complaint'){
            return `
                color: #9D86ED;
                background: rgba(157, 134, 237, 0.1);
            `;
        } else {
            return `
                color: #47DED0;
                background: rgba(71, 222, 208, 0.1);
            `;
        }
    }}
`;

export const Email = styled.div`
    background: #C7C7C7;
    border: 1px solid #AFAFAF;
    border-radius: 8px;
    width: 372px;
    margin-top: 32px;
    margin-bottom: 24px;
    padding: 8px 16px;

    >p:nth-child(1){
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #2C394170;
    }

    > p:nth-child(2){
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #2C394180;
    }
`;

export const ContainerBtn = styled.fieldset`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 48px;
    button { 
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
    }

    > button:nth-child(1) {
        color: #E40B17;
        background: none;
        border: 1px solid #E40B17;
    }

    >Button:nth-child(2){
        background: #1773E2;
        border-radius: 8px;
        color: #FFFFFF;
    }
`;;