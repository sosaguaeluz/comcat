import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    
    > h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        margin-top: 12px;
        color: ${props => props.theme.colors.dark};
    }

    > div {
        
        > p {
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 24px;
            color: #AFAFAF;
            margin: 32px 0;
        }

        > div {
            background: #FFFFFF;
            border-radius: 8px;
            margin-bottom: 8px;
            padding: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            >span {
                display: flex;
                > img {
                    width: 28px;
                    height: 28px;
                    margin-right: 12px;
                }
                > h2 {
                    width: 362px;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 20px;
                    line-height: 24px;
                    color: #000000;
                    margin-right: 87.25px;
                    padding: 2px 0 2px;
                    @media screen and (max-width: 1600px) {
                        width: 250px;
                        margin-right: 24px;

                    }
                }
            }

            > b{
                width: 100%;
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
                margin-right: 87.25px;
                @media screen and (max-width: 1600px) {
                    margin-right: 24px;
                }
            }

            > p{
                width: 186px;
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #AFAFAF;
                margin-right: 87.25px;
                white-space: nowrap;
                @media screen and (max-width: 1600px) {
                    margin-right: 24px;
                }
            }
        }
    }
`;

export const ToOccurences = styled(NavLink)`
    width: 230px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: none;
    border: none;
    text-decoration: none;
    color: #1773E2;
    margin-right: 87.25px;
    white-space: nowrap;
    
    @media screen and (max-width: 1600px) {
        margin-right: 24px;
    }

    > a {
        width: 200px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        white-space: nowrap;
    }

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