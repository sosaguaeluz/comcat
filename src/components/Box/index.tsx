import React from "react";
import * as S from './style';

interface IProps {
    padding: string,
    width?: string,
    children: any
    height?: string
}

const Box:React.FC <IProps> = (props) => {
    return (
        <S.Container
            padding={props.padding}
            width={props.width}
            // height={props.height}
        >
            {props.children}
        </S.Container>
    );
};

export default Box;