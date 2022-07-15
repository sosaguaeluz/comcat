import styled from "styled-components";

export const Container = styled.div`
`;

export const Filsters = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 45px;

    > h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        color: ${props => props.theme.colors.dark};
    }

    > div {
        display: flex;
        > span {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            > p {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: ${props => props.theme.colors.dark};
                margin-right: 16px;
                margin-left: 60px;
            }

            > input {
                margin-right: 16px;
            }
            
            > label {
                margin-right: 10px;
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: ${props => props.theme.colors.dark};
            }
        }
    }
`;

export const Table = styled.div`
    width: 1548px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    border-bottom-left-radius: 8px;
    border-bottom-left-radius: 8px;
    margin-bottom: 28px;
    border: none !important;
    border-collapse: collapse;
`;

export const TableHead = styled.header`
    background-color: rgba(23, 115, 226, 0.2);
    color: ${props => props.theme.colors.blue};
    height: 44px;
    text-align: left;
    
    > tr {
        display: flex;
        flex-direction: row;
        > th {
            height: 44px;
            display: flex;
            flex-direction: column;
            align-items: baseline;
            justify-content: center;

            > span {
                margin-left: 10px;
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                line-height: 18px;
                > button {
                    border: none;
                    background: none;
                    margin-left: 15.5px;
                }
            }
        }
    }
`;

export const TableBody = styled.section`

    button {
        border: none;
        background: none;
        
    }
    > tr {
        box-shadow: inset 0px -1px 1px rgba(0, 0, 0, 0.2) !important;
        display: flex;
        flex-direction: row;

        > td {
            height: 68px;
            align-items: baseline;
            
            > span {
                padding: 16px 10px;
                display: flex;
                flex-direction: row;
                align-items: baseline;
                justify-content: flex-start;
                display: flex;
                align-items: center;
                font-style: normal !important;
                font-weight: 400 !important;
                font-size: 12px !important;
                line-height: 15px !important;
                color: ${props => props.theme.colors.dark} !important;
            }
        }

        > td:nth-child(5){
            > span {
                padding: 16px 10px;
                width: 610px;
                display: -webkit-box;
                word-break: break-word;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2; /* number of lines to show */
                -webkit-box-orient: vertical;
            }
        }
    }
`;