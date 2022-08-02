import React, { useEffect, useState } from "react";
import * as S from "./style";
import { useNotifications, useMessages, useAlertMessages } from "../../../services";
import {
    logoPng,
    dashboard,
    configurations,
    mensage,
    notification,
    registers,
    services,
    users,
    close,
    hamburger,
} from "../../../assets";
import { Badge, Drawer, Tooltip } from "@mui/material";
import { RootState } from "../../../stores";
import { useSelector } from "react-redux";

const Aside: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.clickState);
    const [open, setOpen] = useState(false);

    const { data: AlertNotifications } = useNotifications(
        token,
        "DESC",
        undefined,
        undefined,
        "Pending"
    );
    const { data: alertMessages } = useAlertMessages(
        token,
        "DESC",
        undefined,
        undefined,
        undefined,
        'NotAnswered'
    );

    const link = [
        { to: "/", icon: dashboard, label: "Dashboard", alert: 0 },
        { to: "/registros", icon: registers, label: "Registros", alert: 0},
        { to: "/usuarios", icon: users, label: "Usuários", alert: 0 },
        { to: "/servicos", icon: services, label: "Serviços", alert: 0 },
        { to: "/notificacoes", icon: notification, label: "Notificações", alert: AlertNotifications?.length },
        { to: "/mensagens", icon: mensage, label: "Mensagens", alert: alertMessages?.length},
        { to: "/configuracoes", icon: configurations, label: "Configurações", alert: 0}
    ];

    return (
        <>
            <S.Container>
                <Tooltip title="Menu Lateral" arrow placement="right">
                    <S.Hamburguer type="button" onClick={() => setOpen(true)}>
                        <img src={hamburger} alt="" />
                    </S.Hamburguer>
                </Tooltip>
                <S.Navigation hamburger={true}>
                    {link.map((id: any) => {
                        return (
                            <Badge badgeContent={id.alert} max={99}>
                                <Tooltip
                                    title={id.label}
                                    arrow
                                    placement="right"
                                >
                                    <S.Link
                                        to={id.to}
                                        id={id.label}
                                        onClick={() => setOpen(false)}
                                        hamburger={true}
                                    >
                                        <img src={id.icon} alt="" />
                                    </S.Link>
                                </Tooltip>
                            </Badge>
                        );
                    })}
                </S.Navigation>
            </S.Container>
            <Drawer anchor="left" open={open} onClose={() => setOpen(!open)}>
                <S.Flex>
                    <S.logo>
                        <img src={logoPng} alt="" />
                    </S.logo>
                    <S.Close type="button" onClick={() => setOpen(false)}>
                        <img src={close} alt="" />
                    </S.Close>
                </S.Flex>
                <S.Navigation hamburger={false}>
                    {link.map((id: any) => {
                        return (
                            <S.Link
                                to={id.to}
                                id={id.label}
                                onClick={() => setOpen(false)}
                                hamburger={false}
                            >
                                <img src={id.icon} alt="" />
                                <div>
                                    <p>{id.label}</p>
                                    {id.alert <= 0 && (
                                        <>
                                        </>
                                    )}
                                    {id?.alert >= 100 && (
                                        <>
                                            <Tooltip
                                                title={`mais de 99 ${id.label}`}
                                                arrow
                                                placement="right"
                                            >
                                                <S.Alert id={id.label}>
                                                    <p>99+</p>
                                                </S.Alert>
                                            </Tooltip>
                                        </>
                                    )}
                                    {(id.alert > 0) && (id.alert < 100) && (
                                        <>
                                            <Tooltip
                                                title={`${id.alert} ${id.label}`}
                                                arrow
                                                placement="right"
                                            >
                                                <S.Alert id={id.label}>
                                                    <p>{id.alert}</p>
                                                </S.Alert>
                                            </Tooltip>
                                        </>
                                    )}
                                </div>
                            </S.Link>
                        );
                    })}
                </S.Navigation>
            </Drawer>
        </>
    );
};

export default Aside;
