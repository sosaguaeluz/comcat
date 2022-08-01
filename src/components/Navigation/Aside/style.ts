import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    grid-area: AS;
    height: 100vh;
    width: 80px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: 1px 0px 10px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999 !important;
`;

export const logo = styled.div`
    height: 80px;
    padding: 20px 0 20px 42px;

    > img {
        width: 156.83px;
        height: 39.44px;
    }
`;

export const Navigation = styled.nav<{ hamburger: boolean }>`
    width: ${(props) => (props.hamburger === true ? "100%" : "292px")};
    display: flex;
    flex-direction: column;
    padding: 40px 20px;
    > span > span {
        color: ${(props) => props.theme.colors.white};
        background: #e40b17;
    }
`;

export const Link = styled(NavLink)<{ hamburger: boolean }>`
    background: ${(props) => props.theme.colors.whiteSecconday};
    color: ${(props) => props.theme.colors.gray};
    text-decoration: none;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${(props) =>
        props.hamburger === true ? "center" : "flex-start"};
    border-radius: 8px;
    width: ${(props) => (props.hamburger === true ? "100%" : "252px")};
    height: 40px;
    margin-bottom: 16px;
    transition: ease-in 0.5s;

    > img {
        filter: opacity(0.4) drop-shadow(0 0 0);
        width: 20px;
        transition: ease-in 0.5s;
        margin-left: ${(props) => (props.hamburger === true ? "0" : "12px")};
    }
    > div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        > p {
            margin-left: 16px;
        }
        > div {
            margin-right: 16px;
        }
    }

    :hover,
    &.active {
        color: ${(props) => props.theme.colors.white};
        background: ${(props) => props.theme.colors.blue};
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;

        > img {
            filter: brightness(0) invert(1);
            width: 24px;
        }
    }

    :hover {
        opacity: 0.5;
        > img {
            width: 24px;
        }
    }
`;

export const Hamburguer = styled.button`
    margin: 20px 25px;
    background: #ffffff;
    border: none;

    > img {
        width: 25px;
        height: 25px;
    }
`;

export const Close = styled.button`
    margin: 20px;
    background: #ffffff;
    border: none;

    > img {
        width: 25px;
        height: 25px;
    }
`;

export const Flex = styled.div`
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Alert = styled.div`
    background: #e40b17;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;

    > p {
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.1px;
        color: #ffffff;
    }
`;
