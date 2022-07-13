import styled from "styled-components";

export const Container = styled.div`

`;

export const Table = styled.table`
    width: 100%;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    border-bottom-left-radius: 8px;
    border-bottom-left-radius: 8px;
    margin-bottom: 28px;
    border: none !important;
    border-collapse: collapse;
    

    td, th {
        border: none !important;
    }
`;

export const TableHead = styled.thead`
    background-color: rgba(23, 115, 226, 0.2);
    color: ${props => props.theme.colors.blue};
    height: 44px;
    text-align: left;
    
    > tr {
        > th {
            > span {
                display: flex;
                align-items: center;
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

export const TableBody = styled.tbody`
    > tr {
        box-shadow: inset 0px -1px 1px rgba(0, 0, 0, 0.2) !important;

        > td {
            height: 48px;
            > span {
                display: flex;
                align-items: center;
                font-style: normal !important;
                font-weight: 400 !important;
                font-size: 12px !important;
                line-height: 15px !important;
                color: ${props => props.theme.colors.dark} !important;
            }
        }
    }
`;