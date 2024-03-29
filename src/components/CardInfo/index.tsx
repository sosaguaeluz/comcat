import React from 'react';
import * as S from './style';
import { Box } from '../index';
import { iconShow } from '../../assets/index';
import { Container } from '@mui/material';

type List = {
    name?: string,
    user_total?: number,
    label?: string,
    number?: number,
}

interface IProps {
    title?: string,
    value?: number,
    icon?: string,
    list?: List[]
    open?: boolean | any,
    setOpen?: () => void,
    type: string,
    width: string | any,
    height?: string | any,
}

const CardInfo: React.FC<IProps> = (props) => {
    return (
        <>
            <Box padding='20px'>
                <S.Container 
                    width={props.width} 
                >
                    <S.Card>
                        {props.icon != "" && (
                            <img src={props.icon} alt="" />
                        )}
                        <S.Content>
                            <div>
                                <h1>{props.title}</h1>
                                <p>{props.value}</p>
                            </div>
                            {props.type == 'list' && (
                                <button
                                    onMouseEnter={props.setOpen}
                                >
                                    {props.open == true ?
                                        <img src={iconShow} alt="" style={{
                                            transform: 'scaleY(-1)'
                                        }} />
                                        :
                                        <img src={iconShow} alt="" />
                                    }
                                </button>
                            )}
                        </S.Content>
                    </S.Card>
                </S.Container>
            </Box>
            <S.ContainerList onMouseLeave={props.setOpen}>
                {props.open == true && (
                    <S.List width={props.width}>
                        {props.list?.map((id: any) => {
                            return (
                                <div>
                                    <h1>{id.label || id.name}</h1>
                                    <p>{id.number || id.user_total}</p>
                                </div>
                            )
                        })}
                    </S.List>
                )}
            </S.ContainerList>
        </>
    );
};

export default CardInfo;