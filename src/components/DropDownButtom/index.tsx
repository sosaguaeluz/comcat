import React from 'react';
import { iconShow } from '../../assets/index';
import * as S from './style';
import IconButton from '@mui/material/IconButton';

const DropDownButtom: React.FC= (props) => {
    return (
        <>
            <IconButton
                id="dropDownButtom"
                style={{padding: '0',}}
            >
                <S.Buttom>
                    <img src={iconShow} alt="" />
                </S.Buttom>
            </IconButton>
        </>
    )
}

export default DropDownButtom;