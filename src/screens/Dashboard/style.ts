import styled from "styled-components";

export const Main = styled.div`
 
`
export const Container = styled.div`
    
`;

export const Navigation = styled.nav`
    margin-bottom: 24px;
    
    div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors.white};
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 448px;
    height: 40px; 
    margin: 2px 0px;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;

    > h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
    }

    > button {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        text-decoration-line: underline;
        color: #E40B17;
        background: none;
        border: none;
    }
`;

export const SearchBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom: 40px;
    
    > div:nth-child(1){
        width: 810px;
        display: flex;
        justify-content: space-between;
    }
    > div:nth-child(2){
        width: 376px;
        display: flex;
        justify-content: space-between;
    }

    @media screen and (max-width: 1410px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    >div:nth-child(1){
        margin-bottom: 24px;
    }
    }
`;

export const StatusBox = styled.div`
    display: flex;
    margin: 24px 0 48px;
    width: 100%;
    justify-content: space-between;
    
    @media screen and (max-width: 1700px) {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        justify-content: space-between;
        margin-bottom: 24px;
        >div{
            margin-bottom: 24px;
        }
        /* >span:nth-child(1){
            width: 45%;
            margin-bottom: 24px;
            order: 1;
            display: flex;
            justify-content: flex-start;
        }
        >span:nth-child(2){
            width: 45%;
            margin-bottom: 24px;
            order: 2;
            display: flex;
            justify-content: flex-start;
        }
        >span:nth-child(3){
            width: 45%;
            margin-bottom: 24px;
            order: 1;
            display: flex;
            justify-content: flex-end;
        }
        >span:nth-child(4){
            width: 45%;
            margin-bottom: 24px;
            order: 2;
            display: flex;
            justify-content: flex-end;      
        } */
    }
`;

export const GraficItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 32px;
    >span {
        margin-bottom: 32px;
    }
    
    @media screen and (max-width: 1660px) {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        justify-content: space-between;
    }
`;

export const TextData = styled.div`
    display: flex;
    margin-bottom: 24px;
    width: 100%;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    
    @media screen and (max-width: 1700px) {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        justify-content: space-between;    
    }
`;

export const YearGrafic = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;

    > div { 
    width: 764px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    }
    >span{
    width: 100%;

    }
`;