import React, { useState } from 'react';
import * as S from './style';
import { 
    logo,
    logoPng,
    dashboard,
    configurations,
    mensage,
    notification,
    registers,
    services,
    users,
    close,
    hamburger
} from '../../../assets';
import { Drawer, Tooltip } from '@mui/material';

const Aside: React.FC = () => {
    const [ open, setOpen ] = useState(false);
    const link = [
        {to: '/', icon: dashboard, label: 'Dashboard'},
        {to:'/registros', icon: registers, label: 'Registros'},
        {to: '/usuarios', icon: users, label: 'Usuários'},
        {to:'/servicos', icon: services, label: 'Serviços'},
        {to: '/notificacoes', icon: notification, label: 'Notificações'},
        {to: '/mensagens', icon: mensage, label: 'Mensagens'},
        {to:'/configuracoes', icon: configurations, label: 'Configurações'}
    ];

    return (
        <>
            <S.Container>
                {/* <S.logo>
                    <img src={logoPng} alt="" />
                </S.logo> */}
                <Tooltip title='Menu Lateral' arrow placement='right'>
                    <S.Hamburguer 
                        type='button'
                        onClick={() => setOpen(true)}
                    >
                        <img src={hamburger} alt="" />
                    </S.Hamburguer>
                </Tooltip>
                <S.Navigation>
                    {link.map((id: any) => {
                        return (
                            <Tooltip title={id.label} arrow placement='right'>
                                <S.Link 
                                    to={id.to}
                                    id={id.label}
                                    onClick={() => setOpen(false)}
                                    hamburger={true}
                                >
                                    <img src={id.icon} alt="" />
                                </S.Link>
                            </Tooltip>
                        )
                    })}
                </S.Navigation>
            </S.Container>
            <Drawer
                anchor='left'
                open={open}
                onClose={() => setOpen(!open)}
            >   
                <S.Flex>
                    <S.logo>
                        <img src={logoPng} alt="" />
                    </S.logo>
                    <S.Close 
                        type='button'
                        onClick={() => setOpen(false)}
                    >
                        <img src={close} alt="" />
                    </S.Close>
                </S.Flex>
                <S.Navigation>
                    {link.map((id: any) => {
                        return (
                            <S.Link 
                                to={id.to}
                                id={id.label}
                                onClick={() => setOpen(false)}
                                hamburger={false}
                            >
                                <img src={id.icon} alt="" />
                                <p>{id.label}</p>
                            </S.Link>
                        )
                    })}
                </S.Navigation>
          </Drawer>
        </>
    )
}

export default Aside;