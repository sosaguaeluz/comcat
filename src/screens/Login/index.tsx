import React, { useRef, useState } from 'react';
import * as S from './style';
import { useForm, Controller } from "react-hook-form";
import { api } from "../../services";
import { useMutation } from 'react-query';
import { queryClient } from '../../services/index';
import { logoPng } from '../../assets';
import { CustomInput, ModalMsg, PersonalModal } from '../../components';
import { IProps } from "./types";
import { useDispatch } from 'react-redux';
import { TOKEN, USER } from '../../stores/actions';
import { NavLink } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from './validation-schema';
import RecoveryPassword from './RecoveryPassword';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const [ open, setOpen ] = useState(false);
    const [ recoveryPassword, setRecoveryPassword ] = useState(false);
    const ref = useRef<any>(null)
    const { 
        handleSubmit,
        formState: { errors, isDirty, isValid },
        control,
        watch,
        getValues,
        getFieldState
    } = useForm<IProps>({ 
        mode: "onChange",
        resolver: yupResolver(schema)
    });
    
    const postUser = async (data: IProps) => {
        const { data: response } = await api.post('/authorize', data);
        dispatch({type: TOKEN, token: response.token})
        dispatch({type: USER, user: response.user})
        console.log(data);
        
        return response.data;
    };

    const { mutate, isLoading } = useMutation(postUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
        onError: () => {
            setOpen(!open);
        }
    });

    const onSubmit = (values: IProps) => {
        const obj = {
            "username": values.username,
            "password": values.password
        }
        mutate(obj);
    };

    const password =  watch('password');
    const username = watch('username');

    return (
        <>
            <S.Container>
                <div>
                    <div>
                        <img src={logoPng} alt="" />
                        <p>Faça seu login</p>
                        <h1>Para acessar a nossa plataforma!</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset>
                            <Controller 
                                control={control}
                                name='username'
                                defaultValue=""
                                render={({field: { onChange, onBlur, value }}) => (
                                    <span>
                                        <div>
                                            <CustomInput 
                                                label='Digite seu e-mail ou celular' 
                                                onChange={onChange} 
                                                onBlur={onBlur} 
                                                type='text' 
                                                value={value}
                                                width={372}  
                                                id="username"         
                                            />
                                        </div>
                                        {errors?.username && (
                                            <span>
                                                {errors?.username?.message}
                                            </span>
                                        )}
                                    </span>
                                )}
                            />
                            </fieldset>
                            <fieldset>
                            <Controller 
                                control={control}
                                name='password'
                                defaultValue=""
                                render={({field: { onChange, onBlur, value }}) => (
                                    <span>
                                        <div>
                                            <CustomInput 
                                                label='Digite sua senha' 
                                                onChange={onChange} 
                                                onBlur={onBlur}  
                                                type='password' 
                                                value={value} 
                                                width={372}
                                                id="password"                      
                                            />
                                        </div> 
                                        {errors?.password && (
                                            <span>
                                                Senha é obrigatória
                                            </span>
                                        )}
                                    </span>
                                )}
                            />                      
                            </fieldset>
                            
                            <S.RemeberPassword
                                id="remeber_password"
                                type='button'
                                onClick={() => setRecoveryPassword(!recoveryPassword)}
                            >
                                Esqueci minha senha
                            </S.RemeberPassword>
                            <S.Button
                                id='submit' 
                                type='submit'
                                onClick={() => {
                                    ref?.current?.click()
                                }}
                                disabled={!isDirty || !isValid}
                            >
                                {isLoading == true ? 'Logando...' : 'Fazer login'}
                            </S.Button>
                            <NavLink to="/" style={{display: 'none'}} ref={ref}/>
                        </form>
                </div>
                
                <ModalMsg 
                    height='312px'
                    modalBackground={false}
                    open={open} 
                    onClose={() => setOpen(!open)} 
                    width={375} 
                    status={''} 
                    mensage='Usuário ou senha inválida'            
                />
            </div>
            </S.Container>
            <PersonalModal 
                modalBackground={false}
                open={recoveryPassword} 
                onClose={() => setRecoveryPassword(!recoveryPassword)}
                width={568}
                padding={0}
                children={
                    <RecoveryPassword 
                        onClose={() => setRecoveryPassword(!recoveryPassword)}
                    />
                }
            />  
        </>
    );
};

export default Login;