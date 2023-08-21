import React from "react";
import * as S from "../style";
import {
    Pagination} from "../../../components";
import { City, Occurrences, Services, listUf } from "../../../@types";
import { getOccurrencesTable } from "./getOccurrencesTable";
import { getFiltersTop } from "./getFiltersTop";

/* TODO: This should become a React component in the future */
export function getOccurrencesListComponent(
    ufDropdownValue: any,
    dataUf: listUf[] | undefined,
    setCityDropdownValue: React.Dispatch<any>,
    setUfDropdownValue: React.Dispatch<any>,
    cityDropdownValue: any,
    dataCity: City[] | undefined,
    service: Services | null,
    dataServices: Services[] | undefined,
    setService: React.Dispatch<React.SetStateAction<Services | null>>,
    initialDate: any,
    setInitialDate: React.Dispatch<any>,
    finalDate: any,
    setFinalDate: React.Dispatch<any>,
    setAddress: React.Dispatch<any>,
    list: boolean,
    setStatus: React.Dispatch<any>,
    occurrences: Occurrences | undefined,
    setOccurrenceObj: React.Dispatch<any>,
    setEditOccurrence: React.Dispatch<React.SetStateAction<boolean>>,
    editOccurrence: boolean,
    setViewOccurrence: React.Dispatch<React.SetStateAction<boolean>>,
    viewOccurrence: boolean,
    setFinishOccurrence: React.Dispatch<React.SetStateAction<boolean>>,
    finishOccurrence: boolean,
    setApproveReprove: React.Dispatch<React.SetStateAction<boolean>>,
    setIdDelete: React.Dispatch<React.SetStateAction<string>>,
    setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>,
    openDelete: boolean,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    page: number,
    isLoading: boolean,
    filterByUserId: string | null,
    setFilterByUserId: React.Dispatch<React.SetStateAction<string | null>>
) {
    return <>
        <S.Container>
            <h1>Ocorrências registradas no aplicativo</h1>
            {getFiltersTop(ufDropdownValue, dataUf, setCityDropdownValue, setUfDropdownValue, cityDropdownValue, dataCity, service, dataServices, setService, initialDate, setInitialDate, finalDate, setFinalDate, setAddress, list, setStatus, filterByUserId, setFilterByUserId, setPage)}
            <S.ScrollDiv>
                {getOccurrencesTable(occurrences, setOccurrenceObj, setEditOccurrence, editOccurrence, setViewOccurrence, viewOccurrence, setFinishOccurrence, finishOccurrence, setApproveReprove, setIdDelete, setOpenDelete, openDelete, isLoading, filterByUserId, setFilterByUserId, setPage)}
            </S.ScrollDiv>
        </S.Container>
        <Pagination
            onPage={(e) => {
                setPage(e);
            }}
            value={page} />
    </>;
}


