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
    const [ yearValue, setYearValue ] = useState('');
    
    const [ initialDateOccurrence, setInitialDateOccurrence ] = useState<any>(undefined);
    const [ finalDateOccurrence, setFinalDateOccurrence ] = useState<any>(undefined);
    const [ ufValueOccurrence, setUfValueOccurrence ] = useState<any>();
    const [ cityValueOccurrence, setCityValueOccurrence ] = useState<any>();
    const [ neighborhoodValueOccurrence, setNeighborhoodValueOccurrence ] = useState<any>();
    const [ initialDateUsers, setInitialDateUsers ] = useState<any>(undefined);
    const [ finalDateUsers, setFinalDateUsers ] = useState<any>(undefined);
    const [ ufValueUsers, setUfValueUsers ] = useState<any>();
    const [ cityValueUsers, setCityValueUsers ] = useState<any>();
    const [ neighborhoodValueUsers, setNeighborhoodValueUsers ] = useState<any>();
    
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
    const card = {
        title: "Quedas de energia",
        list: [
            {
                label: 'Quedas de energia',
                value: '43'
            }, {
                label: 'Quedas de energia',
                value: '63'
            }, {
                label: 'Quedas de energia',
                value: '43'
            }, {
                label: 'Quedas de energia',
                value: '13'
            }, {
                label: 'Quedas de energia',
                value: '63'
            },
        ]
    }

    const card2 = {
        title: "Falta de água",
        list: [
            {
                label: 'Falta de água',
                value: '43'
            }, {
                label: 'Falta de água',
                value: '63'
            }, {
                label: 'Falta de água',
                value: '43'
            }, {
                label: 'Falta de água',
                value: '13'
            }, {
                label: 'Falta de água',
                value: '63'
            },
        ]
    }

    const card3 = {
        title: "Quedas de internet",
        list: [
            {
                label: 'Quedas de internet',
                value: '43'
            }, {
                label: 'Quedas de internet',
                value: '63'
            }, {
                label: 'Quedas de internet',
                value: '43'
            }, {
                label: 'Quedas de internet',
                value: '13'
            }, {
                label: 'Quedas de internet',
                value: '63'
            },
        ]
    }

    const card4 = {
        title: "Falta de gás",
        list: [
            {
                label: 'Falta de gás',
                value: '43'
            }, {
                label: 'Falta de gás',
                value: '63'
            }, {
                label: 'Falta de gás',
                value: '43'
            }, {
                label: 'Falta de gás',
                value: '13'
            }, {
                label: 'Falta de gás',
                value: '63'
            },
        ]
    }

    const card5 = {
        title: "Sul",
        list: [
            {
                label: 'Sul',
                value: '43'
            }, {
                label: 'Sul',
                value: '63'
            }, {
                label: 'Sul',
                value: '43'
            }, {
                label: 'Sul',
                value: '13'
            }, {
                label: 'Sul',
                value: '63'
            },
        ]
    }

    const card6 = {
        title: "Norte",
        list: [
            {
                label: 'Norte',
                value: '43'
            }, {
                label: 'Norte',
                value: '63'
            }, {
                label: 'Norte',
                value: '43'
            }, {
                label: 'Norte',
                value: '13'
            }, {
                label: 'Norte',
                value: '63'
            },
        ]
    }

    const card7 = {
        title: "Nordeste",
        list: [
            {
                label: 'Nordeste',
                value: '43'
            }, {
                label: 'Nordeste',
                value: '63'
            }, {
                label: 'Nordeste',
                value: '43'
            }, {
                label: 'Nordeste',
                value: '13'
            }, {
                label: 'Nordeste',
                value: '63'
            },
        ]
    }

    const card8 = {
        title: "Sudeste",
        list: [
            {
                label: 'Sudeste',
                value: '43'
            }, {
                label: 'Sudeste',
                value: '63'
            }, {
                label: 'Sudeste',
                value: '43'
            }, {
                label: 'Sudeste',
                value: '13'
            }, {
                label: 'Sudeste',
                value: '63'
            },
        ]
    }

    const card9 = {
        title: "Centro-Oeste",
        list: [
            {
                label: 'Centro-Oeste',
                value: '43'
            }, {
                label: 'Centro-Oeste',
                value: '63'
            }, {
                label: 'Centro-Oeste',
                value: '43'
            }, {
                label: 'Centro-Oeste',
                value: '13'
            }, {
                label: 'Centro-Oeste',
                value: '63'
            },
        ]
    }

    const areaChart = [
        {
          name: 'Energia',
          masculino: 4000,
          feminino: 2400,
          naoBinario: 2400,
          outros: 4350,
          title: 'Masculino'
        },
        {
          name: 'Água',
          masculino: 3000,
          feminino: 1398,
          naoBinario: 2210,
          outros: 4350,
          title: 'Feminino'
        },
        {
          name: 'Internet',
          masculino: 2000,
          feminino: 9800,
          naoBinario: 2290,
          outros: 4350,
          title: 'Não-binário'
        },
        {
          name: 'Gás',
          masculino: 2780,
          feminino: 3908,
          naoBinario: 2000,
          outros: 4350,
          title: 'Outros'
        }
    ];

    const areaChart2 = [
        {
          name: 'Energia',
          white: 4000,
          yellow: 2400,
          indigenous: 2400,
          black: 4350,
          pard: 3852,
          title: 'Amarela'
        },
        {
          name: 'Água',
          white: 3000,
          yellow: 1398,
          indigenous: 2210,
          black: 4350,
          pard: 3852,
          title: 'Branca'
        },
        {
          name: 'Internet',
          white: 2000,
          yellow: 5800,
          indigenous: 2290,
          black: 4350,
          pard: 3852,
          title: 'Indígena'
        },
        {
          name: 'Gás',
          white: 2780,
          yellow: 3908,
          indigenous: 2000,
          black: 4350,
          pard: 3852,
          title: 'Parda'
        },
        {
          name: 'Lorem ipsum',
          white: 2780,
          yellow: 3908,
          indigenous: 2000,
          black: 4350,
          pard: 3852,
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
                        <Box padding='24px 20px 0px 20px'>
                            <S.Header>
                                <h1>Filtros</h1>
                                {initialDateOccurrence != undefined 
                                || finalDateOccurrence != undefined 
                                || ufValueOccurrence != undefined 
                                || cityValueOccurrence != undefined
                                || neighborhoodValueOccurrence != undefined
                                && (
                                    <button 
                                        onClick={() => {
                                            setInitialDateOccurrence(undefined);
                                            setFinalDateOccurrence(undefined);
                                            setUfValueOccurrence(undefined);
                                            setCityValueOccurrence(undefined);
                                            setNeighborhoodValueOccurrence(undefined);
                                        }}
                                    >
                                        Limpar filtros
                                    </button>
                                )}
                            </S.Header>
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
                        {/*FALTA IMAGEM*/}
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
                        <S.TextData>
                            <p> Ocorrências no útimo ano - <b>{/* {yearValue} */}alterr ano</b></p>
                            <div style={{background: '#fff'}}>
                                <CustomSelect
                                    width={254}
                                    defaultValue="Ano"
                                    label='Filtrar por ano'
                                    value={yearValue}
                                    list={year}
                                    onChange={(e: any) => {
                                        setYearValue(e)
                                    }}
                                />
                            </div>
                        </S.TextData>
                        <S.GraficYearContainer>
                            <div>
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
                            </div>                            
                            <span>
                                <YearGrafic 
                                    title='Ocorrências no ano'
                                    number={1000}
                                    data={ocurrences}
                                    width= "100%"
                                    height='auto'                    
                                    heightGrafic={300}
                                />
                            </span>
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
                        <Box padding='24px 20px 0px 20px'>
                            <S.Header>
                                <h1>Filtros</h1>
                                {initialDateUsers != undefined 
                                || finalDateUsers != undefined 
                                || ufValueUsers != undefined 
                                || cityValueUsers != undefined
                                || neighborhoodValueUsers != undefined
                                && (
                                    <button 
                                        onClick={() => {
                                            setInitialDateUsers(undefined);
                                            setFinalDateUsers(undefined);
                                            setUfValueUsers(undefined);
                                            setCityValueUsers(undefined);
                                            setNeighborhoodValueUsers(undefined);
                                        }}
                                    >
                                        Limpar filtros
                                    </button>
                                )}
                            </S.Header>
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
                                                list={card6.list}
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
                        <S.TextData>
                            <p> Usuários no útimo ano - <b>2021</b></p>
                            <div style={{background: '#fff'}}>
                                <CustomSelect
                                    width={254}
                                    defaultValue="Ano"
                                    label='Filtrar por ano'
                                    value={yearValue}
                                    list={year}
                                    onChange={(e: any) => {
                                        setYearValue(e)
                                    }}
                                />
                            </div>
                        </S.TextData>
                        <S.GraficYearContainer>
                            <div>
                                <Grid
                                    container
                                    spacing={2.5}                 
                                    flex-wrap='nowrap'
                                >
                                    <Grid item xs sm md={3} lg={3} xl={3}>
                                        <CardInfo 
                                            icon={ocurrenceIcon}
                                            title="Total de novos usuários no ano"
                                            value={3160}
                                            type=""
                                            width="100%"
                                            height='108px'
                                        />
                                    </Grid>
                                    <Grid item xs sm md={3} lg={3} xl={3}>
                                        <CardInfo 
                                            icon=''
                                            title="Média de novos usuários por mês"
                                            value={540}
                                            type=""
                                            width="100%"
                                            height='108px'
                                        />
                                    </Grid>
                                </Grid>
                            </div>                            
                            <span>
                                <YearGrafic 
                                    title='Ocorrências no ano'
                                    number={1000}
                                    data={ocurrences}
                                    width= "100%"
                                    height='auto'                    
                                    heightGrafic={300}
                                />
                            </span>
                        </S.GraficYearContainer>
                    </>
                )}
            </S.Container>
        </S.Main>
    );
};

export default Dashboard;