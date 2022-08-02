import React, { useEffect, useState } from 'react';
import * as S from './style';
import { iconShow } from '../../../assets/index';
import { CustomInput, ModalMsg } from '../../../components';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { api } from "../../../services";
import { useMutation } from 'react-query';
import { queryClient } from '../../../services/index';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';

interface NewPassword {
    username: string,
    code: string,
    password: string,
}

interface IProps {
    onClose: () => void,
    closeOne: () => void,
    closeTwo: () => void
}

const schema = Yup.object().shape({
    password: Yup.string().required("Senha é obrigatória")
})

const NewPassword: React.FC <IProps> = ({onClose, closeOne, closeTwo}) => {
    const { sendcode, username } = useSelector((state : RootState) => state.clickState);
    const [ password, setPassword ] = useState<string>('');
    const [ enable, setEnable ] = useState<boolean>(true);
    const [ successMsg, setSuccess ] = useState<boolean>(false);

    const { 
        handleSubmit,
        control,
        watch
    } = useForm<NewPassword>({ 
        mode: "onChange",
        resolver: yupResolver(schema)
    });

    const postNewPassword = async (user: any) => {
        const resp = await api.post('/change-password', user)
        return resp
    };

    const { mutate, isLoading} = useMutation(postNewPassword, {
        onSuccess: () => {
            queryClient.invalidateQueries('change-password');
            setSuccess(true);
        },
        onError: (error) => {
            console.log(error)
        }
    });

    const onSubmit = (value: any) => {
        const obj = {
            "username": username,
            'code': sendcode,
            "password": value.password
        }
        mutate(obj);
    };

    const watchPassword = watch('password');

    useEffect(() => {
        if(watchPassword === password && watchPassword !== '' && password !== ''){
            setEnable(true)
        } else {
            setEnable(false)
        }
    }, [watchPassword, password]);

    return (
        <>
            <S.Container>
                <S.ButtonBack
                    onClick={() => onClose()}
                >
                    <img src={iconShow} alt="" />
                </S.ButtonBack>
                <S.Form onSubmit={handleSubmit(onSubmit)}>
                    <S.DivForm>
                        <h1>Alterar senha</h1>
                        <fieldset>
                            <CustomInput 
                                id="new_password"
                                label='Digite sua senha' 
                                onChange={(e: any) => {
                                    setPassword(e.target.value)
                                    console.log(e.target.value);
                                }} 
                                onBlur={() => {}}  
                                type='password' 
                                value={password} 
                                width={372}
                            />
                        </fieldset>
                        <fieldset style={{marginTop: '24px'}}>
                            <Controller                                 
                                control={control}
                                name='password'
                                defaultValue=""
                                render={({field: { onChange, onBlur, value }}) => (
                                    <CustomInput 
                                        id="confirm_password"
                                        label='Digite sua senha' 
                                        onChange={onChange} 
                                        onBlur={onBlur}  
                                        type='password' 
                                        value={value} 
                                        width={372}
                                    />
                                )}
                            />
                        </fieldset>
                        {watchPassword != password && watchPassword == '' && password == '' && (
                            <span>As senhas devem ser identicas</span>
                        )}
                    </S.DivForm >
                    <S.ButtonSend
                        type="submit"
                        disabled={!enable}
                    >
                        {isLoading == true ? 'Salvando senha...' : 'Salvar senha'}
                    </S.ButtonSend>
                </S.Form>
            </S.Container>

            <ModalMsg 
                height='280px'
                modalBackground={true}
                open={successMsg} 
                onClose={() => {
                    setSuccess(false)
                    closeOne();
                    closeTwo();
                }} 
                width={568} 
                status='success'
                mensage='Senha alterada com sucesso.'            
            />
        </>
    );
};

export default NewPassword;