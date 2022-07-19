import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    > h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        margin-bottom: 32px;
        color: ${props => props.theme.colors.dark};
    }

    > div {
        > p {
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 24px;
            color: #AFAFAF;
            margin-bottom: 32px;
        }

        > div {
            background: #FFFFFF;
            border-radius: 8px;
            margin-bottom: 8px;
            padding: 24px;
            display: flex;
            align-items: flex-start;

            > img {
                width: 28px;
                height: 28px;
                margin-right: 12px;
            }

            > h2 {
                font-style: normal;
                font-weight: 600;
                font-size: 20px;
                line-height: 24px;
                color: #000000;
                width: 362px;
                margin-right: 87.25px;
            }

            > b{
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
                margin-right: 87.25px;
            }

            > p{
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #AFAFAF;
                margin-right: 87.25px;
            }
        }
    }
`;

export const ToOccurences = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: none;
    border: none;
    text-decoration: none;
    color: #1773E2;
    margin-right: 125px;

    > img {
        margin-left: 8px;
    }
`;

export const Finished = styled.button`
    border: none;
    background: none;

    > img {
        width: 28px;
    }
`;