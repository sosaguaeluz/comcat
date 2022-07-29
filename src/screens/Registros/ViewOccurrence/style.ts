import styled from "styled-components";

export const Container = styled.div`
    width: 1280px;
    height: calc(100vh - 200px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    @media screen and (max-width: 1500px) {
        width: calc(100vw - 200px);
    }

    > h1 {
        margin-bottom: 24px;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        color: ${props => props.theme.colors.dark};
    }
    
    > div {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        height: calc(100% - 140px);
    }

`;

export const Header = styled.header<{ backgroundColor: string }>`
    background: #F8F8F8;
    padding: 18px 24px;
    display: flex;
    align-items: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: auto;

    > div {
        width: 32px;
        height: 32px;
        border-radius: 100%;
        background: ${props => props.backgroundColor};
        display: flex;
        align-items: center;
        justify-content: center;

        > img {
            width: 16px;
            height: 16px;
        }
    }

    > p {
        margin-left: 12px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        display: flex;
        align-items: center;
        color: ${props => props.theme.colors.dark};
    }
`;

export const Section = styled.section`
    height: calc(100% - 68px);
    padding: 18px 24px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;

    >div{
        > div {
            display:flex;
            justify-content: flex-start;
            margin-bottom: 32px;
            width: 100%;
            height: auto;
            row-gap:32px;
            column-gap: 16px;
            flex-wrap: wrap;
            
            > div {
                width: auto;
                height: auto;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                row-gap: 8px;
    
                > p:nth-child(1){
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 17px;
                    color: ${props => props.theme.colors.dark};
                }
        
                > p:nth-child(2){
                    font-style: normal;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 19px;
                    color: ${props => props.theme.colors.dark};
                }

                > img {
                    height: 172px;
                    width: 632px;
                    object-fit: cover;
                }    
            } 
        }
        > div:nth-child(2) {

            > div:nth-child(1){
                min-width:180px;
                max-width:200px;
            }

            > div:nth-child(2){
                min-width:416px;
                max-width:416px;
                @media screen and (max-width: 1450px) {
                        min-width:416px;
                        max-width:416px;
                    }
            }
        }
        
        > div:nth-child(3) {

            > div:nth-child(1){
                min-width:416px;
                max-width:416px;
    
                @media screen and (max-width: 1450px) {
                    min-width:416px;
                    max-width:416px;
                }
            }
            > div:nth-child(2){
                min-width:180px;
                max-width:200px;
    
                
            }
        }
        
    }

    > div:nth-child(5){
        > div {
            height: 61px;
        }
    }
`;

export const Cancel = styled.button`
    margin-top: 32px;
    width: 274px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600px;
    border-radius: 8px;
    background: none;
    border: 1px solid ${props => props.theme.colors.warning};
    color: ${props => props.theme.colors.warning};
    font-weight: 600;
`;