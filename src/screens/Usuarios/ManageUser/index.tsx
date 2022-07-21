import React, {useEffect, useState} from "react";
import * as S from './style';
import {
    putUser
} from '../../../services';
import { 
    CustomSwitch,
    CustomTolltip,
    ModalMsg,
    PersonalModal,
    SwitchOptions
} from "../../../components";
import { blueAlert } from "../../../assets";
import { RootState } from '../../../stores';
import { useSelector } from 'react-redux';
import { 
    Controller, 
    useForm,
} from "react-hook-form";

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
        setValue
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
            // trusted: itemEdit?.trusted,
            // active: itemEdit?.active,
        }
    })
    function onSubmit (values: FormData) {
        putUser(token, itemEdit.id, values).then(() => {
            onClose()
            setConfirmManage(false)
            setOpen(true)
        })
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
    
    return (
        <>
            <PersonalModal 
                modalBackground={false}
                padding={5}
                width={469}
                open={isModal}
                onClose={onClose}
            >
                <S.Container>
                    <h1>Gerenciar usuário</h1>
                    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <form>
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
                            {/* <SwitchOptions
                                width='300px'
                                type='user'
                                register={register}
                                status='status'
                                primaryLabel='Confiável'
                                primaryId='trusted'
                                valueOne='trusted'
                                checkedOne={itemEdit.trusted === 'noTrusted' ? true : false}
                                seccondaryLabel= 'Não confiável'
                                seccondaryId='noTrusted'
                                valueTwo='noTrusted'
                                checkedTwo={itemEdit.trusted === 'trusted' ? true : false}
                            /> */}
                        </fieldset>
                        
                        <fieldset>
                            <div>
                                <p>Status do usuário:</p>
                                <span>
                                    {/* <Controller 
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
                                    /> */}
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
                                type='button'
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