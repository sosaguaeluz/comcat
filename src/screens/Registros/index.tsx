import React, { useEffect, useState } from "react";
import * as S from "./style";
import {
    DoubleButton,
    DefaultButton,
    Box,
    MultSelect,
    ModalDelete,
    ModalMsg,
    DropDown,
    InputSearchMap,
    Maps,
} from "../../components";
import {
    api,
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
} from "../../assets/index";
import NewOccurence from "./newOccurence";
import ApproveReprove from "./ApproveReprove";
import FinishOccurence from "./FinishOccurrence";
import ViewOccurrence from "./ViewOccurrence";
import EditOccurrence from "./EditOccurrence";
import { Grid } from "@mui/material";
import { Services } from "../../@types";
import { getOccurrencesListComponent } from "./ListView/getOccurrencesListComponent";

const Registros: React.FC = () => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const localToken = window.localStorage.getItem('token')
    const { data: dataServices } = useService();
    const { data: dataUf } = useUf();
    const [ ufDropdownValue, setUfDropdownValue ] = useState<any>('');
    const { data: dataCity } = useCity(ufDropdownValue);
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
    /* Must Use empty string to avoid using uncontrolled dropdown */
    const [service, setService] = useState<Services | null>(null);
    const [address, setAddress] = useState<any>();
    
    const [cityDropdownValue, setCityDropdownValue] = useState<any>('');
    const [initialDate, setInitialDate] = useState<any>();
    const [finalDate, setFinalDate] = useState<any>();
    const cityName = dataCity?.find((e) => (e.nome === cityDropdownValue))?.nome;

    /* Filter by user id */
    const [filterByUserId, setFilterByUserId] = useState<string | null>(null);

    useEffect(() => {
        setPage(1);
    }, [ufDropdownValue, cityDropdownValue, status]);    


    const {
        data: occurrences,
        isLoading,
        refetch: fetchOccurrences,
    } = useOccurrences(
        "DESC",
        page,
        10,
        status === undefined ? '' : status,
        service === null ? '' : service.id,
        address === undefined ? '' : address,
        ufDropdownValue === undefined ? '' : ufDropdownValue,
        cityName === undefined ? '' : cityName,
        initialDate === undefined ? '' : initialDate,
        finalDate === undefined ? '' : finalDate,
        filterByUserId === null ? '' : filterByUserId
    );

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
                            value={totalOccurrences || 0}
                            type="list"
                            width="100%"
                            list={totalList}
                        />
                    </Grid>
                    {regionOccurrences?.map((id) => {
                        return (
                            <Grid item xs={6} sm={4} md={4} lg xl key={id.name}>
                                <DropDown
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
                            <iframe src="https://sosaguaeluz.shinyapps.io/sos-agualuz-mapa/" width="100%" height="780px" frameBorder="no" scrolling="auto"></iframe>
                        </S.Map>
                    </Box>
                </>
            )}
            {list === true && getOccurrencesListComponent(ufDropdownValue, dataUf, setCityDropdownValue, setUfDropdownValue, cityDropdownValue, dataCity, service, dataServices, setService, initialDate, setInitialDate, finalDate, setFinalDate, setAddress, list, setStatus, occurrences, setOccurrenceObj, setEditOccurrence, editOccurrence, setViewOccurrence, viewOccurrence, setFinishOccurrence, finishOccurrence, setApproveReprove, setIdDelete, setOpenDelete, openDelete, setPage, page, isLoading, filterByUserId, setFilterByUserId)}
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


