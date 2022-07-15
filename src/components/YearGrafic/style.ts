import styled from "styled-components";

export const Container = styled.div`
    > div {
        > h1 {
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 24px;
            color:${props => props.theme.colors.dark};
        }

        > p {
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color:${props => props.theme.colors.dark};
        }
    }

    > section {
        width: 100%;
        display: flex;
        justify-content: space-between;
        row-gap: 20px;

        >span {
            width: 50%;
            padding-Left: 56px;
            padding-right: 50px;
        }
    }
`;

export const ProgressBar = styled.div`
    width: 50%;
    padding-left: 50px;
    padding-right: 38px;
    flex-direction: column;
    
    span {
        display: flex;
        justify-content: space-between;
        padding-bottom: 3px;

        >p {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: ${props => props.theme.colors.gray};
        }
        >h1 {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: ${props => props.theme.colors.dark};
        }
    }
`;