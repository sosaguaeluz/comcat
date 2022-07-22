import styled from "styled-components";

export const Container = styled.div`
    background-color: ${props => props.theme.colors.white};
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding-bottom: 10px;
    width: 100%;

    > h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: ${props => props.theme.colors.dark};
        padding: 33px 24px 10px 24px;
    }
`;

export const Filsters = styled.div`
    width: 100%;
    padding: 34px 40px 11px 24px;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 1000px) {
        flex-wrap: wrap;
    }

    h1 {
        width: auto;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        color: ${props => props.theme.colors.dark};
    }
    div {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        white-space: nowrap;

        span {
            width: auto;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-bottom: 24px;
            margin-left: 60px;
    
            > p {
                width: 56px;
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: ${props => props.theme.colors.dark};
            }
    
            > input {
                width: 20px;
                margin-right: 10px;
                margin-left: 18px;
            }
            
            > label {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: ${props => props.theme.colors.dark};
            }
        }        
    }
`;

export const ScrollDiv = styled.div`
    width: 100%;
    
    @media screen and (max-width: 1919px) {
        width: 100%;
        overflow: hidden;
        overflow-X: scroll;
    }
`

export const Table = styled.table`
    width: 100%;    
    border-collapse: collapse;
    border-spacing: 0;

    @media screen and (max-width: 1919px) {
        width: 1760px;
    }

    th > span {
        > span {
            display: flex;
            align-items: center;
            margin-left: 12px;
        }
    }
    td {
        height: 47px;     
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    td > span {
        display: flex;
        align-items: center;
        margin-left: 10px;
        line-height: 18px;        
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

export const Options = styled.span`
    > button {
        display: flex;
        justify-content: center;
        border: none;
        background: none;
        width: 24px;
        margin-left: 10px;
    }
`;

export const Answer = styled.td<{ answer: string }>`
    width: 24px;
    > span {
        display: flex;
        justify-content: start;
        align-items: center;
        
        > p {
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 23px;
            padding: 4px 12px;
            border-radius: 20px;

            ${props => {
                if(props.answer === 'Denounce'){
                    return `
                        color: #FF3053 !important;
                        background: rgba(255, 48, 83, 0.1);
                    `;
                } else if (props.answer === 'Denounce'){
                    return `
                        color: #FF954E !important;
                        background: rgba(255, 149, 78, 0.1);
                    `;
                } else if (props.answer === 'Complaint'){
                    return `
                        color: #9D86ED !important;
                        background: rgba(157, 134, 237, 0.1);
                    `;
                } else {
                    return `
                        color: #47DED0 !important;
                        background: rgba(71, 222, 208, 0.1);
                    `;
                }
            }}
        }
    }
`;

export const Status = styled.td<{ status: string }>`
    width: 150px;

    > span {
        display: flex;
        justify-content: start;
        align-items: center;
        
        > p {
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 23px;
            padding: 4px 12px;
            border-radius: 20px;

            ${props => {
                if(props.status === 'NotAnswered'){
                    return `
                        color: #FF954E !important;
                        background: rgba(255, 149, 78, 0.1);
                    `;
                } else {
                    return `
                        color: #3EA849 !important;
                        background: rgba(62, 168, 73, 0.1);
                    `;
                }
            }}
        }
    }
`;