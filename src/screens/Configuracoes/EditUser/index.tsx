import React, { useEffect, useState, useRef } from 'react';
import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, useFieldArray,  } from "react-hook-form";
import { 
    CustomInput,
    CustomSelect,
    CustomSwitch, 
    ModalMsg, 
    PersonalModal 
} from '../../../components/index';
import { 
    api, 
    useUf, 
    useCity,
    postUser,
    putUser, 
    queryClient,
} from '../../../services';
import { RootState } from '../../../stores';
import { FormData, IProps } from "./types";
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';

import {regex, numberClean} from '../../../services/functions/regex'
import { yupResolver } from "@hookform/resolvers/yup";
import { on } from 'events';
import { USER } from '../../../stores/actions';

const EditForm: React.FC <IProps> =  ({onClose, itemEdit, isModal}) => {
    const dispatch = useDispatch();
    const [ user, setUser ] = useState<object | any>(null);
    const [ successMsg, setSuccessMsg ] = useState(false);
    const [ errMsg, setErrMsg ] = useState(false);

    const [ state, setState ] = useState('');
    const [ ufValue, setUfValue ] = useState<string>('');
    const [ cityValue, setCityValue ] = useState<string>('');

    const { data: dataUf } = useUf();
    const { data: dataCity } = useCity(ufValue);

    const localUser = window.localStorage.getItem('user')

    useEffect(() => {
        if(localUser){
            setUser(JSON.parse(localUser))
        }
    }, [localUser])

    const { 
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid, dirtyFields  },
        control,
        watch,  
        setValue,
        reset,
        getValues,
    } = useForm<any>({
        mode: "onChange",
        defaultValues: {
            name: itemEdit?.name,
            phone_number: itemEdit?.phone_number,
            password: itemEdit?.password,
            email: itemEdit?.email,
            state: itemEdit?.state,
            city: itemEdit?.city,
            active: itemEdit?.active,
        }
    });

    useEffect(() => {
        if(!itemEdit)return;

        Object.keys(itemEdit).map((keys) => {
         let key = keys as keyof unknown;
         setValue(key as any, itemEdit[key] as any)
        })
     }, [itemEdit, setValue]);

    const onSubmit = (values: any) => {
        
        let obj = Object.assign(values, { 
            "phone_number": numberClean(values.phone_number),
            "role": "Administrador",
            "active": values.active === true ? true : false,
            "city": cityValue,     
        })

        putUser(itemEdit?.id, obj)
            .then((resp) => {
                dispatch({type: USER, user: resp})
                window.localStorage.setItem("user", JSON.stringify(resp));
                setSuccessMsg(true)
            })
            .catch(() => {
                setErrMsg(!errMsg)
            })
    };

    useEffect(() => {
        if (!isModal) {
            reset()
        }
    },[isModal,reset]);

    useEffect(() => {
        dataUf?.filter(e => {
            if(e?.sigla === ufValue){
                setValue('state', e?.nome)
            }
        })

    }, [ufValue]);

    return (
        <PersonalModal
            modalBackground={false}
            padding={4}
            width="858px"
            open={isModal}
            onClose={onClose}
        >
            <S.Container>
                <h1>Editar dados</h1>
                <form onSubmit={handleSubmit(onSubmit)}  autoComplete="off">
                    <div>
                        <fieldset>
                            <Controller
                                control={control}
                                name="name"
                                render={({field: { onChange, onBlur, value }}) => (
                                    <span>
                                        <CustomInput
                                            id="name"
                                            width={372}
                                            type="text"
                                            label="Nome do moderador"
                                            defaultValue={itemEdit.name}
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}

                                        />                              
                                    </span>
                                )}
                            />     
                            
                            <Controller
                                control={control}
                                name="phone_number"
                                render={({field: { onChange, onBlur, value }}) => (
                                    <span>
                                        <div>
                                            <CustomInput
                                                id="phone_number"
                                                width={372}
                                                type="text"
                                                label={value === "" ? 'Numero do celular' : 'Celular'}
                                                value={regex(value)}
                                                defaultValue={itemEdit.phone_number}
                                                onChange={(e: any) => {
                                                    let numero = regex(e?.target?.value)
                                                    if(numero.length <= 15){
                                                        onChange(numero)
                                                    }
                                                }}
                                                onBlur={(e: any) => {
                                                    let numero = regex(e?.target?.value)
                                                    if(numero.length <= 15){
                                                        onBlur()
                                                    }
                                                }}
                                            />
                                        </div>  
                                    </span>
                                )}
                            />     
                        </fieldset>
                        <fieldset>
                            <Controller
                                control={control}
                                name="email"
                                render={({field: { onChange, onBlur, value }}) => (
                                    <span>
                                        <div>
                                            <CustomInput
                                                id="email"
                                                width={372}
                                                type="text"
                                                label={value === "" ? value : 'E-mail'}
                                                value={itemEdit.email}
                                                defaultValue={itemEdit.email}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                disabled={true}
                                            />
                                        </div>
                                    </span>
                                )}
                            />
                            <span>
                                <div>
                                <CustomSelect
                                    width={372}
                                    label='Estados'      
                                    labelDefault="Selecione o estado"
                                    value={ufValue}
                                    defaultValue="Todos os estados"
                                    list={dataUf}
                                    onChange={(e: any) => {
                                        setUfValue(e?.target?.value)
                                    }}
                                />
                                </div>
                            </span>
                        </fieldset>
                        <fieldset>
                            <span>
                                <div>
                                    <CustomSelect
                                        width={372}
                                        label="Município"
                                        labelDefault="Selecione o município"
                                        value={cityValue}
                                        defaultValue="Todos os municípios"
                                        list={dataCity}
                                        onChange={(e: any) => {
                                            setCityValue(e?.target?.value)
                                        }}
                                    />  
                                </div>
                            </span>
                        </fieldset>
                    </div>
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
                            disabled={false}
                        >
                            {isSubmitting 
                                ? "Editando..."
                                : "Finalizar edição"
                            }
                        </S.Button>
                    </S.ContainerBnt>
                </form>
                <ModalMsg 
                    height='312px'
                    modalBackground={false}
                    open={successMsg} 
                    onClose={() => {
                        setSuccessMsg(!successMsg)
                        onClose()
                        window.location.replace('/configuracoes')
                    }} 
                    width={375} 
                    status={'success'} 
                    mensage='O moderador foi editado com sucesso!'
                />
                <ModalMsg 
                    height='312px'
                    modalBackground={false}
                    mensage='Falha em editar usuário!'
                    onClose={() => {
                        reset()
                        setErrMsg(!errMsg)
                        onClose()
                    }}
                    open={errMsg}
                    status="falha"
                    width={375}
                />
            </S.Container>
        </PersonalModal>
    );
};


export default EditForm;