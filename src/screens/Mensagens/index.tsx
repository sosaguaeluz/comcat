import React from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { convertDate, useMessages } from '../../services';
import {
    options
} from '../../assets/index'

const Mensagens: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.clickState);
    const { data: messages } = useMessages(token);

    console.log(messages, 'mensagens')
    return (
        <S.Container>
            <div>
                <h1>Mensagens</h1>
                <div>
                    <span>
                        <p>Status:</p>
                        <input type="radio" name="" id="" />
                        <label htmlFor="">Todos</label>
                        <input type="radio" name="" id="" />
                        <label htmlFor="">Respondida</label>
                        <input type="radio" name="" id="" />
                        <label htmlFor="">Não respondida</label>
                    </span>
                    <span>
                        <p>Motivo:</p>
                        <input type="radio" name="" id="" />
                        <label htmlFor="">Todos</label>
                        <input type="radio" name="" id="" />
                        <label htmlFor="">Denúncia</label>
                        <input type="radio" name="" id="" />
                        <label htmlFor="">Dúvida</label>
                        <input type="radio" name="" id="" />
                        <label htmlFor="">Queixa</label>
                        <input type="radio" name="" id="" />
                        <label htmlFor="">Sugestão</label>
                    </span>
                </div>
            </div>

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
                                    <span>{id.reason}</span>
                                </td>
                                <td>
                                    <span>{id.message}</span>
                                </td>
                                <td style={{width: '150px'}}>
                                    <span>{id.status}</span>
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