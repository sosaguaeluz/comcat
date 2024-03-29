import React, { useEffect, useState } from 'react';
import * as S from './style';
import { 
    useAnnualOccurrences,
    useCity, 
    useDashboardOccurrences, 
    useDashboardUsers, 
    useUf 
} from '../../../services';
import { 
    Box,
    CardGraficArea,
    CardGraficItem,
    CardInfo,
    CustomInputData, 
    CustomSelect, 
    YearGrafic
} from '../../../components';
import { 
    Grid,
} from '@mui/material';
import { 
    ocurrenceIcon
} from '../../../assets';
import { dateNoConver } from '../../../services/functions/date';

const DashUsers: React.FC = () => {
    const data = new Date();
    const year = data.getFullYear()

    const [ ufValue, setUfValue ] = useState<string>('');
    const [ cityValue, setCityValue ] = useState<string>('');
    const [ state, setState ] = useState('');
    const [ city, setCity ] = useState('');
    const [ resetSearch, setResetSearch] = useState(false);
    const [ initialDate, setInitialDate ] = useState<any>(`${year}-01-01`);
    const [ finalDate, setFinalDate ] = useState<any>(dateNoConver(data.toISOString()));
    
    const { data: dataUf } = useUf();
    const { data: dataCity } = useCity(ufValue);
    const { data: dashboard } = useDashboardUsers(
        initialDate  === undefined ? '' : initialDate,
        finalDate === undefined ? '' : finalDate,
        ufValue === undefined ? '' : ufValue, 
        city  === undefined ? '' : city 
    );

    function ButtonResetSearch() {
        return (
            resetSearch 
                ? <button 
                    onClick={() => {
                        setInitialDate(null);
                        setFinalDate(null);
                        setUfValue('');
                        setCityValue('');
                    }}
                >
                    Remover filtros
                </button>
                : <></>
        )  
    };

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

    }, [ufValue, cityValue])

    return (
        <>
            <Box padding='24px 20px 0px 20px'>
                <S.Header>
                    <h1>Filtros</h1>
                    <ButtonResetSearch/>
                </S.Header>
                <S.SearchBar>
                    <div>
                        <CustomSelect
                            width={254}
                            label='Estados'      
                            labelDefault="Filtrar por estado"
                            value={ufValue}
                            defaultValue="Todos os estados"
                            list={dataUf}
                            onChange={(e: any) => {
                                setUfValue(e.target.value)
                            }}
                        />
                        <CustomSelect
                            width={254}
                            label="Município"
                            labelDefault="Filtrar por município"
                            value={cityValue}
                            defaultValue="Todos os municípios"
                            list={dataCity}
                            onChange={(e: any) => {
                                setCityValue(e.target.value)
                            }}
                        />  
                    </div>
                    <div>
                        <CustomInputData
                            id='dateDe'
                            width="176px"
                            type='date'
                            label='De:'                                        
                            defaultValue='De:'
                            max={new Date().toISOString().slice(0, 0)}
                            value={initialDate} 
                            onChange={(e: any) => {
                                setInitialDate(e.target.value );
                                // console.log(e);
                            }}
                            onBlur={function (e: any) {
                                throw new Error('Function not implemented.');
                            }}                                    />
                        <CustomInputData
                            id='dateAte'
                            width="176px"
                            type='date'
                            label='Até:'
                            defaultValue='Até:'
                            max={new Date().toISOString().slice(0, 0)}
                            value={finalDate} 
                            onChange={(e: any) => {
                                setFinalDate(e.target.value);
                            }}
                            onBlur={function (e: any) {
                                throw new Error('Function not implemented.');
                            }}                                    />
                    </div>
                </S.SearchBar>
            </Box>

            <S.StatusBox>
                {/* <Grid
                    container
                    spacing={{ xs: 2.5, md: 2.5, lg: 2.5 }}
                    flex-wrap='wrap'
                >
                    
                    <Grid item xs sm md lg xl>
                        <CardInfo 
                            icon={ocurrenceIcon}
                            title="Total de usuários"
                            value={dashboard?.total}
                            type=""
                            width='100%'
                            height="108px"
                        />
                    </Grid>
                    <Grid item xs sm md lg xl>
                        <CardInfo 
                            icon=''
                            title="Total de novas usuários (hoje)"
                            value={dashboard?.new_today}
                            type=""
                            width='100%'
                            height="108px"
                        />
                    </Grid>
                    <Grid item xs sm md lg xl>
                        <CardInfo 
                            icon=''
                            title="Total de usuários ativos (hoje)"
                            value={dashboard?.active_today}
                            type=""
                            width='100%'
                            height="108px"
                        />
                    </Grid>
                    <Grid item xs sm md lg xl>
                        <CardInfo 
                            icon=''
                            title="Total de usuários inativos (hoje)"
                            value={dashboard?.inactive_today}
                            type=""
                            width='100%'
                            height="108px"
                        />
                    </Grid>
                </Grid> */}
            </S.StatusBox>

            <S.TextData>
                <p> Total de Usuários - <b>{dashboard?.total}</b></p>
            </S.TextData>

            <S.GraficItemContainer>
                <Grid
                    container
                    spacing={{ xs: 2.5, md: 4, lg: 4 }}
                    columns={{ xs: 6, sm: 6, md: 10, lg: 10, xl: 10}}
                    flex-wrap='wrap'
                >
                
                    {dashboard?.line_charts?.map((id: any) => {
                        return (
                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                <CardGraficItem
                                    title={id?.name}
                                    value={id?.total}
                                    id={id?.name}
                                    heightGrafic={180}
                                    list={id?.charts}
                                    backgroundColor={''}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </S.GraficItemContainer>

            <S.TextData>
                <p> Usuários no último ano - <b>{dashboard?.annual_users?.total}</b></p>
            </S.TextData>

            <S.GraficYearContainer>
                <Grid
                    container
                    spacing={2.5}                 
                    flex-wrap='nowrap'
                >
                    <Grid item xs sm md={3} lg={3} xl={3}>
                        <CardInfo 
                            icon={ocurrenceIcon}
                            title="Total de novos usuários no ano"
                            value={dashboard?.annual_users?.total}
                            type=""
                            width="100%"
                            height='108px'
                        />
                    </Grid>
                    <Grid item xs sm md={3} lg={3} xl={3}>
                        <CardInfo 
                            icon=''
                            title="Média de novos usuários por mês"
                            //@ts-ignore
                            value={`${dashboard?.annual_users?.monthly.toFixed(2)}%`}
                            type=""
                            width="100%"
                            height='108px'
                        />
                    </Grid>
                </Grid>
                <YearGrafic 
                    title='Usuarios em '
                    //@ts-ignore
                    number={dashboard?.total}
                    data={dashboard?.annual_line_charts}
                    width= "100%"
                    height='auto'                    
                    heightGrafic={300}
                    type='users'
                />
            </S.GraficYearContainer>
        </>
    );
};

export default DashUsers;