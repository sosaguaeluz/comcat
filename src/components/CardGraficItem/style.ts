import styled from "styled-components";

export const Card = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
`;

export const Container = styled.div <{icon?: string, backgroundColor: string}>`
    margin: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    > div {
        display: flex;
        align-items: ${props => props.icon === '' ? 'start' : 'center'};
        padding-top: 24px;
        height: 100%;

        > figure {
            background: ${props => props.backgroundColor};
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-left: 16px;

            > img {
                margin-left: ${props => props.icon === '' ? '0' : '18px'};
                width: 35px;
                margin: 0;
            }
        }
        > div {   
            margin-left: 16px;
            
            > h1 {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #AEAEAE;
            }
            > p {
                font-style: normal;
                font-weight: 600;
                font-size: 20px;
                line-height: 24px;
                color: #000000;
            }
        }
    }
    >span {
        width: 100%;
        height: 100%;
    }
`;