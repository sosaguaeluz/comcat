import React, { useEffect, useState } from 'react';
import * as S from './style';
import { iconShow } from '../../../assets/index';
import ReactInputVerificationCode from 'react-input-verification-code';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import { ModalMsg, PersonalModal } from '../../../components';
import NewPassword from '../NewsPassword';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { api } from "../../../services";
import { useMutation } from 'react-query';
import { queryClient } from '../../../services/index';
import * as Yup from 'yup';
import { SENDCODE } from '../../../stores/actions';

interface IProps {
    onClose: () => void,
    closeOne: () => void
}

interface ValidateCode {
    username: string,
}

const schema = Yup.object().shape({
    username: Yup.string().required("E-mail é obrigatório")
})

const SetCode: React.FC<IProps> = ({onClose, closeOne}) => {
    const dispatch = useDispatch();
    const { sendcode, username } = useSelector((state : RootState) => state.clickState)
    const [ recoveryPassword, setRecoveryPassword ] = useState(false);
    const [ codeValue, setCodeValeu ] = useState('');
    const [ disable, setDisble ] = useState<boolean>(false);
    const [ errorMsg, setErrorMsg ] = useState(false);

    const { 
        register,
        handleSubmit,
        setValue
    } = useForm<ValidateCode>({ 
        mode: "onChange",
        resolver: yupResolver(schema)
    });

    const postSendCode = async (user: any) => {
        const { data: resp } = await api.post('/validate-recovery-code', user)
        dispatch({ type: SENDCODE, sendcode: resp})
        console.log(resp);
        return resp.data
    }

    const { mutate, isLoading, data } = useMutation(postSendCode, {
        onSuccess: () => {
            queryClient.invalidateQueries('/validate-recovery-code');
            
        },
        onError: (error) => {
            console.log(error)
        }
    });

    const onSubmit = (value: any) => {
        const obj = {
            "username" : username,
        }
        mutate(obj);
    }

    useEffect(() => {
        let regex = codeValue?.match(/\d+/g)?.join('')

        if(regex !== undefined && regex?.length === 6){
            console.log(regex);
            setDisble(false)
        } else if( regex !== undefined && regex?.length < 6 || regex === undefined){
            setDisble(true)
        } else {
            setDisble(false)
        }
    }, [codeValue]);

    setValue("username", username)

    return (
        <>
            <S.Container>
                <S.ButtonBack
                    onClick={onClose}
                >
                    <img src={iconShow} alt="" />
                </S.ButtonBack>
                <div>
                    <h1>Código de segurança</h1>
                    <p>Digite no campo abaixo o código que você recebeu.</p>
                    <S.InputCode>
                        <ReactInputVerificationCode
                            onChange={(e: any) => {
                                setCodeValeu(e)
                            }}
                            placeholder="-"
                            type="text"
                            length={6}
                            value={codeValue}                        
                        />
                    </S.InputCode>
                    <S.Form onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" {...register("username")}/>
                        <div>
                            <p>Não recebeu o código ainda?</p>
                            <button
                                id="re-send"
                                type='submit'
                                onClick={onClose}
                            >
                                Enviar novamente
                            </button>
                        </div>
                    </S.Form>
                </div>
                <S.ButtonSend
                    type="button"
                    disabled={disable}
                    onClick={() => {
                        postSendCode({
                            "username": username,
                            "code": codeValue
                        })
                            .then(() => {
                                dispatch({ type: SENDCODE, sendcode: codeValue})
                                setRecoveryPassword(true)
                            })
                            .catch(() => {
                                setErrorMsg(!errorMsg)
                            })
                    }}
                >
                    Confirmar código
                </S.ButtonSend>
            </S.Container>
            <ModalMsg 
                height='312px'
                modalBackground={true}
                open={errorMsg} 
                onClose={() => setErrorMsg(!errorMsg)} 
                width={469} 
                status=''
                mensage='Código inválido, verifique e tente novamente.'            
            />
            <PersonalModal 
                modalBackground={true}
                open={recoveryPassword} 
                onClose={() => setRecoveryPassword(false)}
                width='568px'
                padding={0}
                children={
                    <NewPassword 
                        onClose={() => setRecoveryPassword(false)}
                        closeOne={() => closeOne()}
                        closeTwo={() => onClose()}
                    />
                }
            />
        </>
    );
};

export default SetCode;