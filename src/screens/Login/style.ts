import styled from "styled-components";
import { loginBg } from "../../assets";

export const Container = styled.div`
    > div {
        height: 100vh;
        background: url(${loginBg}) no-repeat center center fixed;
        background-size: cover;
        display: flex;

            > div { 
                background: ${props => props.theme.colors.white};                         

                > img { 
                    width: 191.16px;
                    height: 48.07px;
                    margin-top: 4px;
                    margin-bottom: 44px;
                }

                > p { 
                    font-style: normal;
                    font-weight: 400;
                    font-size: 24px;
                    line-height: 29px;
                    display: flex;
                    align-items: center;
                    color: #AFAFAF;
                    margin-bottom: 16px;
                }

                > h1 { 
                    font-style: normal;
                    font-weight: 600;
                    font-size: 32px;
                    line-height: 45px;
                    color: #0A3466;
                    width: 300px;
                    margin-bottom: 43px;
                }

                > form {
                    > fieldset {
                        
                        > span {  
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-start;
                            margin-bottom: 24px;
                            position: relative;
                            
                            > span { 
                                padding-top: 5px;
                                color: red;
                                font-style: normal;
                                font-weight: 400;
                                font-size: 12px;
                                line-height: 15px;
                                position: absolute;
                                margin-top: 56px;
                            }
                        }
                    }
                    > div {
                        margin-bottom: 24px;
                    }
                }

                @media screen and (max-width: 1600px) {
                margin-top: 80px;
                margin-left: 100px;
                padding: 40px 40px 40px 40px;
                width: 450px;
                height: 620px;
                border-radius: 20px;
                }

                @media screen and (min-width: 1600px) {
                margin-top: 120px;
                margin-left: 140px;
                padding: 60px 65px 60px 65px;
                width: 500px;
                height: 670px;
                border-radius: 30px;
                }

                @media screen and (min-width: 1920px) {
                margin-top: 177px;
                margin-left: 186px;
                padding: 89px 98px 83px 98px;
                width: 568px;
                height: 727px;
                border-radius: 40px;
            }
        }
    }
`;

export const Button = styled.button <{ disabled: boolean }>`
        width: 100%;
        height: 48px;
        border: none;
        border-radius: 8px;
        color: ${props => props.disabled == false ? props.theme.colors.white : '#2C3941'};
        background: ${props => props.disabled == false ? props.theme.colors.gradient : '#C7C7C7'};
`;

export const RemeberPassword = styled.button`
    text-align: right;
    border-bottom: 1px solid #0A3466;
    color: #0A3466;
    cursor: pointer;
    margin-bottom: 48px;
    float: right;
    cursor: pointer;
    background: none;
    border: none;

    :hover {
        background: none;
    }
`;