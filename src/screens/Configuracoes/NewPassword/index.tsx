import React, { useEffect, useState } from 'react';
import * as S from './style';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CustomInput, ModalMsg, PersonalModal } from '../../../components';
import { api } from '../../../services';
import { RootState } from '../../../stores';
import { USER } from '../../../stores/actions';
import { iconShow } from '../../../assets/index';

interface IProps {
    onHide: () => void,
    isModal: boolean,
    itemEdit: any
}

interface Formdata {
    password: string,
    new_password: string
}

const NewPassword: React.FC <IProps> = ({onHide, isModal, itemEdit}) => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state : RootState) => state.clickState);
    const [ msgSuccess, setMsgSuccess ] = useState(false);
    const [ msgError, setMsgError ] = useState(false);
    const [ password, setPassword ] = useState('');

    const {
        handleSubmit,
        formState: { errors, isDirty, isValid, dirtyFields },
        control,
        watch,
        reset
    } = useForm<Formdata>({
        mode: 'onChange',
    });

    useEffect(() => {
        if(itemEdit !== undefined){
            reset(itemEdit)
        }
    }, [itemEdit]);

    const putPasswrod = (values: Formdata) => {
        const resp = api.put(`/users/change-password/${user._id}`, values, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return resp
    };

    const onSubmit = (values: Formdata) => {
        putPasswrod(values)
            .then((resp) => {
                dispatch({type: USER, user: resp.data})
                setMsgSuccess(true);
            }).catch(() => {
                setMsgError(true)
            })
    };

    return (
        <>
            <PersonalModal
                modalBackground={false}
                padding={4}
                width='568px'
                open={isModal}
                onClose={onHide}
            >
                <S.Container>
                    <div>
                        <button
                            type='button'
                            onClick={() => {
                                reset()
                                onHide()
                                setPassword('')
                            }}
                            >
                            <img src={iconShow} alt="" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Alterar senha</h1>
                        <Controller
                            control={control}
                            name="password"
                            render={({field: { onChange, onBlur, value }}) => (
                                <CustomInput
                                    id="old_password"
                                    width={372} 
                                    label="Digite sua senha atual"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    type="password"
                                />
                            )}
                        />   
                        <Controller
                            control={control}
                            name="new_password"
                            render={({field: { onChange, onBlur, value }}) => (
                                <CustomInput
                                    id="new_password"
                                    width={372} 
                                    label="Digite sua nova senha"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    type="password"
                                />
                            )}
                        /> 
                        <CustomInput
                            id="confirm_password"
                            width={372} 
                            label="Confirme sua nova senha"
                            value={password}
                            onChange={(e: any) => {
                                setPassword(e?.target?.value)
                            }}
                            onBlur={() => {}}
                            type="password"
                        />
                        <S.ButtonSubmit 
                            disabled={
                                password === watch('new_password') && watch('password') === user.password
                                ? true
                                : false
                            }
                            type='submit'
                        >
                            Alterar senha
                        </S.ButtonSubmit>
                    </form>
                </S.Container>
            </PersonalModal>
            <ModalMsg
                modalBackground={false}
                height='312px' 
                width={469}
                mensage='Senha alterada com sucesso.'
                onClose={() => {
                    setPassword('')
                    reset()
                    onHide()
                    setMsgSuccess(false)
                }}
                open={msgSuccess}
                status='success'
            />

            <ModalMsg
                modalBackground={false}
                height='312px' 
                width={469}
                mensage='Verifique as senhas digitas e tente novamente.'
                onClose={() => {
                    setMsgError(false)
                }}
                open={msgError}
                status='error'
            />
        </>
    );
};

export default NewPassword;