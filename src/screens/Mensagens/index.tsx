import React, { useState } from "react";
import * as S from "./style";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import {
    convertDate,
    deleteMessage,
    putMessages,
    useMessages,
} from "../../services";
import { getReason, getStatus } from "../../services/index";
import { Poppover, ModalDelete, ModalMsg, Pagination } from "../../components";
import RespMessage from "./RespMenssage";
import { iconShow } from "../../assets";
import { AllMessages } from "../../@types";

const Mensagens: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.clickState);
    const [page, setPage] = useState<number>(1);
    const [status, setStatus] = useState<any>(undefined);
    const [reason, setReason] = useState<any>(undefined);
    const [idMessage, setIdMessage] = useState("");
    const [objMessage, setObjMessage] = useState(null);
    const [answer, setAnswer] = useState(false);
    const [respObj, setRespObj] = useState(false);
    const [deleteObj, setDeleteObj] = useState(false);
    const [msgDelete, setMsgDelete] = useState(false);
    const [msgAnswer, setMsgAnswer] = useState(false);
    const [closePopover, setClosePopover] = useState(false);

    const { data: messages, refetch } = useMessages(
        token,
        "DESC",
        page,
        10,
    );

    return (
        <>
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
                                setStatus(undefined);
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
                                setStatus("Answered");
                            }}
                        />
                        <label htmlFor="">Respondida</label>
                        <input
                            name="status"
                            type="radio"
                            value="NotAnswered"
                            id="NotAnswered"
                            onClick={() => {
                                setStatus("NotAnswered");
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
                                setReason(undefined);
                            }}
                            defaultChecked={true}
                        />
                        <label htmlFor="">Todos</label>
                        <input
                            type="radio"
                            name="reason"
                            id="Denounce"
                            onClick={() => {
                                setReason("Denounce");
                            }}
                        />
                        <label htmlFor="">Denúncia</label>
                        <input
                            type="radio"
                            name="reason"
                            id="Doubt"
                            onClick={() => {
                                setReason("Doubt");
                            }}
                        />
                        <label htmlFor="">Dúvida</label>
                        <input
                            type="radio"
                            name="reason"
                            id="Complaint"
                            onClick={() => {
                                setReason("Complaint");
                            }}
                        />
                        <label htmlFor="">Queixa</label>
                        <input
                            type="radio"
                            name="reason"
                            id="Surge"
                            onClick={() => {
                                setReason("Surge");
                            }}
                        />
                        <label htmlFor="">Sugestão</label>
                    </span>
                </div>
            </S.Filsters>
            <S.Container>
                <S.ScrollDiv>
                    <S.Table>
                        <S.TableHead>
                            <tr>
                                <th style={{ width: "150px" }}>
                                    <span style={{ marginLeft: "24px" }}>
                                        Data
                                        <button>
                                            <img src={iconShow} alt="" />
                                        </button>
                                    </span>
                                </th>
                                <th style={{ width: "200px" }}>
                                    <span>Nome</span>
                                </th>
                                <th style={{ width: "300px" }}>
                                    <span>E-mail</span>
                                </th>
                                <th style={{ width: "140px" }}>
                                    <span>Motivo</span>
                                </th>
                                <th
                                    style={{
                                        width: "auto",
                                        minWidth: "400px",
                                    }}
                                >
                                    <span>Mensagem</span>
                                </th>
                                <th style={{ width: "130px" }}>
                                    <span>
                                        Status
                                        <button>
                                            <img src={iconShow} alt="" />
                                        </button>
                                    </span>
                                </th>
                                <th style={{ width: "90px" }}>
                                    <span style={{ marginRight: "24px" }}>
                                        Ações
                                    </span>
                                </th>
                            </tr>
                        </S.TableHead>
                        <tbody>
                            
                            {messages?.data?.map((id: any, index: number,) => {
                                return (
                                    <tr>
                                        <td style={{ width: "150px" }}>
                                            <span>
                                                {convertDate(id?.createdAt)}
                                            </span>
                                        </td>
                                        <td style={{ width: "200px" }}>
                                            <span>{id?.name}</span>
                                        </td>
                                        <td style={{ width: "300px" }}>
                                            <span>{id?.email}</span>
                                        </td>
                                        <td style={{ width: "140px" }}>
                                            <S.Answer answer={id?.reason}>
                                                {getReason(id?.reason)}
                                            </S.Answer>
                                        </td>
                                        <td
                                            style={{
                                                width: "auto",
                                                minWidth: "400px",
                                            }}
                                        >
                                            <span>{id?.message}</span>
                                        </td>
                                        <td style={{ width: "130px" }}>
                                            <S.Status status={id?.status}>
                                                {getStatus(id?.status)}
                                            </S.Status>
                                        </td>
                                        <td style={{ width: "90px" }}>
                                            <span
                                                style={{ marginRight: "24px" }}
                                            >
                                                <S.Options>
                                                    <Poppover
                                                        type={id?.status === 'NotAnswered' ? 'menssage': 'menssageResponse'}
                                                        onClick={() => {}}
                                                        onAnswer={() => {
                                                            setObjMessage(id);
                                                            setRespObj(
                                                                !respObj
                                                            );
                                                        }}
                                                        onMark={() => {
                                                            setIdMessage(id.id);
                                                            setAnswer(!answer);
                                                        }}
                                                        onDelete={() => {
                                                            setIdMessage(id.id);
                                                            setDeleteObj(
                                                                !deleteObj
                                                            );
                                                        }}
                                                    />
                                                </S.Options>
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </S.Table>
                </S.ScrollDiv>
            </S.Container>

            <Pagination
                onPage={(e: any) => {
                    setPage(e);
                }}
                value={page}
            />

            <ModalDelete
                open={deleteObj}
                onClose={() => {
                    setDeleteObj(false);
                }}
                width={469}
                mensage="Deseja mesmo escluir essa mensagem?"
                onDelete={() => {
                    deleteMessage(idMessage).then(() => {
                        setDeleteObj(false);
                        setMsgDelete(true);
                    });
                }}
                buttonText="Sim, excluir"
                backgroundColor="false"
            />

            <ModalDelete
                open={answer}
                onClose={() => {
                    setAnswer(false);
                }}
                width={469}
                mensage="Deseja marcar esta mensagem como respondida?"
                onDelete={() => {
                    let obj: any = {
                        status: "Answered",
                    };
                    putMessages(idMessage, obj).then(() => {
                        setAnswer(false);
                        setMsgAnswer(true);
                    });
                }}
                buttonText="Sim, marcar"
                backgroundColor="true"
            />

            <ModalMsg
                open={msgDelete}
                onClose={() => {
                    setClosePopover(false)
                    setMsgDelete(false);
                    refetch();
                }}
                width={469}
                status="success"
                mensage="Mensagem excluida com sucesso"
                modalBackground={false}
                height="312px"
            />

            <ModalMsg
                open={msgAnswer}
                onClose={() => {
                    setClosePopover(false)
                    setMsgAnswer(false);
                    refetch();
                }}
                width={469}
                status="success"
                mensage="A mensagem foi marcada como respondida com sucesso"
                modalBackground={false}
                height="312px"
            />

            <RespMessage
                itemEdit={objMessage}
                isModal={respObj}
                onHide={() => {
                    refetch();
                    setRespObj(!respObj);
                }}
            />
        </>
    );
};

export default Mensagens;
