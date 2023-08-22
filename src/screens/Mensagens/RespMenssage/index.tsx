import React, { useEffect, useState } from 'react';
import * as S from './style';
import { useForm, Controller } from 'react-hook-form';
import { Messages } from '../../../@types';
import { CustomTextArea, ModalMsg, PersonalModal } from '../../../components';
import { getReason, putMessages } from '../../../services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import loadingSpinner from '../../../assets/loading-spinner-3-dots-fade.svg';
import styled from 'styled-components';

interface IProps {
    isModal: boolean;
    onHide: () => void;
    itemEdit?: any;
}

const SpinnerWrapper = styled.div`
    width: 274px;
    padding: 0;
    text-align: center;
`

const SendMessageLoadingSpinner = () => <SpinnerWrapper>
    <img src={loadingSpinner} />
</SpinnerWrapper>

const RespMessage: React.FC <IProps> = ({
    isModal, onHide, itemEdit
}) => {
    const { token } = useSelector((state: RootState) => state.clickState);
    const [ open, setOpen ] = useState(false);
    const [ hideSubmit, setHideSubmit ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

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
        setIsLoading(true);
        putMessages(itemEdit?.id, values).then(() => {
            setOpen(true);
        }).finally(() => {
            setIsLoading(false);
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
                                        disabled={itemEdit.status === 'Answered'}
                                        value={itemEdit?.message_reply ?? value} 
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
                            {(itemEdit?.status === 'Answered') ? null : <button style={{visibility: isLoading ? 'hidden' : 'visible'}} type="submit">
                                Enviar
                            </button>}
                            {isLoading ? <SendMessageLoadingSpinner /> : null}

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