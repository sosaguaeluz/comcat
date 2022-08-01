import styled from "styled-components";

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
        color: ${(props) => props.theme.colors.dark};
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
                color: ${(props) => props.theme.colors.dark};
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
                color: ${(props) => props.theme.colors.dark};
            }
        }
    }
`;

export const Container = styled.div`
    background-color: ${(props) => props.theme.colors.white};
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 8px 8px;
    padding-bottom: 10px;
`;

export const Answer = styled.span<{ answer: string }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    gap: 8px;
    height: 31px;

    ${(props) => {
        if (props.answer === "Denounce") {
            return `
                color: #FF3053 !important;
                background: rgba(255, 48, 83, 0.1);
                border-radius: 20px;
                width: 79px;
            `;
        } else if (props.answer === "Doubt") {
            return `
                color: #FF954E !important;
                background: rgba(255, 149, 78, 0.1);
                border-radius: 20px;
                width: 65px;
            `;
        } else if (props.answer === "Complaint") {
            return `
                color: #9D86ED !important;
                background: rgba(157, 134, 237, 0.1);
                border-radius: 20px;
                width: 65px;
            `;
        } else {
            return `
                color: #47DED0 !important;
                background: rgba(71, 222, 208, 0.1);
                border-radius: 20px;
                width: 80px;
            `;
        }
    }}
`;

export const Status = styled.span<{ status: string }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    height: 31px;

    ${(props) => {
        if (props.status === "NotAnswered") {
            return `
                color: #FF954E !important;
                background: rgba(255, 149, 78, 0.1);
                border-radius: 20px;
                width: 116px;
            `;
        } else {
            return `
                color: #3EA849 !important;
                background: rgba(62, 168, 73, 0.1);
                border-radius: 20px;
                width: 93px;
            `;
        }
    }}
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

export const ScrollDiv = styled.div`
    width: 100%;

    @media screen and (max-width: 1740px) {
        overflow: hidden;
        overflow-x: scroll;
    }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    @media screen and (max-width: 1740px) {
        width: 1580px;
    }

    th > span {
        > span {
            display: flex;
            align-items: center;
            justify-content: center;
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
    color: ${(props) => props.theme.colors.blue};
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
