import React, { useEffect, useState } from 'react';
import * as S from './style';
import { useForm, Controller } from 'react-hook-form';
import { Messages } from '../../../@types';
import { CustomTextArea, ModalMsg, PersonalModal } from '../../../components';
import { getReason, putMessages } from '../../../services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';

interface IProps {
    isModal: boolean;
    onHide: () => void;
    itemEdit?: any;
}

const RespMessage: React.FC <IProps> = ({
    isModal, onHide, itemEdit
}) => {
    const { token } = useSelector((state: RootState) => state.clickState);
    const [ open, setOpen ] = useState(false);

    const {
        control,
        handleSubmit,
        reset
    } = useForm<Messages>({
        defaultValues: {
            status: "Answered"
        }
    });

    function onSubmit(values: any){
        putMessages(token, itemEdit?.id, values).then(() => {
            setOpen(true);
        })
    }
    
    return (
        <>
            <PersonalModal
                modalBackground={false}
                onClose={onHide}
                padding={4}
                open={isModal}
                width='calc(100% - 320px)'
                register={false}
                height='auto'
            >  
                <S.Container>              
                    <div>
                        <h1>Responder mensagem</h1>
                        <div>
                            <header>
                                <h2>Detalhes</h2>
                            </header>
                            <section>
                                <div>
                                    <p>Motivo</p>
                                    <S.Answer answer={itemEdit?.reason}>
                                        {getReason(itemEdit?.reason)}
                                    </S.Answer>
                                </div>
                                <div>
                                    <p>Nome</p>
                                    <S.Text>{itemEdit?.name}</S.Text>
                                </div>
                                <div>
                                    <p>E-mail</p>
                                    <S.Text>{itemEdit?.email}</S.Text>
                                </div>
                                <div>
                                    <p>Mensagem</p>
                                    <S.Text>{itemEdit?.message}</S.Text>
                                </div>
                            </section>
                        </div>
                    </div>
                    <S.Email>
                        <p>Para</p>
                        <p>{itemEdit?.email}</p>
                    </S.Email>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller 
                            name="message_reply"
                            control={control}
                            render={({field: { onChange, onBlur, value }}) => {
                                return (
                                    <CustomTextArea 
                                        placeholder="Resposta"
                                        onChange={onChange} 
                                        onBlur={onBlur} 
                                        value={value} 
                                        width='100%' 
                                        heigth='178px'                 
                                    />
                                )
                            }}
                        />

                        <S.ContainerBtn>
                            <button
                                type='button'
                                onClick={() => {
                                    reset()
                                    onHide()
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                            >
                                Enviar
                            </button>
                        </S.ContainerBtn>
                    </form>
                </S.Container>  
            </PersonalModal>
            <ModalMsg 
                open={open} 
                onClose={() => {
                    reset()
                    onHide()
                    setOpen(false)
                }} 
                width={469} 
                status='success' 
                mensage='A mensagem foi enviada com sucesso' 
                modalBackground={false} 
                height='312px'
            />
        </>
    );
};

export default RespMessage;