import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { regex } from '../../services/functions/regex';
import { RootState } from '../../stores';
import EditForm from './EditUser';
import NewPassword from './NewPassword';
import * as S from './style';

const Configuracoes: React.FC = () => {
    const { user } = useSelector((state : RootState) => state.clickState);
    const [ modalPassword, setModalPassword ] = useState(false);
    const [ modalEdit, setModalEdit ] = useState(false);
    return (
        <S.Container>
            <div>
                <h1>
                    Configurações
                </h1>
                <div>
                    <button 
                        type='button'
                        onClick={() => {
                            setModalPassword(!modalPassword)
                        }}
                    >
                        Alterar senha
                    </button>
                    <button 
                        type='button'
                        onClick={() => {
                            setModalEdit(!modalEdit)
                        }}
                    >
                        Editar dados
                    </button>
                </div>
            </div>
            <S.Card>
                <div>
                    <p>{user?.role}</p>
                    <h1>{user?.name}</h1>
                </div>
                <div>
                    <span>
                        <p>Telefone</p>
                        <p>{regex(user?.phone_number)}</p>
                    </span>
                    <span>
                        <p>E-mail</p>
                        <p>{user?.email}</p>
                    </span>
                    <span>
                        <p>Estado</p>
                        <p>{user?.state}</p>
                    </span>
                    <span>
                        <p>Cidade</p>
                        <p>{user?.city}</p>
                    </span>
                </div>
            </S.Card>
            <NewPassword
                itemEdit={user}
                isModal={modalPassword}
                onHide={() => {
                    setModalPassword(!modalPassword)
                }}
            />
            
            <EditForm 
                itemEdit={user}
                isModal={modalEdit}
                onClose={() => {
                    setModalEdit(!modalEdit)
                }}
            />
        </S.Container>
    )
}

export default Configuracoes;