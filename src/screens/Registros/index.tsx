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
    InputSearchMap,
    Maps,
} from "../../components";
import {
    api,
    convertDate,
    queryClient,
    useCity,
    useOccurrences,
    useService,
    useUf,
    useDashboardRegionOccurrences
} from "../../services/index";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import { RootState } from "../../stores";
import {
    iconShow,
    ocurrenceIcon,
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
    const { token } = useSelector((state : RootState) => state.clickState);
    const localToken = window.localStorage.getItem('token')
    const { data: dataServices } = useService();
    const { data: dataUf } = useUf();
    const [ ufValue, setUfValue ] = useState<any>('');
    const { data: dataCity } = useCity(ufValue);
    const { data: regionOccurrences } = useDashboardRegionOccurrences();
    
    const [totalList, setTotalList] = useState<any>();
    const [totalOccurrences, setTotalOccurrences] = useState<any>();

    const [maps, setMaps] = useState(true);
    const [list, setList] = useState(false);
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
    const [status, setStatus] = useState<any>();
    const [service, setService] = useState<any>();
    const [address, setAddress] = useState<any>();
    
    const [cityValue, setCityValue] = useState<any>();
    const [initialDate, setInitialDate] = useState<any>();
    const [finalDate, setFinalDate] = useState<any>();
    const [ state, setState ] = useState('');
    const [ city, setCity ] = useState('');

    const {
        data: occurrences,
        isLoading: loadOccurrences,
        refetch: fetchOccurrences,
        isFetched: isFetchedOccurence,
    } = useOccurrences(
        "DESC",
        page,
        10,
        status === undefined ? '' : status,
        service === undefined ? '' : service,
        address === undefined ? '' : address,
        ufValue === undefined ? '' : ufValue,
        city === undefined ? '' : city,
        initialDate === undefined ? '' : initialDate,
        finalDate === undefined ? '' : finalDate
    );

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
    };

    useEffect(() => {
        let obj: string[] = [];
        dataServices?.forEach((id: any) => {
            obj.push(id.name);
        });
        setListServices(obj);
    }, [dataServices]);

    const deleteOccurrence = (id: string) => {
        const resp = api.delete(`/occurrences/${id}`);
        return resp;
    };

    const { mutate: onDelete } = useMutation(deleteOccurrence, {
        onSuccess: () => {
            queryClient.invalidateQueries("ocurrencces");
            setSuccessDelete(true);
            fetchOccurrences();
        },
    });

    useEffect(() => {
        let spam: any = [];
        let sum = 0;

        regionOccurrences?.forEach((e) => {
            e.state_list?.forEach((id) => {
                spam.push({
                    name: id.name,
                    //@ts-ignore
                    user_total: id.occurrences_total,
                });
            });
        });

        spam.sort(function (a: any, b: any) {
            let x = a.name.toUpperCase(),
                y = b.name.toUpperCase();
            return x === y ? 0 : x > y ? 1 : -1;
        });

        //@ts-ignore
        regionOccurrences?.forEach((total) => (sum += total.occurrences_total));

        setTotalOccurrences(sum);
        setTotalList(spam);
    }, [regionOccurrences]);

    useEffect(() => {
        dataUf?.filter(e => {
            if(e.sigla === ufValue){
                setState(e.nome)
            }
        })
        dataCity?.filter((e:any) => {
            if(e.name === cityValue){
                setCity(e.nome)
            }
        })

    }, [ufValue, cityValue]);

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
                            key="Total"
                            icon={ocurrenceIcon}
                            title="Total"
                            value={totalOccurrences || 0}
                            type="list"
                            width="100%"
                            list={totalList}
                        />
                    </Grid>
                    {regionOccurrences?.map((id: any) => {
                        return (
                            <Grid item xs={6} sm={4} md={4} lg xl>
                                <DropDown
                                    key={id.name}
                                    icon=""
                                    title={id.name}
                                    value={id.occurrences_total}
                                    type="list"
                                    width="100%"
                                    list={id.state_list}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </S.CardsContainer>
            {maps === true && (
                <>
                    <Box padding="0" width="100%" height="600px">
                        <S.Map>
                            <iframe src="https://sosaguaeluz.shinyapps.io/sos-agualuz-mapa/" width="100%" height="600px" frameBorder="no" scrolling="auto"></iframe>
                        </S.Map>
                    </Box>
                </>
            )}
            {list === true && (
                <>
                    <S.Container>
                        <h1>Ocorrências registradas no aplicativo</h1>
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
                                            width="100%"
                                            id='Estado'
                                            label="Selecione o Estado"
                                            labelDefault="Estado"
                                            value={ufValue}
                                            defaultValue="Selecione o estado"
                                            list={dataUf}
                                            onChange={(e) => {
                                                setUfValue(e.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm md lg xl>
                                        <CustomSelect
                                            width="100%"
                                            id='Cidade'
                                            label="Selecione a Cidade"
                                            labelDefault="Cidade"
                                            value={cityValue}
                                            defaultValue="Selecione a cidade"
                                            list={dataCity}
                                            onChange={(e) => {
                                                setCityValue(e.target.value);
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                {/* Tela numero 2 */}
                                <Grid item xs={4} sm={5} md={7} lg={2} xl={2} container>
                                    <CustomSelect
                                        width="100%"
                                        id='service'
                                        label="Selecione o serviço"
                                        labelDefault="Serviço"
                                        value={service}
                                        defaultValue="Selecione o serviço"
                                        list={dataServices}
                                        onChange={(e) => {
                                            dataServices?.filter(i => {
                                                if(i.name === e.target.value){
                                                    setService(i?.id);
                                                }
                                            })
                                        }}
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
                                                        onChange={(e: any) => setStatus(e?.target?.value)}
                                                        value=""
                                                        type="radio"
                                                        name="status"
                                                        id="todos"
                                                        defaultChecked
                                                    />
                                                    <label htmlFor="todos">Todos</label>
                                                </div>
                                                <div>
                                                    <input
                                                        onChange={(e: any) => setStatus(e?.target?.value)}
                                                        value="Approved"
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
                                                        onChange={(e: any) => setStatus(e?.target?.value)}
                                                        value="Disapproved"
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
                                                        onChange={(e: any) => setStatus(e?.target?.value)}
                                                        value="Waiting"
                                                        type="radio"
                                                        name="status"
                                                        id="Waiting"
                                                    />
                                                    <label htmlFor="Waiting">
                                                        Aguardando aprovação
                                                    </label>
                                                </div>
                                            </S.Radios>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </S.FiltersTop>
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
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </S.Table>
                        </S.ScrollDiv>
                    </S.Container>
                    <Pagination
                        onPage={(e) => {
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
