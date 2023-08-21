import React from "react";
import * as S from "../style";
import {
    CustomSelect,
    Search, CustomInputData
} from "../../../components";
import { Chip, Grid } from "@mui/material";
import { City, Services, listUf } from "../../../@types";
import PersonIcon from '@mui/icons-material/Person';
import styled from "styled-components";

/* TODO: Migrate to React Element */
export function getFiltersTop(
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
    filterByUserId: string | null,
    setFilterByUserId: React.Dispatch<React.SetStateAction<string | null>>,
    setPage: React.Dispatch<React.SetStateAction<number>>
) {

    const CustomWrapper = styled.div`
        display: flex;
        -moz-box-align: center;
        align-items: center;
        width: 565px;
        height: 56px;
        font-size: 14px;
    `

    const CustomSpan = styled.span`
        font-weight: bold;
        color: rgb(44, 57, 65);
    `

    const CustomPersonIcon = styled(PersonIcon)`
        text-align: bottom;
    `

    const CustomChip = styled(Chip)`
        user-select: auto !important;
    `

    return <S.FiltersTop>
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
                        value={ufDropdownValue}
                        list={dataUf}
                        onChange={(e) => {
                            setCityDropdownValue('');
                            setUfDropdownValue(e.target.value);
                        }} />
                </Grid>
                <Grid item xs={4} sm md lg xl>
                    <CustomSelect
                        width="100%"
                        id='Cidade'
                        label="Selecione a Cidade"
                        labelDefault="Cidade"
                        value={cityDropdownValue}
                        list={dataCity}
                        onChange={(e) => {
                            setCityDropdownValue(e.target.value);
                        }} />
                </Grid>
            </Grid>
            {/* Tela numero 2 */}
            <Grid item xs={4} sm={5} md={7} lg={2} xl={2} container>
                <CustomSelect
                    width="100%"
                    id='service'
                    label="Selecione o serviço"
                    labelDefault="Serviço"
                    value={service?.name || ''}
                    list={dataServices}
                    onChange={(e) => {
                        setService(
                            dataServices?.find(
                                i => i.name === e.target.value
                            ) ?? null
                        );
                    }} />
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
                        onBlur={() => { }} />
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
                        }} />
                </Grid>
            </Grid>
            {/* Tela numero 4*/}
            <Grid item spacing={3} container> 
                <Grid item xs={4} sm md lg xl>
                    <Search
                        onChange={(e: any) => {
                            setAddress(e.target.value);
                        }}
                        width="100%"
                        maxWidth={409} />
                </Grid>
                <Grid item xs sm md lg xl>
                    <CustomWrapper>
                    {filterByUserId ? (
                        <><CustomPersonIcon />
                        <p>
                            <CustomSpan>Filtrando Usuário com ID: </CustomSpan> <CustomChip size="medium" label={filterByUserId} variant="outlined" onDelete={() => {setPage(1); setFilterByUserId(null)}} />
                        </p> </>
                    ) : null}
                    </CustomWrapper>
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
                                    defaultChecked />
                                <label htmlFor="todos">Todos</label>
                            </div>
                            <div>
                                <input
                                    onChange={(e: any) => setStatus(e?.target?.value)}
                                    value="Approved"
                                    type="radio"
                                    name="status"
                                    id="aproved" />
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
                                    id="reproved" />
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
                                    id="Waiting" />
                                <label htmlFor="Waiting">
                                    Aguardando aprovação
                                </label>
                            </div>
                        </S.Radios>
                    </Grid>
                )}
            </Grid>
        </Grid>
    </S.FiltersTop>;
}
