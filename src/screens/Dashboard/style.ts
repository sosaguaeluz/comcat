import styled from "styled-components";

export const Main = styled.div`
 
`
export const Container = styled.div`
    >p {
        margin-bottom: 32px;
    }
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
    margin-bottom: 24px;
    
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
    width: 100%;
    margin: 0 0 64px;
`;

export const GraficItemContainer = styled.div`
    width: 100%;
    margin-bottom: 24px;
`;

export const GraficBarsContainer = styled.div`
    width: 100%;
    height: 100%;
    margin-bottom: 48px;

`;
export const TextData = styled.div`
    display: flex;
    margin-top: 48px;
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

export const GraficYearContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;

    > div { 
    width: 100%;
        > div{
            padding-right: 20px;
            margin-bottom: 24px;
                @media screen and (max-width: 1200px){
                    padding-right: 0;
                }
        }
        > div:nth-child(2){
            padding-right: 10px;           
        }
    }
`;