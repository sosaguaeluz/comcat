import React, { useState } from 'react';
import * as S from './style';
import { 
    DoubleButton,
    Box,
    CustomSelect,
    CustomInputText,
    CardInfo,
    CardGraficItem,
    CardGraficArea,
    YearGrafic,
    CustomInput,
    CustomInputData
} from '../../components';
import {
    ocurrenceIcon,
} from '../../assets/index';
import { useDashboardOccurrences, useDashboardUsers, useUf, useCity, decode, } from '../../services';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';


const Dashboard: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.clickState);
    const { data: uf } = useUf();

    const [ open, setOpen ] = useState(false); 
    const [ occurrences, setOccurrences ] = useState(true);
    const [ users, setUsers ] = useState(false);
    const [ value, setValue ] = useState('');
    const [ value2, setValue2 ] = useState('');
    const [ value3, setValue3 ] = useState('');
    const [ data, setData] = useState('');
    const [ multValue, setMultValue ] = useState<string[]>([]);
    
    const [ initialDateOccurrence, setInitialDateOccurrence ] = useState<any>(undefined);
    const [ finalDateOccurrence, setFinalDateOccurrence ] = useState<any>(undefined);
    const [ ufValueOccurrence, setUfValueOccurrence ] = useState<any>(undefined);
    const [ cityValueOccurrence, setCityValueOccurrence ] = useState<any>(undefined);
    const [ neighborhoodValueOccurrence, setNeighborhoodValueOccurrence ] = useState<any>(undefined);
    const [ yearValueOccurrence, setYearValueOccurrence ] = useState('');
    
    const [ initialDateUsers, setInitialDateUsers ] = useState<any>(undefined);
    const [ finalDateUsers, setFinalDateUsers ] = useState<any>(undefined);
    const [ ufValueUsers, setUfValueUsers ] = useState<any>(undefined);
    const [ cityValueUsers, setCityValueUsers ] = useState<any>(undefined);
    const [ neighborhoodValueUsers, setNeighborhoodValueUsers ] = useState<any>(undefined);
    const [ yearValueUsers, setYearValueUsers ] = useState('');
    
    const{ data: dashboardOccurrences,
    }=useDashboardOccurrences (
        token,
        initialDateOccurrence,
        finalDateOccurrence,
        ufValueOccurrence,
        cityValueOccurrence,
        neighborhoodValueOccurrence,
        undefined,
        undefined,
        undefined
    )
    console.log(dashboardOccurrences, 'ocurrences')

    const{ data: DashboardUsers,        
    }=useDashboardUsers (
        token,
        initialDateUsers,
        finalDateUsers,
        ufValueUsers,
        cityValueUsers,
        neighborhoodValueUsers,
    )
    console.log(DashboardUsers, 'users')    

    const { data: dataCityOccurrence } = useCity(ufValueOccurrence);
    const { data: dataCityUsers } = useCity(ufValueUsers);
    
    let list = [
        {label: 'Pesquisar 1', value: 'pesquisa1'},
        {label: 'Pesquisar 2', value: 'pesquisa2'},
        {label: 'Pesquisar 3', value: 'pesquisa3'},
        {label: 'Pesquisar 4', value: 'pesquisa4'},
        {label: 'Pesquisar 5', value: 'pesquisa5'},
        {label: 'Pesquisar 6', value: 'pesquisa6'},
        
    ]
    
    const areaChart = [
        {
          name: 'Energia',
          Male: 4000,
          Female: 2400,
          NonBinary: 2400,
          Other: 4350,
          title: 'Masculino'
        },
        {
          name: 'Água',
          Male: 3000,
          Female: 1398,
          NonBinary: 2210,
          Other: 4350,
          title: 'Feminino'
        },
        {
          name: 'Internet',
          Male: 2000,
          Female: 9800,
          NonBinary: 2290,
          Other: 4350,
          title: 'Não-binário'
        },
        {
          name: 'Gás',
          Male: 2780,
          Female: 3908,
          NonBinary: 2000,
          Other: 4350,
          title: 'Outros'
        }
    ];

    const areaChart2 = [
        {
          name: 'Energia',
          Yellow: 4000,
          White: 2400,
          Indigenous: 2400,
          Brown: 4350,
          Black: 3852,
          title: 'Amarela'
        },
        {
          name: 'Água',
          Yellow: 3000,
          White: 1398,
          Indigenous: 2210,
          Black: 4350,
          Brown: 3852,
          title: 'Branca'
        },
        {
          name: 'Internet',
          Yellow: 2000,
          White: 5800,
          Indigenous: 2290,
          Black: 4350,
          Brown: 3852,
          title: 'Indígena'
        },
        {
          name: 'Gás',
          Yellow: 2780,
          White: 3908,
          Indigenous: 2000,
          Black: 4350,
          Brown: 3852,
          title: 'Parda'
        },
        {
          name: 'Lorem ipsum',
          Yellow: 2780,
          White: 3908,
          Indigenous: 2000,
          Black: 4350,
          Brown: 3852,
          title: 'Preta'
        }
    ];
    
    const year = [
        {label: '2019', value: '2019'},
        {label: '2020', value: '2020'},
        {label: '2021', value: '2021'}
    ]

    const ocurrences = [
        {
            name: 'Energia',
            energia: 4000,
            agua: 1000,
            internet: 2400,
            gas: 1350,
            month: 'Jan',
            total: 300
        },{
            name: 'Água',
            energia: 4000,
            agua: 1000,
            internet: 2400,
            gas: 1350,
            month: 'Fev',
            total: 50
        }, {
            name: 'Internet',
            energia: 4000,
            agua: 1000,
            internet: 2400,
            gas: 1350,
            month: 'Mar',
            total: 150
        }, {
            name: 'Gás',
            energia: 4000,
            agua: 1000,
            internet: 2400,
            gas: 1350,
            month: 'Abr',
            total: 369
        }, {
            name: 'Água',
            energia: 4000,
            agua: 1000,
            internet: 2400,
            gas: 1350,
            month: 'Mai',
            total: 50
        }, {
            name: 'Internet',
            energia: 4000,
            agua: 1000,
            internet: 2400,
            gas: 1350,
            month: 'Jun',
            total: 150
        }, {
            name: 'Gás',
            energia: 4000,
            agua: 1000,
            internet: 2400,
            gas: 1350,
            month: 'Jul',
            total: 369
        }, {
            name: 'Gás',
            energia: 4000,
            agua: 1000,
            internet: 2400,
            gas: 1350,
            month: 'Ago',
            total: 369
        }, {
            name: 'Gás',
            energia: 4000,
            agua: 1000,
            internet: 2400,
            gas: 1350,
            month: 'Set',
            total: 369
        }, {
            name: 'Gás',
            energia: 4000,
            agua: 1000,
            internet: 2400,
            gas: 1350,
            month: 'Out',
            total: 369
        }, {
            name: 'Gás',
            energia: 4000,
            agua: 1000,
            internet: 2400,
            gas: 1350,
            month: 'Nov',
            total: 369
        }, {
            name: 'Gás',
            energia: 4000,
            agua: 1000,
            internet: 2400,
            gas: 1350,
            month: 'Dez',
            total: 369
        }
        
    ]

    return (
        <S.Main>
            {/*PRONTO*/}
            <S.Navigation>
                <div>
                    <DoubleButton
                        id="ButtonDashboardOcorrencias"
                        text='Ocorrências'
                        selected={occurrences}
                        onSelect={() => {
                            setOccurrences(true)
                            setUsers(false)
                        }}
                    />
                    <DoubleButton
                        id="ButtonDashBoardUsuarios"
                        text='Usuários'
                        selected={users}
                        onSelect={() => {
                            setOccurrences(false)
                            setUsers(true)
                        }}
                    />
                </div>
            </S.Navigation>
            <S.Container>
                {occurrences == true && (
                    <>
                        {/*resetar e colocar a lista de cidades e bairros*/} 
                        <Box padding='24px 20px 0px 20px'>
                            {/*não esta resetando o dados*/}
                            <S.Header>
                                <h1>Filtros</h1>
                                {initialDateOccurrence != undefined 
                                || finalDateOccurrence != undefined 
                                || ufValueOccurrence != '' 
                                || cityValueOccurrence != ''
                                || neighborhoodValueOccurrence != ''
                                ? (
                                    <button 
                                        onClick={() => {
                                            setInitialDateOccurrence(null);
                                            setFinalDateOccurrence(null);
                                            setUfValueOccurrence('');
                                            setCityValueOccurrence(null);
                                            setNeighborhoodValueOccurrence(null);
                                        }}
                                    >
                                        Remover filtros
                                    </button>
                                ):<></>}
                            </S.Header>
                            {/*resetar e colocar a lista de cidades e bairros*/}
                            <S.SearchBar>
                                <div>
                                    <CustomSelect
                                        width={254}
                                        label='Estados'
                                        labelDefault='Filtrar por Estados'
                                        value={ufValueOccurrence}
                                        defaultValue={"Todos os Estados"}
                                        list={[
                                            {
                                                id: "All",
                                                nome: "Todos os Estados",
                                                sigla: "All",
                                                regiao: "Todos",
                                            },
                                            ...(uf || []),
                                        ]}
                                        onChange={(e: any) => {
                                            setValue(e)
                                            console.log(e);
                                        }}
                                    />
                                    <CustomSelect
                                        width={254}
                                        label="Município"
                                        labelDefault="Filtrar por Município"
                                        value={cityValueOccurrence}
                                        list={dataCityOccurrence}
                                        onChange={(e: any) => {
                                            setValue2(e)
                                        }}
                                    />
                                    <CustomSelect
                                        width={254}
                                        label="Bairro"
                                        labelDefault='Filtrar por Bairro'
                                        value={neighborhoodValueOccurrence}
                                        list={list}
                                        onChange={(e: any) => {
                                            setValue3(e)
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
                                        value={initialDateOccurrence} 
                                        onChange={(e: any) => {
                                            setInitialDateOccurrence(e.target.value );
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
                                        value={finalDateOccurrence} 
                                        onChange={(e: any) => {
                                            setFinalDateOccurrence(e.target.value);
                                        }}
                                        onBlur={function (e: any) {
                                            throw new Error('Function not implemented.');
                                        }}                                    />
                                </div>
                            </S.SearchBar>
                        </Box>
                        {/*PRONTO*/}
                        <S.StatusBox >
                            <Grid
                            container
                            spacing={{ xs: 2.5, md: 2.5, lg: 2.5 }}
                            flex-wrap='wrap'
                            >
                                <Grid item xs sm={6} md lg xl>
                                    <CardInfo 
                                        icon={ocurrenceIcon}
                                        title={"Ocorrências no período"}
                                        value={dashboardOccurrences?.total}
                                        type=""
                                        width='100%'
                                    />
                                </Grid>
                                <Grid item xs sm={6} md lg xl>
                                    <CardInfo 
                                        icon=''
                                        title="Total de novas ocorrências (hoje)"
                                        value={dashboardOccurrences?.new_today}
                                        type=""
                                        width='100%'
                                    />
                                </Grid>
                                <Grid item xs sm={6} md lg xl>
                                    <CardInfo 
                                        icon=''
                                        title="Total de ocorrências aprovadas (hoje)"
                                        value={dashboardOccurrences?.approved_today}
                                        type=""
                                        width='100%'
                                    />
                                </Grid>
                                <Grid item xs sm={6} md lg xl>
                                    <CardInfo 
                                        icon=''
                                        title="Total de ocorrências reprovadas (hoje)"
                                        value={dashboardOccurrences?.disapproved_today}
                                        type=""
                                        width='100%'
                                    />
                                </Grid>
                            </Grid>
                        </S.StatusBox>
                        {/*PRONTO*/}
                        <p>
                            Gráfico de ocorrências - 
                            <b>
                                {ufValueOccurrence != undefined
                                && cityValueOccurrence != undefined 
                                && neighborhoodValueOccurrence != undefined
                                    ? `${ufValueOccurrence}, ${cityValueOccurrence}, ${neighborhoodValueOccurrence} `
                                    : 'Todos os locais '
                                }
                                |
                                {
                                initialDateOccurrence != undefined 
                                    ? ` de ${initialDateOccurrence}`
                                    : ' Desde o inicio'
                                }
                                {
                                finalDateOccurrence != undefined 
                                    ? ` até ${finalDateOccurrence}` 
                                    : ' até hoje'
                                }
                            </b>
                        </p>
                        {/*colocar o MATH.RANDON PARA FORMAR OS GRAFICOS*/}
                        <S.GraficItemContainer>
                            <Grid
                                container
                                spacing={2.5}
                                flex-wrap='wrap'
                            >
                                {dashboardOccurrences?.line_charts?.map((id: any) => {
                                    return (
                                        <Grid item xs sm={6} md={4} lg={3} xl={3}>
                                            <CardGraficItem
                                                width='100%'
                                                title={id.service.name}
                                                value={id.value}
                                                icon={id.service.image}
                                                id={id.name}
                                                heightGrafic={85}
                                            />
                                        </Grid>
                                    );
                                })}
                                {/* <Grid item xs sm={6} md={4} lg={3} xl={3}>
                                    <CardGraficItem
                                        width='100%'
                                        list={card4.list}
                                        title={card4.title}
                                        value='155'
                                        icon={gasIcon}
                                        id="gas"
                                        heightGrafic={85}
                                    />
                                </Grid> */}
                            </Grid>
                        </S.GraficItemContainer>
                        {/*FALTA DADOS DA API */}
                        <S.GraficBarsContainer>
                            <Grid
                                container
                                spacing={{ xs: 2.5, md: 2.5, lg: 2.5 }}
                                flex-wrap='wrap'
                            >
                                <Grid item xs sm md={6} lg={6} xl={6}>
                                    <CardGraficArea 
                                        data={areaChart}
                                        valueItem={multValue}
                                        onChange={(e) => {
                                            setMultValue(e)
                                        }}
                                        title="Genero"
                                        type="genero"
                                        width= "100%"
                                        height="389px"
                                        heightGrafic={210}
                                    />
                                </Grid>
                                <Grid item xs sm md={6} lg={6} xl={6}>
                                    <CardGraficArea
                                        data={areaChart2}
                                        valueItem={multValue}
                                        onChange={(e) => {
                                            setMultValue(e)
                                        }}
                                        title="Raça"
                                        type="raca"
                                        width= "100%"
                                        height="389px"
                                        heightGrafic={210}
                                    />
                                </Grid>
                            </Grid>
                        </S.GraficBarsContainer>
                        {/*PROBLEMAS NO RENDERIZAR O ANO, ESTA PUXANDO UM OBJETO*/}
                        <S.TextData>
                            <p> Ocorrências no útimo ano - <b>{yearValueOccurrence}</b></p>
                            <div style={{background: '#fff'}}>
                                <CustomSelect
                                    width={254}
                                    defaultValue="Ano"
                                    label='Filtrar por ano'
                                    value={yearValueOccurrence} 
                                    list={year}
                                    onChange={(e: any) => {
                                        setYearValueOccurrence(e)
                                    }}
                                />
                            </div>
                        </S.TextData>
                        {/*FALTA DADOS DA API*/}
                        <S.GraficYearContainer>
                            {/*PRONTO*/}
                            <Grid
                                container
                                spacing={2.5}                   
                                flex-wrap='nowrap'
                            >
                                <Grid item xs sm md={3} lg={3} xl={3}>
                                    <CardInfo 
                                        icon={ocurrenceIcon}
                                        title="Total de ocorrências no ano"
                                        value={dashboardOccurrences?.annual_occurrences?.total}
                                        type=""
                                        width="100%"
                                        height='108px'
                                    />
                                </Grid>
                                <Grid item xs sm md={3} lg={3} xl={3}>
                                    <CardInfo 
                                        icon=''
                                        title="Média de novas ocorrências por mês"
                                        value={dashboardOccurrences?.annual_occurrences?.monthly}
                                        type=""
                                        width="100%"
                                        height='108px'
                                    />
                                </Grid>
                            </Grid>
                            {/*FALTA DADOS DA API*/}
                            <YearGrafic 
                                title='Ocorrências no ano'
                                number={1000}
                                data={ocurrences}
                                width= "100%"
                                height='auto'                    
                                heightGrafic={300}
                            />
                        </S.GraficYearContainer>
                    </>
                )}
                {users == true && (
                    <> 
                        {/*PRONTO*/}
                        <S.StatusBox style={{marginBottom: '20px'}}>
                            <Grid
                                container
                                spacing={2.5}
                                flex-wrap='wrap'
                            >
                                <Grid item xs sm md lg xl>
                                    <CardInfo 
                                        icon={ocurrenceIcon}
                                        title="Total de usuários"
                                        value={DashboardUsers?.total}
                                        type=""
                                        width='100%'
                                        height="108px"
                                    />
                                </Grid>
                                <Grid item xs sm md lg xl>
                                    <CardInfo 
                                        icon=''
                                        title="Total de novas usuários (hoje)"
                                        value={DashboardUsers?.new_today}
                                        type=""
                                        width='100%'
                                        height="108px"
                                    />
                                </Grid>
                                <Grid item xs sm md lg xl>
                                    <CardInfo 
                                        icon=''
                                        title="Total de usuários ativos (hoje)"
                                        value={DashboardUsers?.active_today}
                                        type=""
                                        width='100%'
                                        height="108px"
                                    />
                                </Grid>
                                <Grid item xs sm md lg xl>
                                    <CardInfo 
                                        icon=''
                                        title="Total de usuários inativos (hoje)"
                                        value={DashboardUsers?.inactive_today}
                                        type=""
                                        width='100%'
                                        height="108px"
                                    />
                                </Grid>
                            </Grid>
                        </S.StatusBox>  
                        {/*resetar e colocar a lista de cidades e bairros*/} 
                        <Box padding='24px 20px 0px 20px'>
                            {/*não esta resetando o dados*/}
                            <S.Header>
                                <h1>Filtros</h1>
                                {initialDateUsers != undefined 
                                || finalDateUsers != undefined 
                                || ufValueUsers != undefined
                                || cityValueUsers != undefined
                                || neighborhoodValueUsers != undefined
                                ? (
                                    <button 
                                        onClick={() => {
                                            setInitialDateUsers(undefined);
                                            setFinalDateUsers(undefined);
                                            setUfValueUsers('Todos os Estados');
                                            setCityValueUsers(undefined);
                                            setNeighborhoodValueUsers(undefined);
                                        }}
                                    >
                                        Remover filtros
                                    </button>
                                ):<></>}
                            </S.Header>
                            {/*resetar e colocar a lista de cidades e bairros*/}
                            <S.SearchBar>
                                <div>
                                    <CustomSelect
                                        width={254}
                                        label='Estados'
                                        value={ufValueUsers}
                                        defaultValue={"Todos os Estados"}
                                        list={[
                                            {
                                                id: "All",
                                                nome: "Todos os Estados",
                                                sigla: "All",
                                                regiao: "Todos",
                                            },
                                            ...(uf || []),
                                        ]}
                                        onChange={(e: any) => {
                                            setValue(e)
                                            console.log(e);
                                        }}
                                    />
                                    <CustomSelect
                                        width={254}
                                        label="Município"
                                        labelDefault="Filtrar por Município"
                                        value={cityValueUsers}
                                        list={dataCityUsers}
                                        onChange={(e: any) => {
                                            setValue2(e)
                                        }}
                                    />
                                    <CustomSelect
                                        width={254}
                                        label="Bairro"
                                        labelDefault='Filtrar por Bairro'
                                        value={neighborhoodValueUsers}
                                        list={list}
                                        onChange={(e: any) => {
                                            setValue3(e)
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
                                        value={initialDateUsers} 
                                        onChange={(e: any) => {
                                            setInitialDateUsers(e.target.value );
                                            // console.log(e);
                                        }}
                                        onBlur={function (e: any) {
                                            throw new Error('Function not implemented.');
                                        }}
                                    />
                                    <CustomInputData
                                        id='dateAte'
                                        width="176px"
                                        type='date'
                                        label='Até:'
                                        defaultValue='Até:'
                                        max={new Date().toISOString().slice(0, 0)}
                                        value={finalDateUsers} 
                                        onChange={(e: any) => {
                                            setFinalDateUsers(e.target.value);
                                        }}
                                        onBlur={function (e: any) {
                                            throw new Error('Function not implemented.');
                                        }}
                                    />
                                </div>
                            </S.SearchBar>
                        </Box>
                        {/*PRONTO*/}
                        <p  style={{margin: '48px 0 24px'}} >
                            Gráfico de usuários por região - 
                            <b>
                                {ufValueUsers != undefined
                                && cityValueUsers != undefined 
                                && neighborhoodValueUsers != undefined
                                    ? `${ufValueUsers}, ${cityValueUsers}, ${neighborhoodValueUsers} `
                                    : 'Todos os locais '
                                }
                                |
                                {
                                initialDateUsers != undefined 
                                    ? ` de ${initialDateUsers}`
                                    : ' Desde o inicio'
                                }
                                {
                                finalDateUsers != undefined 
                                    ? ` até ${finalDateUsers}` 
                                    : ' até hoje'
                                }
                            </b>
                        </p>
                        {/*colocar o MATH.RANDON PARA FORMAR OS GRAFICOS*/}
                        <S.GraficItemContainer>
                            <Grid
                                container
                                spacing={{ xs: 2.5, md: 4, lg: 4 }}
                                columns={{ xs: 6, sm: 6, md: 10, lg: 10, xl: 10}}
                                flex-wrap='wrap'
                            >
                            
                            {DashboardUsers?.line_charts?.map((id: any) => {
                                    return (
                                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                            <CardGraficItem
                                                title={id.name}
                                                value={id.value}
                                                icon=""
                                                id={id.name}
                                                width='100%'
                                                height='197px'
                                                heightGrafic={85}
                                            />
                                        </Grid>
                                    );
                                })}
                                {/* <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                    <CardGraficItem  
                                        icon=""
                                        list={card6.list}
                                        title={card6.title}
                                        value='55'
                                        id="Norte"
                                        width='100%'
                                        height='197px'
                                        heightGrafic={85}
                                    />
                                </Grid> */}
                            </Grid>
                        </S.GraficItemContainer>
                        {/*PROBLEMAS NO RENDERIZAR O ANO, ESTA PUXANDO UM OBJETO*/}
                        <S.TextData>
                            <p> Ocorrências no útimo ano - <b>{yearValueUsers}</b></p>
                            <div style={{background: '#fff'}}>
                                <CustomSelect
                                    width={254}
                                    defaultValue="Ano"
                                    label='Filtrar por ano'
                                    value={yearValueUsers}
                                    list={year}
                                    onChange={(e: any) => {
                                        setYearValueUsers(e)
                                    }}
                                />
                            </div>
                        </S.TextData>
                        {/*FALTA DADOS DA API*/}
                        <S.GraficYearContainer>
                            {/*PRONTO*/}
                            <Grid
                                container
                                spacing={2.5}                 
                                flex-wrap='nowrap'
                            >
                                <Grid item xs sm md={3} lg={3} xl={3}>
                                    <CardInfo 
                                        icon={ocurrenceIcon}
                                        title="Total de novos usuários no ano"
                                        value={DashboardUsers?.annual_users?.total}
                                        type=""
                                        width="100%"
                                        height='108px'
                                    />
                                </Grid>
                                <Grid item xs sm md={3} lg={3} xl={3}>
                                    <CardInfo 
                                        icon=''
                                        title="Média de novos usuários por mês"
                                        value={DashboardUsers?.annual_users?.monthly}
                                        type=""
                                        width="100%"
                                        height='108px'
                                    />
                                </Grid>
                            </Grid>
                            {/*FALTA DADOS DA API*/}
                            <YearGrafic 
                                title='Usuarios em '
                                number={1000}
                                data={ocurrences}
                                width= "100%"
                                height='auto'                    
                                heightGrafic={300}
                            />
                        </S.GraficYearContainer>
                    </>
                )}
            </S.Container>
        </S.Main>
    );
};

export default Dashboard;