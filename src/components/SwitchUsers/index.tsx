import React, { useState } from 'react';
import * as S from './style';
import { UseFormRegister } from 'react-hook-form';
import {
    disabledError,
    disabledSuccess,
    trusted as trustedImg,
    alertRed
} from '../../assets/index';

interface Register {
    status?: string,
}

interface RegisterUser {
    trusted?: string,
    active?: string
}

interface IProps {
    primaryLabel: string,
    seccondaryLabel: string,
    seccondaryId: string,
    checked: boolean,
    status: string,
    register: any,
    width: string,
};

const SwitchUser: React.FC <IProps> = ({
    primaryLabel, 
    seccondaryLabel, 
    seccondaryId, 
    checked,
    register,
    width,
}) => {
    const [ value, setValue ] = useState(checked)
    return (
        <S.Container width={width}>
            <input 
                {...register('trusted')}
                type="checkbox" 
                id={seccondaryId} 
                defaultValue={checked}
                value={value}
                style={{display: 'none'}}
            />
            <S.Approve  
                htmlFor={seccondaryId} 
                value={value}
                onClick={() => {
                    setValue(Boolean(true))
                }}
            >
                <img src={value === true ? trustedImg : disabledSuccess} alt="" />
                {seccondaryLabel}
            </S.Approve>
            <S.Repprove
                htmlFor={seccondaryId} 
                value={value}
                onClick={() => {
                    setValue(Boolean(false))
                }}
            >
                <img src={value === false ? alertRed : disabledError} alt="" />
                {primaryLabel}
            </S.Repprove>

        </S.Container>
    );
};

export default SwitchUser;