import styled from "styled-components";
import loadingSpinner from '../../../assets/loading-spinner-3-dots-fade.svg';

export function LoadingSpinner() {

    const WrapperDiv = styled.div`
        text-align: center;
        padding: 20px;
        width: 100%;
        font-size: 2em;
    `

    return <WrapperDiv>
        <img src={loadingSpinner} />
    </WrapperDiv>
}