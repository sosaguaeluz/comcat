import React from 'react';
import * as S from './style';
import Popover from '@mui/material/Popover';
import {
    options,
    closeRed
} from '../../assets/index';


interface IProps {
    onClick?: () => any,
    onDelete?: () => void,
    onEdit?: () => void,
    onFinish?: () => void,
    onApprove?: () => void,
    onView?: () => void,
    onAnswer?: () => void,
    onMark?: () => void,
    type?: string,
}

const Poppover: React.FC <IProps> = ({onDelete, onEdit, onClick, type, onView, onApprove, onFinish, onAnswer, onMark}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [close, setClose] = React.useState<HTMLButtonElement | null>(null);


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <button
                id="open_triger"
                type='button'
                onClick={handleClick}
            >   
                <img src={options} alt="" />
            </button>
            <>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: -8,
                        horizontal: 32,
                    }}
                    transformOrigin={{
                        vertical: 'top',
                            horizontal: 'right',
                    }}
                                    
                >
                    {type === 'menssageResponse' && (
                        <S.DivPoppover width={'112px'}>
                            <S.CloseButton 
                                onClick={handleClose}
                                type='button'
                            >
                                <img src={closeRed} alt="" />
                            </S.CloseButton>  
                            <S.FakeButton
                                onClick={handleClose}
                            >
                                <S.DeleteButton 
                                    onClick={onDelete}
                                    type='button'
                                    id="onDelete_poppover"
                                >
                                    Excluir
                                </S.DeleteButton>
                            </S.FakeButton>                          
                        </S.DivPoppover>
                    )}
                    {type === 'userApp' && (
                        <S.DivPoppover width={'112px'}>
                            <S.CloseButton 
                                onClick={handleClose}
                                type='button'
                            >
                                <img src={closeRed} alt="" />
                            </S.CloseButton>
                            <S.FakeButton
                                onClick={handleClose}
                            >
                                <S.Button 
                                    onClick={onEdit}
                                    type='button'
                                    id="onEdit_poppover"
                                >
                                    Gerenciar
                                </S.Button>
                                <S.DeleteButton 
                                    onClick={onDelete}
                                    type='button'
                                    id="onDelete_poppover"
                                >
                                    Excluir
                                </S.DeleteButton>
                            </S.FakeButton>
                        </S.DivPoppover>
                    )}
                    {type === 'userPanel' && (
                        <S.DivPoppover width={'112px'}>
                            <S.CloseButton 
                                onClick={handleClose}
                                type='button'
                            >
                                <img src={closeRed} alt="" />
                            </S.CloseButton>
                            <S.FakeButton
                                onClick={handleClose}
                            >
                                <S.Button 
                                    onClick={onEdit}
                                    type='button'
                                    id="onEdit_poppover"
                                >
                                    Editar
                                </S.Button>
                                <S.DeleteButton 
                                    onClick={onDelete}
                                    type='button'
                                    id="onDelete_poppover"
                                >
                                    Excluir
                                </S.DeleteButton>
                            </S.FakeButton>
                        </S.DivPoppover>
                    )}
                    {type === 'occurrences' && (
                        <S.DivPoppover width={'190px'}>
                            <S.CloseButton 
                                onClick={handleClose}
                                type='button'
                            >
                                <img src={closeRed} alt="" />
                            </S.CloseButton>
                            <S.FakeButton
                                onClick={handleClose}
                            >
                                <S.Button 
                                    onClick={onEdit}
                                    type='button'
                                    id="onEdit_poppover"
                                >
                                    Editar
                                </S.Button>
                                <S.Button 
                                    onClick={onView}
                                    type='button'
                                    id="onView_poppover"
                                >
                                    Visualizar
                                </S.Button>
                                <S.Button
                                    onClick={onFinish}
                                    type='button'
                                    id="onFinish_poppover"
                                >
                                    Finalizar ocorrência
                                </S.Button>
                                <S.Button
                                    onClick={onApprove}
                                    type='button'
                                    id="onApprove_poppover"
                                >
                                    Aprovar/Reprovar
                                </S.Button>
                                <S.DeleteButton 
                                    onClick={onDelete}
                                    type='button'
                                    id="onDelete_poppover"
                                >
                                    Excluir
                                </S.DeleteButton>
                            </S.FakeButton>
                        </S.DivPoppover>
                    )}
                    {type === 'menssage' && (
                        <S.DivPoppover width={'220px'}>
                            <S.CloseButton 
                                onClick={handleClose}
                                type='button'
                            >
                                <img src={closeRed} alt="" />
                            </S.CloseButton>
                            <S.FakeButton
                                onClick={handleClose}
                            >
                                <S.Button
                                    onClick={onAnswer}
                                    type='button'
                                    id="onAnswer_poppover"
                                >
                                    Responder
                                </S.Button>
                                <S.Button
                                    onClick={onMark}
                                    type='button'
                                    id="onMark_poppover"
                                >
                                    Marcar como respondida
                                </S.Button>
                                <S.DeleteButton 
                                    onClick={onDelete}
                                    type='button'
                                    id="onDelete_poppover"
                                >
                                    Excluir
                                </S.DeleteButton>
                            </S.FakeButton>
                        </S.DivPoppover>
                    )}
                </Popover>
            </>
        </>      
    );
};

export default Poppover;