import React, { useState } from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { convertDate, useMessages } from '../../services';
import {
    options
} from '../../assets/index';
import {
    getReason,
    getStatus
} from '../../services/index'

const Mensagens: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.clickState);
    const [ page, setPage ] = useState<number>(1);
    const [ status, setStatus ] = useState<any>(undefined);
    const [ reason, setReason ] = useState<any>(undefined);

    const { 
        data: messages 
    } = useMessages(
        token,
        'DESC',
        page,
        10,
        reason,
        status
    );
    
    console.log(messages, 'mensagens');

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
                                setReason('')
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
                    {messages?.map((id: any) => {
                        return (
                            <tr>
                                <td style={{width: '157px'}}>
                                    <span>{convertDate(id.createdAt)}</span>
                                </td>
                                <td style={{width: '215px'}}>
                                    <span>{id.name}</span>
                                </td>
                                <td style={{width: '200px'}}>
                                    <span>{id.email}</span>
                                </td>
                                <td style={{width: '141px'}}>
                                    <span>{getReason(id.reason)}</span>
                                </td>
                                <td>
                                    <span>{id.message}</span>
                                </td>
                                <td style={{width: '150px'}}>
                                    <span>{getStatus(id.status)}</span>
                                </td>
                                <td style={{width: '99px'}}>
                                    <span>
                                        <button type="button">
                                            <img src={options} alt="" />
                                        </button>
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </S.TableBody>
            </S.Table>

        </S.Container>
    );
};

export default Mensagens;