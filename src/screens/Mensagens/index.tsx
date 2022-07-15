import React, { useState } from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { convertDate, deleteMessage, putMessages, useMessages } from '../../services';
import {
    getReason,
    getStatus
} from '../../services/index'
import { 
    Poppover,
    ModalDelete,
    ModalMsg
} from '../../components';

const Mensagens: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.clickState);
    const [ page, setPage ] = useState<number>(1);
    const [ status, setStatus ] = useState<any>(undefined);
    const [ reason, setReason ] = useState<any>(undefined);
    const [ idMessage, setIdMessage ] = useState('');
    const [ objMessage, setObjMessage ] = useState(null);
    const [ answer, setAnswer ] = useState(false);
    const [ respObj, setRespObj ] = useState(false);
    const [ deleteObj, setDeleteObj ] = useState(false);
    const [ msgDelete, setMsgDelete ] = useState(false);
    const [ msgAnswer, setMsgAnswer ] = useState(false);

    const { 
        data: messages,
        refetch 
    } = useMessages(
        token,
        'DESC',
        page,
        10,
        reason,
        status
    );

    return (
        <S.Container>
            <S.Filsters>
                <h1>Mensagens</h1>
                <div>
                    <span>
                        <p>Status:</p>
                        <input
                            name="status" 
                            type="radio" 
                            value="" 
                            id="AllStatus"
                            onClick={() => {
                                setStatus(undefined)
                            }} 
                            defaultChecked={true}
                        />
                        <label htmlFor="">Todos</label>
                        <input
                            name="status" 
                            type="radio" 
                            value="Answered" 
                            id="Answered" 
                            onClick={() => {
                                setStatus('Answered')
                            }} 
                        />
                        <label htmlFor="">Respondida</label>
                        <input
                            name="status" 
                            type="radio" 
                            value="NotAnswered" 
                            id="NotAnswered" 
                            onClick={() => {
                                setStatus('NotAnswered')
                            }} 
                        />
                        <label htmlFor="">Não respondida</label>
                    </span>
                    <span>
                        <p>Motivo:</p>
                        <input 
                            type="radio" 
                            name="reason" 
                            id="allReason" 
                            onClick={() => {
                                setReason(undefined)
                            }}
                            defaultChecked={true}
                        />
                        <label htmlFor="">Todos</label>
                        <input 
                            type="radio" 
                            name="reason" 
                            id="Denounce" 
                            onClick={() => {
                                setReason('Denounce')
                            }}
                        />
                        <label htmlFor="">Denúncia</label>
                        <input 
                            type="radio" 
                            name="reason" 
                            id="Doubt" 
                            onClick={() => {
                                setReason('Doubt')
                            }}
                        />
                        <label htmlFor="">Dúvida</label>
                        <input 
                            type="radio" 
                            name="reason" 
                            id="Complaint" 
                            onClick={() => {
                                setReason('Complaint')
                            }}
                        />
                        <label htmlFor="">Queixa</label>
                        <input 
                            type="radio" 
                            name="reason" 
                            id="Surge" 
                            onClick={() => {
                                setReason('Surge')
                            }}
                        />
                        <label htmlFor="">Sugestão</label>
                    </span>
                </div>
            </S.Filsters>

            <S.Table>
                <S.TableHead>
                    <tr>
                        <th style={{width: '157px'}}>
                            <span>Data</span>
                        </th>
                        <th style={{width: '215px'}}>
                            <span>Nome</span>
                        </th>
                        <th style={{width: '177px'}}>
                            <span>E-mail</span>
                        </th>
                        <th style={{width: '141px'}}>
                            <span>Motivo</span>
                        </th>
                        <th style={{width: '610px'}}>
                            <span>Mensagem</span>
                        </th>
                        <th style={{width: '150px'}}>
                            <span>Status</span>
                        </th>
                        <th style={{width: '99px'}}>
                            <span>Ações</span>
                        </th>
                    </tr>
                </S.TableHead>
                <S.TableBody>
                    {messages?.data?.map((id: any) => {
                        return (
                            <tr>
                                <td style={{width: '157px'}}>
                                    <span>{convertDate(id?.createdAt)}</span>
                                </td>
                                <td style={{width: '215px'}}>
                                    <span>{id?.name}</span>
                                </td>
                                <td style={{width: '200px'}}>
                                    <span>{id?.email}</span>
                                </td>
                                <td style={{width: '141px'}}>
                                    <span>{getReason(id?.reason)}</span>
                                </td>
                                <td>
                                    <span>{id?.message}</span>
                                </td>
                                <td style={{width: '150px'}}>
                                    <span>{getStatus(id?.status)}</span>
                                </td>
                                <td style={{width: '99px'}}>
                                    <span>
                                        <Poppover
                                            type='menssage'
                                            onClick={ () => {}}
                                            onAnswer={ () => {
                                                setObjMessage(id)
                                            }}
                                            onMark={ () => {
                                                setIdMessage(id.id)
                                                setAnswer(!answer)
                                            }}
                                            onDelete={ () => {
                                                setIdMessage(id.id)
                                                setDeleteObj(!deleteObj)
                                            }}
                                        />
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </S.TableBody>
            </S.Table>

            <ModalDelete 
                open={deleteObj} 
                onClose={() => {
                    setDeleteObj(false)
                }} 
                width={469} 
                mensage='Deseja mesmo escluir essa mensagem?' 
                onDelete={() => {
                    deleteMessage(token, idMessage).then(() => {
                        setDeleteObj(false)
                        setMsgDelete(true)
                    })
                }} 
                buttonText='Sim, excluir' 
                backgroundColor="false"
            />

            <ModalDelete 
                open={answer} 
                onClose={() => {
                    setAnswer(false)
                }} 
                width={469} 
                mensage='Deseja marcar esta mensagem como respondida?' 
                onDelete={() => {
                    let obj: any = {
                        "status": "Answered"
                    }
                    putMessages(token, idMessage, obj).then(() => {
                        setAnswer(false)
                        setMsgAnswer(true)
                    })
                }} 
                buttonText='Sim, marcar' 
                backgroundColor="true"
            />

            <ModalMsg 
                open={msgDelete} 
                onClose={() => {
                    refetch()
                    setMsgDelete(false)
                }} 
                width={469} 
                status='success' 
                mensage='Mensagem excluida com sucesso' 
                modalBackground={false} 
                height='312px'
            />

            <ModalMsg 
                open={msgAnswer} 
                onClose={() => {
                    refetch()
                    setMsgAnswer(false)
                }} 
                width={469} 
                status='success' 
                mensage='A mensagem foi marcada como respondida com sucesso' 
                modalBackground={false} 
                height='312px'
            />

        </S.Container>
    );
};

export default Mensagens;