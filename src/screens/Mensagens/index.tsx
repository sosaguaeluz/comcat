import React from 'react';
import { useSelector } from 'react-redux';
import { useMessages } from '../../services';
import { RootState } from '../../stores';
import * as S from './style';

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
                        <th>
                            <span>Data</span>
                        </th>
                        <th>
                            <span>Nome</span>
                        </th>
                        <th>
                            <span>E-mail</span>
                        </th>
                        <th>
                            <span>Motivo</span>
                        </th>
                        <th>
                            <span>Mensagem</span>
                        </th>
                        <th>
                            <span>Status</span>
                        </th>
                        <th>
                            <span>Ações</span>
                        </th>
                    </tr>
                </S.TableHead>
                <S.TableBody>
                    {messages?.map((id: any) => {
                        return (
                            <tr>
                                <td>
                                    <span>{id.createdAt}</span>
                                </td>
                                <td>
                                    <span>{id.name}</span>
                                </td>
                                <td>
                                    <span>{id.email}</span>
                                </td>
                                <td>
                                    <span>{id.reason}</span>
                                </td>
                                <td>
                                    <span>{id.message}</span>
                                </td>
                                <td>
                                    <span>{id.status}</span>
                                </td>
                                <td>
                                    <span>
                                        <button type="button">
                                            ....
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