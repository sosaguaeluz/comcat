import React, {useEffect, useState} from "react";
import * as S from './style';
import { CustomSwitch, ModalMsg, PersonalModal, SwitchOptions } from "../../../components";
import { blueAlert } from "../../../assets";
import { Controller, useForm } from "react-hook-form";

interface IProps {
    onClose: () => void,
    isModal: boolean,
    itemEdit: any,
}

const ManageUser: React.FC<IProps> = ({onClose,isModal,itemEdit}) => {
    
    const {
        formState: { errors, isSubmitting, isDirty, isValid,},
        control,
        register,
        reset,
    } = useForm<FormData>({
        mode: 'onChange',
    })
    
    return (
        <>
            <PersonalModal 
                modalBackground={false}
                padding={4}
                width={469}
                open={isModal}
                onClose={onClose}
            >
                <h1>Gerenciar usuário</h1>
                <form>
                <fieldset>
                <p>Confiabilidade do usuário:</p>
                <img src={blueAlert}/>
                {/* <SwitchOptions
                    width='300px'
                    type='user'
                    // register={register}
                    // status={ string | boolean }
                    primaryLabel= 'Confiável'
                    primaryId='trusted'
                    valueOne=''
                    // checkedOne='false'
                    seccondaryLabel= 'Não confiável'
                    seccondaryId='noTrusted'
                    valueTwo=''
                    // checkedTwo='false'
                /> */}
                </fieldset>
                
                <fieldset>
                    <div>
                        <p>Status do usuário:</p>
                        <span>
                            {/* <Controller 
                                // control={control}
                                // name="active"
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
                    <S.Button
                        id='submit' 
                        type='submit'
                        disabled={!isDirty || !isValid}
                    >
                        {isSubmitting 
                                ? "Editando..."
                                : "Finalizar"
                            }
                    </S.Button>
                </S.ContainerBnt>
                </form>
                {/* <ModalMsg
                
                /> */}


               
            </PersonalModal>
        </>
    );
};


export default ManageUser