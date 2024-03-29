import React, { useEffect, useState } from 'react';
import * as S from './style';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { 
    logOut,
    orangeAlert
} from '../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import { TOKEN, USER } from '../../../stores/actions';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/api/logout';

const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 469,
    bgcolor: 'background.paper',
    border: 'none',
    p: 4,
    borderRadius: '8px'
};

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ user, setUser ] = useState<object | any>(null);
    const [ open, setOpen ] = useState(false);
    const localUser = window.localStorage.getItem('user')
    useEffect(() => {
        if(localUser){
            setUser(JSON.parse(localUser))
        }
    }, [localUser])
    return (
        <>
            <S.Container>
                <div>
                    <div>
                        <h1>{user?.role}</h1>
                        <p>{user?.name}</p>
                    </div>
                    <div>
                        <p>Sair</p>
                        <S.Link 
                            //to="/singup"
                            onClick={() => {
                                setOpen(!open)
                            }}  
                            id="logout"
                        >
                            <img src={logOut} alt="" />
                        </S.Link>
                    </div>
                </div>
            </S.Container>
            <Modal
                open={open}
                onClose={() => setOpen(!open)}
            >
                <Box sx={style}>
                    <S.ModalContainer>
                        <img src={orangeAlert} alt="" />
                        <h1>Deseja mesmo sair da conta?</h1>
                        <div>
                            <button
                                id='back'
                                onClick={() => {
                                    setOpen(false)
                                }}
                            >
                                Não, voltar
                            </button>
                            <S.LogOut
                                id="to_singup"
                                to="/"
                                onClick={() => {
                                    dispatch({type: TOKEN, token: ''});
                                    dispatch({type: USER, user: ''});
                                    navigate('/', { replace: true });                                    
                                    logout();
                                    setOpen(false);
                                }}                        
                            >
                                Sim, sair
                            </S.LogOut>
                        </div>
                    </S.ModalContainer>
                </Box>
            </Modal>
        </>
    )
}

export default Header;