import React, {useEffect, useState} from "react";
import * as S from './style';
import {
    putUser, queryClient
} from '../../../services';
import { 
    CustomSwitch,
    CustomTolltip,
    ModalMsg,
    PersonalModal,
    SwitchUser
} from "../../../components";
import { blueAlert } from "../../../assets";
import { RootState } from '../../../stores';
import { useSelector } from 'react-redux';
import { 
    Controller, 
    useForm,
} from "react-hook-form";
import { FormData } from "./types";
import { useMutation } from "react-query";
import { editUser } from "../../../services/hooks/useUser";

interface IProps {
    onClose: () => void,
    isModal: boolean,
    itemEdit: any,
}

const ManageUser: React.FC<IProps> = ({onClose,isModal,itemEdit}) => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const [ open, setOpen ] = useState(false);
    const [ confirmManage, setConfirmManage ] = useState(false);

    const {
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid,},
        control,
        register,
        reset,
        setValue,
        watch
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
            trusted: itemEdit?.trusted,
            active: itemEdit?.active,
        }
    })

    const { mutate } = useMutation(editUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('users')
            onClose()
            setConfirmManage(false)
            setOpen(true)
        }
    })

    function onSubmit (values: any) {
        let obj = Object.assign(values, {
            "trusted": Boolean(watch('trusted'))
        })
        mutate(values)
    };
    useEffect(() => {
        if(!itemEdit) return;

        Object.keys(itemEdit).map((keys) => {
            let key = keys as keyof unknown;
            setValue(key as any, itemEdit[key] as any)
        })
    }, [itemEdit, setValue]);

    useEffect(() => {
        if (!isModal) {
            reset()
        }
    },[isModal,reset])

    console.log(watch('trusted'), 'DDD')
    
    return (
        <>
            <PersonalModal 
                modalBackground={false}
                padding={5}
                width='469px'
                open={isModal}
                onClose={onClose}
            >
                <S.Container>
                    <h1>Gerenciar usuário</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            <span>
                                <p>Confiabilidade do usuário:</p>
                                <CustomTolltip 
                                    img={<img 
                                        style={{width: '13.3px', height: '13.3px', }} 
                                        src={blueAlert} alt="" 
                                    />}
                                    title="Usuários que são marcados como não confiáveis precisarão passar pela aprovação dos moderadores antes de serem publicadas"
                                />
                            </span>                            
                            <SwitchUser
                                register={register}
                                checked={itemEdit?.trusted}
                                width='300px'
                                status={watch('trusted')}
                                primaryLabel='Confiável'
                                seccondaryLabel='Não confiável'
                                seccondaryId='true'
                            />
                        </fieldset>
                        
                        <fieldset>
                            <div>
                                <p>Status do usuário:</p>
                                <span>
                                    <Controller 
                                        control={control}
                                        name="active"
                                        render={({field: { onChange, onBlur, value }}) => (
                                            <CustomSwitch
                                                id="active"
                                                leftLabel="Inativo"
                                                rightLabel="Ativo"
                                                value={value}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                defaultValue={value == false ? false : true}
                                            />
                                        )}
                                    />
                                </span>
                            </div>
                        </fieldset>

                        <S.ContainerBnt>
                            <button 
                                id='Cancel'
                                type="button" 
                                onClick={() => {
                                    reset()
                                    onClose()
                                }}
                            >
                                Cancelar
                            </button>  
                            <button 
                                id='submit' 
                                type='submit'
                                onClick={() => {
                                    setConfirmManage(!confirmManage)
                                }}
                            >
                                Finalizar
                            </button>
                        </S.ContainerBnt>
                    </form>
                </S.Container>
            </PersonalModal>
            <ModalMsg
                modalBackground={false}
                open={open}
                width={469}
                height='312px'
                mensage='O usuário foi gerenciado com sucesso!'
                onClose={() => {
                    setOpen(!open)
                    onClose()
                }}
                status={'success'}
            />
        </>
    );
};


export default ManageUser