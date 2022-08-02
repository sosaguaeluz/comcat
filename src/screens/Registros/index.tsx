import React, { useEffect, useState } from "react";
import * as S from "./style";
import {
    DoubleButton,
    DefaultButton,
    Box,
    CustomSelect,
    Search,
    MultSelect,
    Pagination,
    Poppover,
    ModalDelete,
    ModalMsg,
    DropDown,
    CustomTolltip,
    CustomInputData,
} from "../../components";
import {
    api,
    convertDate,
    queryClient,
    useCity,
    useOccurrences,
    useService,
    useUf,
} from "../../services/index";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import { RootState } from "../../stores";
import {
    options,
    iconShow,
    energiIcon,
    whaterIcon,
    wifiIcon,
    ocurrenceIcon,
    MAPTESTE,
    trusted,
    noTrusted,
} from "../../assets/index";
import NewOccurence from "./newOccurence";
import ApproveReprove from "./ApproveReprove";
import FinishOccurence from "./FinishOccurrence";
import ViewOccurrence from "./ViewOccurrence";
import EditOccurrence from "./EditOccurrence";
import { Grid } from "@mui/material";

const Registros: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.clickState);

    const [openList, setOpenList] = useState(false);
    const [maps, setMaps] = useState(true);
    const [list, setList] = useState(false);
    const [open, setOpen] = useState(false);
    const [idDelete, setIdDelete] = useState("");
    const [listServices, setListServices] = useState<any>();
    const [occurrenceObj, setOccurrenceObj] = useState<any>({});
    const [openDelete, setOpenDelete] = useState(false);
    const [newOccurence, setNewOccurence] = useState(false);
    const [approveReprove, setApproveReprove] = useState(false);
    const [successDelete, setSuccessDelete] = useState(false);
    const [finishOccurrence, setFinishOccurrence] = useState(false);
    const [viewOccurrence, setViewOccurrence] = useState(false);
    const [editOccurrence, setEditOccurrence] = useState(false);

    const [page, setPage] = useState<number>(1);
    const [status, setStatus] = useState<any>(undefined);
    const [service, setService] = useState<string[]>([]);
    const [address, setAddress] = useState<any>();
    const [ufValue, setUfValue] = useState<any>();
    const [cityValue, setCityValue] = useState<any>();
    const [initialDate, setInitialDate] = useState<any>(undefined);
    const [finalDate, setFinalDate] = useState<any>(undefined);

    const [dateValue, setDateValue] = React.useState<any | null>(
        new Date(Date.now())
    );

    const {
        data: occurrences,
        isLoading: loadOccurrences,
        refetch: fetchOccurrences,
        isFetched: isFetchedOccurence,
    } = useOccurrences(
        token,
        "DESC",
        page,
        20,
        status,
        service,
        address,
        ufValue,
        cityValue,
        undefined,
        initialDate,
        finalDate
    );
    const { data: dataServices } = useService(token);
    const { data: dataUf } = useUf();
    const { data: dataCity } = useCity(ufValue);

    let lista = [
        { label: "Pesquisar 1", value: "pesquisa1" },
        { label: "Pesquisar 2", value: "pesquisa2" },
        { label: "Pesquisar 3", value: "pesquisa3" },
        { label: "Pesquisar 4", value: "pesquisa4" },
        { label: "Pesquisar 5", value: "pesquisa5" },
        { label: "Pesquisar 6", value: "pesquisa6" },
    ];

    function setStatusName(status: string) {
        if (status == "Waiting") {
            return "Aguardando aprovação";
        } else if (status == "Approved") {
            return "Aprovado";
        } else if (status == "Disapproved") {
            return "Reprovado";
        } else {
            return status;
        }
    }

    useEffect(() => {
        let obj: string[] = [];
        dataServices?.forEach((id: any) => {
            obj.push(id.name);
        });
        setListServices(obj);
    }, [dataServices]);

    const deleteOccurrence = (id: string) => {
        const resp = api.delete(`/occurrences/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return resp;
    };

    const putOccurrence = (id: string, dados: any) => {
        const resp = api.put(`/occurrences/${id}`, dados, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return resp;
    };

    const { mutate: onDelete } = useMutation(deleteOccurrence, {
        onSuccess: () => {
            queryClient.invalidateQueries("ocurrencces");
            setSuccessDelete(true);
            fetchOccurrences();
        },
    });

    // const { mutate: onEdit } = useMutation(putOccurrence, {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries('ocurrencces')
    //         fetchOccurrences()
    //     }
    // })

    function RenderFiltersTop() {
        return (
            <S.FiltersTop>
                <Grid container spacing={3} flex-wrap="noWrap">
                    {/* Tela numero 1 */}
                    <Grid
                        item
                        spacing={3}
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6.5}
                        xl={6.5}
                        container
                    >
                        <Grid item xs={4} sm md lg xl>
                            <CustomSelect
                                onChange={(e) => {
                                    setUfValue(e.target.value);
                                    console.log(e.target.value);
                                }}
                                label="Selecione o Estado"
                                labelDefault="Estado"
                                list={dataUf}
                                value={ufValue}
                                width="100%"
                            />
                        </Grid>
                        <Grid item xs={4} sm md lg xl>
                            <CustomSelect
                                onChange={(e) => {
                                    setCityValue(e.target.value);
                                }}
                                label="Selecione a Cidade"
                                labelDefault="Cidade"
                                list={dataCity}
                                value={cityValue}
                                width="100%"
                            />
                        </Grid>
                        <Grid item xs={4} sm md lg xl>
                            <CustomSelect
                                onChange={function (e: any) {
                                    throw new Error(
                                        "Function not implemented."
                                    );
                                }}
                                label="Selecione o Bairro"
                                labelDefault="Bairro"
                                list={lista}
                                value=""
                                width="100%"
                            />
                        </Grid>
                    </Grid>
                    {/* Tela numero 2 */}
                    <Grid item xs={4} sm={5} md={7} lg={2} xl={2} container>
                        <MultSelect
                            width="100%"
                            maxWidth={400}
                            list={listServices}
                            onChange={(e: any) => {
                                setService(e);
                            }}
                            valueItem={service}
                        />
                    </Grid>
                    {/* Tela numero 3 */}
                    <Grid
                        item
                        spacing={3}
                        xs={8}
                        sm={7}
                        md={5}
                        lg={3.5}
                        xl={3.5}
                        container
                        justify-content="end"
                    >
                        <Grid item justify-content="end" xs sm md lg xl>
                            <CustomInputData
                                id="dateDe"
                                width="100%"
                                type="date"
                                label="De:"
                                defaultValue='De:'
                                max={new Date().toISOString().slice(0, -8)}
                                value={initialDate}
                                onChange={(e: any) => {
                                    setInitialDate(e.target.value);
                                    // console.log(e.target.value);
                                }}
                                onBlur={() => {}}
                            />
                        </Grid>
                        <Grid item justify-content="end" xs sm md lg xl>
                            <CustomInputData
                                id="dateAte"
                                width="100%"
                                type="date"
                                label="Até:"
                                defaultValue='Até:'
                                max={new Date().toISOString().slice(0, -4)}
                                value={finalDate}
                                onChange={(e: any) => {
                                    setFinalDate(e.target.value);
                                }}
                                onBlur={function (e: any) {
                                    throw new Error(
                                        "Function not implemented."
                                    );
                                }}
                            />
                        </Grid>
                    </Grid>
                    {/* Tela numero 4*/}
                    <Grid item spacing={3} container>
                        <Grid item xs sm md lg xl>
                            <Search
                                onChange={(e: any) => {
                                    setAddress(e.target.value);
                                }}
                                width="100%"
                                maxWidth={409}
                            />
                        </Grid>
                        {list == true && (
                            <Grid
                                item
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "end",
                                }}
                                xs
                                sm
                                md
                                lg
                                xl
                            >
                                <S.Radios>
                                    <p>Status:</p>
                                    <div>
                                        <input
                                            onChange={() =>
                                                setStatus(undefined)
                                            }
                                            value={status}
                                            type="radio"
                                            name="status"
                                            id="todos"
                                            defaultChecked
                                        />
                                        <label htmlFor="todos">Todos</label>
                                    </div>
                                    <div>
                                        <input
                                            onChange={() => setStatus("Yes")}
                                            value={status}
                                            type="radio"
                                            name="status"
                                            id="aproved"
                                        />
                                        <label htmlFor="aproved">
                                            Aprovado
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            onChange={() => setStatus("No")}
                                            value={status}
                                            type="radio"
                                            name="status"
                                            id="reproved"
                                        />
                                        <label htmlFor="reproved">
                                            Reprovado
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            onChange={() =>
                                                setStatus("Abandoned")
                                            }
                                            value={status}
                                            type="radio"
                                            name="status"
                                            id="Abandoned"
                                        />
                                        <label htmlFor="Abandoned">
                                            Aguardando aprovação
                                        </label>
                                    </div>
                                </S.Radios>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </S.FiltersTop>
        );
    }

    return (
        <>
            <S.Header>
                <div>
                    <DoubleButton
                        text="Mapa"
                        selected={maps}
                        onSelect={() => {
                            setMaps(true);
                            setList(false);
                        }}
                    />
                    <DoubleButton
                        text="Lista"
                        selected={list}
                        onSelect={() => {
                            setMaps(false);
                            setList(true);
                        }}
                    />
                </div>
                <DefaultButton
                    onSelect={() => setNewOccurence(!newOccurence)}
                    text="Registrar ocorrência"
                    id="register_occurrence"
                />
            </S.Header>
            <S.CardsContainer>
                <Grid container spacing={2.5} flex-wrap="wrap">
                    <Grid item xs={6} sm={4} md={4} lg xl>
                        <DropDown
                            icon={ocurrenceIcon}
                            title="Total"
                            value={20}
                            type="list"
                            width="100%"
                            list={lista}
                            open={openList}
                            setOpen={() => setOpenList(!openList)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} md={4} lg xl>
                        <DropDown
                            icon=""
                            title="Sul"
                            value={20}
                            type="list"
                            width="100%"
                            list={lista}
                            open={openList}
                            setOpen={() => setOpenList(!openList)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} md={4} lg xl>
                        <DropDown
                            icon=""
                            title="Norte"
                            value={20}
                            type="list"
                            width="100%"
                            list={lista}
                            open={openList}
                            setOpen={() => setOpenList(!openList)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} md={4} lg xl>
                        <DropDown
                            icon=""
                            title="Sudeste"
                            value={20}
                            type="list"
                            width="100%"
                            list={lista}
                            open={openList}
                            setOpen={() => setOpenList(!openList)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} md={4} lg xl>
                        <DropDown
                            icon=""
                            title="Nordeste"
                            value={20}
                            type="list"
                            width="100%"
                            list={lista}
                            open={openList}
                            setOpen={() => setOpenList(!openList)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={4} md={4} lg xl>
                        <DropDown
                            icon=""
                            title="Centro-Oeste"
                            value={20}
                            type="list"
                            width="100%"
                            list={lista}
                            open={openList}
                            setOpen={() => setOpenList(!openList)}
                        />
                    </Grid>
                </Grid>
            </S.CardsContainer>
            {maps == true && (
                <>
                    <Box padding="0" width="100%" height="764px">
                        <RenderFiltersTop />
                        <S.Map></S.Map>
                    </Box>
                </>
            )}
            {list == true && (
                <>
                    <S.Container>
                        <h1>Ocorrências registradas no aplicativo</h1>
                        <RenderFiltersTop />
                        <S.ScrollDiv>
                            <S.Table>
                                <S.TableHead>
                                    <tr>
                                        <th style={{ width: "226px" }}>
                                            <span
                                                style={{ marginLeft: "24px" }}
                                            >
                                                Serviço interrompido
                                                <button>
                                                    <img
                                                        src={iconShow}
                                                        alt=""
                                                    />
                                                </button>
                                            </span>
                                        </th>
                                        <th style={{ width: "226px" }}>
                                            <span>
                                                Registrado por
                                                <button>
                                                    <img
                                                        src={iconShow}
                                                        alt=""
                                                    />
                                                </button>
                                            </span>
                                        </th>
                                        <th style={{ width: "187px" }}>
                                            <span>Horá da ocorrência</span>
                                        </th>
                                        <th style={{ width: "auto" }}>
                                            <span>Endereço</span>
                                        </th>
                                        <th style={{ width: "215px" }}>
                                            <span>
                                                Status ocorrência
                                                <button>
                                                    <img
                                                        src={iconShow}
                                                        alt=""
                                                    />
                                                </button>
                                            </span>
                                        </th>
                                        <th style={{ width: "158px" }}>
                                            <span>Já foi finalizada?</span>
                                        </th>
                                        <th style={{ width: "90px" }}>
                                            <span>Ações</span>
                                        </th>
                                        <th style={{ width: "135px" }}>
                                            <span
                                                style={{ marginRight: "24px" }}
                                            >
                                                Ver no mapa
                                            </span>
                                        </th>
                                    </tr>
                                </S.TableHead>
                                <tbody>
                                    {occurrences?.data?.map((id: any) => {
                                        return (
                                            <tr>
                                                <td style={{ width: "226px" }}>
                                                    <span
                                                        style={{
                                                            marginLeft: "34px",
                                                        }}
                                                    >
                                                        <S.Icon
                                                            backgroundColor={
                                                                id?.service
                                                                    ?.background_color
                                                            }
                                                        >
                                                            <img
                                                                src={
                                                                    id?.service
                                                                        ?.image
                                                                }
                                                                alt=""
                                                            />
                                                        </S.Icon>
                                                        {id?.service?.name}
                                                    </span>
                                                </td>
                                                <S.User>
                                                    <span>
                                                        {id?.user?.name}
                                                        <CustomTolltip
                                                            img={
                                                                <img
                                                                    src={
                                                                        id?.user
                                                                            ?.trusted ==
                                                                        true
                                                                            ? trusted
                                                                            : noTrusted
                                                                    }
                                                                    alt=""
                                                                />
                                                            }
                                                            placement="right"
                                                            title={
                                                                id.trusted ==
                                                                true
                                                                    ? "Usuário confiavel"
                                                                    : "Usuário não confiavel"
                                                            }
                                                        />
                                                    </span>
                                                </S.User>
                                                <td style={{ width: "187px" }}>
                                                    <span>
                                                        {convertDate(id.date)}
                                                    </span>
                                                </td>
                                                <td style={{ width: "auto" }}>
                                                    <span>{id.address}</span>
                                                </td>
                                                <S.Status status={id.status}>
                                                    <span>
                                                        <p>
                                                            {setStatusName(
                                                                id.status
                                                            )}
                                                        </p>
                                                    </span>
                                                </S.Status>
                                                <S.Finished
                                                    finished={
                                                        id.finished_status
                                                    }
                                                >
                                                    <span
                                                        style={{
                                                            paddingRight:
                                                                "34px",
                                                        }}
                                                    >
                                                        <p>
                                                            {id.finished_status ===
                                                            "Yes"
                                                                ? "Sim"
                                                                : id.finished_status ===
                                                                  "No"
                                                                ? "Não"
                                                                : "Abandonado"}
                                                        </p>
                                                    </span>
                                                </S.Finished>
                                                <td style={{ width: "90px" }}>
                                                    <span>
                                                        <S.Options>
                                                            <Poppover
                                                                type="occurrences"
                                                                onClick={() => {}}
                                                                onEdit={() => {
                                                                    setOccurrenceObj(
                                                                        id
                                                                    );
                                                                    setEditOccurrence(
                                                                        !editOccurrence
                                                                    );
                                                                }}
                                                                onView={() => {
                                                                    setOccurrenceObj(
                                                                        id
                                                                    );
                                                                    setViewOccurrence(
                                                                        !viewOccurrence
                                                                    );
                                                                }}
                                                                onFinish={() => {
                                                                    setOccurrenceObj(
                                                                        id
                                                                    );
                                                                    setFinishOccurrence(
                                                                        !finishOccurrence
                                                                    );
                                                                }}
                                                                onApprove={() => {
                                                                    setOccurrenceObj(
                                                                        id
                                                                    );
                                                                    setApproveReprove(
                                                                        true
                                                                    );
                                                                }}
                                                                onDelete={() => {
                                                                    setIdDelete(
                                                                        id.id
                                                                    );
                                                                    setOpenDelete(
                                                                        !openDelete
                                                                    );
                                                                }}
                                                            />
                                                        </S.Options>
                                                    </span>
                                                </td>
                                                <S.Button
                                                    showOccurence={true}
                                                    style={{ width: "135px" }}
                                                >
                                                    <span
                                                        style={{
                                                            marginRight: "24px",
                                                        }}
                                                    >
                                                        <button>
                                                            <img
                                                                src={iconShow}
                                                                alt=""
                                                            />
                                                        </button>
                                                    </span>
                                                </S.Button>
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
                </>
            )}
            <NewOccurence
                isModal={newOccurence}
                onHide={() => {
                    setNewOccurence(!newOccurence);
                    fetchOccurrences();
                }}
            />
            <ModalDelete
                backgroundColor="false"
                open={openDelete}
                buttonText="Sim, excluir"
                mensage="Deseja mesmo excluir ocorrência"
                onClose={() => {
                    setOpenDelete(!openDelete);
                }}
                onDelete={() => {
                    onDelete(idDelete);
                    setOpenDelete(!openDelete);
                }}
                width={469}
            />
            <ModalMsg
                status="success"
                width={469}
                height="312px"
                mensage="Ocorrência foi excluida com sucesso!"
                modalBackground={false}
                onClose={() => {
                    setSuccessDelete(!successDelete);
                }}
                open={successDelete}
            />
            <ApproveReprove
                onHide={() => {
                    setApproveReprove(!approveReprove);
                }}
                isModal={approveReprove}
                itemEdit={occurrenceObj}
            />
            <FinishOccurence
                isModal={finishOccurrence}
                itemEdit={occurrenceObj}
                onHide={() => {
                    setFinishOccurrence(!finishOccurrence);
                    fetchOccurrences();
                }}
            />
            <ViewOccurrence
                itemEdit={occurrenceObj}
                isModal={viewOccurrence}
                onHide={() => {
                    setViewOccurrence(!viewOccurrence);
                }}
            />
            <EditOccurrence
                itemEdit={occurrenceObj}
                isModal={editOccurrence}
                onHide={() => {
                    setEditOccurrence(!editOccurrence);
                    setOccurrenceObj({});
                    fetchOccurrences();
                }}
            />
        </>
    );
};

export default Registros;
