import React, { useRef, useState } from 'react';
import * as S from './style';
import { useForm, Controller } from "react-hook-form";
import { api } from "../../services";
import { useMutation } from 'react-query';
import { queryClient } from '../../services/index';
import { logoPng } from '../../assets';
import { CustomInput, InputPassword, ModalMsg, PersonalModal } from '../../components';
import { IProps } from "./types";
import { useDispatch } from 'react-redux';
import { TOKEN, USER } from '../../stores/actions';
import { NavLink } from 'react-router-dom';
import { schema } from './validation-schema';
import RecoveryPassword from './RecoveryPassword';
import { yupResolver } from '@hookform/resolvers/yup';
import {useNavigate} from 'react-router-dom';

export interface Root {
    user: User
    token: string
  }
  
  export interface User {
    name: string
    age: string
    phone_number: string
    email: string
    password: string
    state: string
    city: string
    genre: string
    breed: string
    active: boolean
    trusted: boolean
    role: string
    first_access: boolean
    settings: Settings
    _id: string
    createdAt: string
    updatedAt: string
  }
  
  export interface Settings {
    user_id: string
    service_notifications: string[]
    all_notifications: boolean
    push_token: string
    _id: string
  }
  

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ open, setOpen ] = useState(false);
    const [ recoveryPassword, setRecoveryPassword ] = useState(false);
    const [ modalError, setModalError ] = useState<boolean>(false)
    const { 
        handleSubmit,
        formState: { errors, isDirty, isValid },
        control,
        watch,
    } = useForm<IProps>({ 
        mode: "onChange",
        resolver: yupResolver(schema)
    });
    
    const postUser = async (resp: any) => {
        const response  = await api.post('/authorize', resp)
        .then((resp) => {
            if(resp.data.user.role === 'Mobile'){
                setModalError(true)
            } else {
                dispatch({type: TOKEN, token: resp.data.token})
                dispatch({type: USER, user: resp.data.user})
                window.localStorage.setItem("user", JSON.stringify(resp.data.user));
                window.localStorage.setItem("token", resp.data.token);
                navigate('/dashboard', { replace: true })
                window.location.reload()
            }
        });
        return response;
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
                                disabled={!isDirty || !isValid}
                            >
                                {isLoading == true ? 'Logando...' : 'Fazer login'}
                            </S.Button>
                        </form>
                    </div>
                
                </div>
            </S.Container>
            <ModalMsg 
                height='312px'
                modalBackground={false}
                open={open} 
                onClose={() => setOpen(!open)} 
                width={375} 
                status={''} 
                mensage='Usuário ou senha inválida'            
            />
            <ModalMsg 
                height='312px'
                modalBackground={false}
                open={modalError} 
                onClose={() => setModalError(!modalError)} 
                width={375} 
                status={''} 
                mensage='Você não tem permissão para acessar este painel!'            
            />
            <PersonalModal 
                modalBackground={false}
                open={recoveryPassword} 
                onClose={() => setRecoveryPassword(!recoveryPassword)}
                width='568px'
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