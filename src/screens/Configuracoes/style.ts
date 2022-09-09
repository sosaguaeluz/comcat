import styled from "styled-components";

export const Container = styled.div`
    > div:nth-child(1) {
        display: flex;
        justify-content: space-between;
        align-items: center;

        > h1 {
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color: ${(props) => props.theme.colors.dark};
        }

        > div {
            display: flex;
            align-items: center;
            text-align: center;

            button {
                border-radius: 8px;
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 19px;
                display: flex;
                align-items: center;
                text-align: center;
                justify-content: center;
                width: 274px;
                height: 48px;
            }

            > button:nth-child(1) {
                background: none;
                border: 1px solid ${(props) => props.theme.colors.blue};
                color: ${(props) => props.theme.colors.blue};
                margin-right: 10px;
            }
            > button:nth-child(2) {
                border: none;
                background: ${(props) => props.theme.colors.darkBlue};
                color: ${(props) => props.theme.colors.white};
            }
        }
    }
`;

export const Card = styled.div`
    background: ${(props) => props.theme.colors.white};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    margin-top: 40px;
    border-radius: 8px;

    > div:nth-child(1) {
        background: #f8f8f8;
        padding: 32px 40px;
        border-top: 8px;
        margin-bottom: 4px;
        border-radius: 8px 8px 0 0;

        > p {
            padding: 4px 12px;
            background: #ff954e;
            border-radius: 20px;
            display: inline-block;
            color: ${(props) => props.theme.colors.white};
        }

        > h1 {
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 34px;
            color: ${(props) => props.theme.colors.dark};
        }
    }

    > div:nth-child(2) {
        background: ${(props) => props.theme.colors.white};
        display: flex;
        padding: 32px 40px;
        border-bottom: 8px;
        border-radius: 0 0 8px 8px;

        > span {
            > p:nth-child(1) {
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                line-height: 18px;
                color: ${(props) => props.theme.colors.blue};
                margin-bottom: 6px;
            }

            > p:nth-child(2) {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: ${(props) => props.theme.colors.dark};
            }
        }
    }
`;
