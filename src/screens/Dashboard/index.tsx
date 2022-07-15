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
    CustomInput
} from '../../components';
import {
    ocurrenceIcon,
    energiIcon,
    whaterIcon,
    wifiIcon,
    gasIcon
} from '../../assets/index';
import { Grid, Container } from '@mui/material';


const Dashboard: React.FC = () => {
    const [ open, setOpen ] = useState(false);
    const [ map, setMap ] = useState(true);
    const [ users, setUsers ] = useState(false);
    const [ value, setValue ] = useState('');
    const [ value2, setValue2 ] = useState('');
    const [ value3, setValue3 ] = useState('');
    const [ data, setData] = useState('');
    const [ multValue, setMultValue ] = useState<string[]>([]);
    const [ yearValue, setYearValue ] = useState('');

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
                    selected={map}
                    onSelect={() => {
                        setMap(true)
                        setUsers(false)
                    }}
                />
                <DoubleButton
                    id="ButtonDashBoardUsuarios"
                    text='Usuários'
                    selected={users}
                    onSelect={() => {
                        setMap(false)
                        setUsers(true)
                    }}
                />
                </div>
            </S.Navigation>
            <S.Container>
                {map == true && (
                    <>
                        <Box padding='24px 20px 0px 20px'>
                            <S.Header>
                                <h1>Filtros</h1>
                                {value != '' && data != '' && (
                                    <button 
                                        onClick={() => {
                                            setValue('');
                                            setValue2('');
                                            setValue3('');
                                            setData('');
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
                                        value={value}
                                        list={list}
                                        onChange={(e: any) => {
                                            setValue(e)
                                            console.log(e);
                                        }}
                                    />
                                    <CustomSelect
                                        width={254}
                                        label="Município"
                                        labelDefault="Filtrar por Município"
                                        value={value2}
                                        list={list}
                                        onChange={(e: any) => {
                                            setValue2(e)
                                        }}
                                    />
                                    <CustomSelect
                                        width={254}
                                        label="Bairro"
                                        labelDefault='Filtrar por Bairro'
                                        value={value3}
                                        list={list}
                                        onChange={(e: any) => {
                                            setValue3(e)
                                        }}
                                    />
                                </div>
                                <div>
                                    <CustomInput
                                        id='dateDe'
                                        width={176} 
                                        type='date'
                                        label='De:'
                                        defaultValue='De:'
                                        onChange={(e: any) => {
                                            setData(e);
                                            console.log(e);

                                        } }
                                        value={data} 
                                        onBlur={function (e: any) {
                                            throw new Error('Function not implemented.');
                                        } }                                    />
                                    <CustomInput
                                        id='dateAte'
                                        width={176} 
                                        type='date'
                                        label='Até:'
                                        onChange={(e: any) => {
                                            setData(e.target.value);
                                        } }
                                        value={data} 
                                        onBlur={function (e: any) {
                                            throw new Error('Function not implemented.');
                                        } }                                    />
                                </div>
                            </S.SearchBar>
                        </Box>
                        <S.StatusBox >
                            <Grid
                            container
                            spacing={{ xs: 2.5, md: 2.5, lg: 2.5 }}
                            columns={{ sm: 4, md: 8, lg: 12 }}
                            flex-wrap='wrap'
                            >
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardInfo 
                                        icon={ocurrenceIcon}
                                        title="Ocorrências no período"
                                        value={20}
                                        type=""
                                        width='100%'
                                        height="108px"
                                    />
                                </Grid>
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardInfo 
                                        icon=''
                                        title="Total de novas ocorrências (hoje)"
                                        value={10}
                                        type=""
                                        width='100%'
                                        height="108px"
                                    />
                                </Grid>
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardInfo 
                                        icon=''
                                        title="Total de ocorrências aprovadas (hoje)"
                                        value={10}
                                        type=""
                                        width='100%'
                                        height="108px"
                                    />
                                </Grid>
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardInfo 
                                        icon=''
                                        title="Total de ocorrências reprovadas (hoje)"
                                        value={0}
                                        type=""
                                        width='100%'
                                        height="108px"
                                    />
                                </Grid>
                            </Grid>
                        </S.StatusBox>
                        <p>
                            Gráfico de ocorrências - <b>RJ, Rio de Janeiro, Duque de Caxias | De 11/11/21 até 11/01/22</b>
                        </p>
                        <S.GraficItemContainer>
                            <Grid
                                container
                                spacing={{ xs: 2.5, md: 2.5, lg: 2.5 }}
                                columns={{ sm: 4, md: 8, lg: 12 }}
                                flex-wrap='wrap'
                            >
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardGraficItem
                                        width='100%' 
                                        list={card.list}
                                        title={card.title}
                                        value='325'
                                        icon={energiIcon}
                                        id="energia"
                                        heightGrafic={85}
                                    />
                                </Grid>
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardGraficItem
                                        width='100%'
                                        list={card2.list}
                                        title={card2.title}
                                        value='55'
                                        icon={whaterIcon}
                                        id="agua"
                                        heightGrafic={85}

                                    />
                                </Grid>
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardGraficItem
                                        width='100%'
                                        list={card3.list}
                                        title={card3.title}
                                        value='25'
                                        icon={wifiIcon}
                                        id="wifi"
                                        heightGrafic={85}

                                    />
                                </Grid>
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardGraficItem
                                        width='100%'
                                        list={card4.list}
                                        title={card4.title}
                                        value='155'
                                        icon={gasIcon}
                                        id="gas"
                                        heightGrafic={85}
                                    />
                                </Grid>
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardGraficItem
                                        width='100%' 
                                        list={card.list}
                                        title={card.title}
                                        value='325'
                                        icon={energiIcon}
                                        id="energia"
                                        heightGrafic={85}
                                    />
                                </Grid>
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardGraficItem
                                        width='100%'
                                        list={card2.list}
                                        title={card2.title}
                                        value='55'
                                        icon={whaterIcon}
                                        id="agua"
                                        heightGrafic={85}

                                    />
                                </Grid>
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardGraficItem
                                        width='100%'
                                        list={card3.list}
                                        title={card3.title}
                                        value='25'
                                        icon={wifiIcon}
                                        id="wifi"
                                        heightGrafic={85}

                                    />
                                </Grid>
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardGraficItem
                                        width='100%'
                                        list={card4.list}
                                        title={card4.title}
                                        value='155'
                                        icon={gasIcon}
                                        id="gas"
                                        heightGrafic={85}
                                    />
                                </Grid>
                            </Grid>
                        </S.GraficItemContainer>
                        <S.GraficBarsContainer>
                            <Grid
                                container
                                spacing={{ xs: 2.5, md: 2.5, lg: 2.5 }}
                                columns={{ sm: 1, md: 2, lg: 2 }}
                                flex-wrap='wrap'
                            >
                                <Grid item sm={1} md={1} lg={1}>
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
                                <Grid item sm={1} md={1} lg={1}>
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
                            <p> Ocorrências no útimo ano - <b>2021</b></p>
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
                                    spacing={{ xs: 2.5, md: 2.5, lg: 2.5 }}
                                    columns={{ sm: 2, md: 2, lg: 4 }}                        
                                    flex-wrap='nowrap'
                                >
                                    <Grid item sm={1} md={1} lg={1}>
                                        <CardInfo 
                                            icon={ocurrenceIcon}
                                            title="Total de ocorrências no ano"
                                            value={3160}
                                            type=""
                                            width="100%"
                                            height='108px'
                                        />
                                    </Grid>
                                    <Grid item sm={1} md={1} lg={1}>
                                        <CardInfo 
                                            icon=''
                                            title="Média de novas ocorrências por mês"
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
                                    height='426px'                    
                                    heightGrafic={300}
                                />
                            </span>
                        </S.GraficYearContainer>
                    </>
                )}
                {users == true && (
                    <> 
                        <S.StatusBox style={{marginBottom: '20px'}}>
                            <Grid
                                container
                                spacing={{ xs: 2.5, md: 2.5, lg: 2.5 }}
                                columns={{ sm: 4, md: 8, lg: 12 }}
                                flex-wrap='wrap'
                            >
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardInfo 
                                        icon={ocurrenceIcon}
                                        title="Total de usuários"
                                        value={3160}
                                        type=""
                                        width='100%'
                                        height="108px"
                                    />
                                </Grid>
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardInfo 
                                        icon=''
                                        title="Total de novas usuários (hoje)"
                                        value={540}
                                        type=""
                                        width='100%'
                                        height="108px"
                                    />
                                </Grid>
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardInfo 
                                        icon=''
                                        title="Total de usuários ativos (hoje)"
                                        value={540}
                                        type=""
                                        width='100%'
                                        height="108px"
                                    />
                                </Grid>
                                <Grid item sm={2} md={4} lg={3}>
                                    <CardInfo 
                                        icon=''
                                        title="Total de usuários inativos (hoje)"
                                        value={540}
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
                                {value != '' && data != '' && (
                                    <button 
                                        onClick={() => {
                                            setValue('');
                                            setValue2('');
                                            setValue3('');
                                            setData('');
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
                                        value={value}
                                        list={list}
                                        onChange={(e: any) => {
                                            setValue(e)
                                            console.log(e);
                                        }}
                                    />
                                    <CustomSelect
                                        width={254}
                                        label="Município"
                                        labelDefault="Filtrar por Município"
                                        value={value2}
                                        list={list}
                                        onChange={(e: any) => {
                                            setValue2(e)
                                        }}
                                    />
                                    <CustomSelect
                                        width={254}
                                        label="Bairro"
                                        labelDefault='Filtrar por Bairro'
                                        value={value3}
                                        list={list}
                                        onChange={(e: any) => {
                                            setValue3(e)
                                        }}
                                    />
                                </div>
                                <div>
                                    <CustomInput
                                        width={176} 
                                        type='date'
                                        label='De:'
                                        onChange={(e: any) => {
                                            setData(e.target.value);
                                        } }
                                        value={data} 
                                        onBlur={function (e: any) {
                                            throw new Error('Function not implemented.');
                                        } }                                    
                                    />
                                    <CustomInput
                                        width={176} 
                                        type='date'
                                        label='Até:'
                                        onChange={(e: any) => {
                                            setData(e.target.value);
                                        } }
                                        value={data} 
                                        onBlur={function (e: any) {
                                            throw new Error('Function not implemented.');
                                        } }                                    
                                    />
                                </div>
                            </S.SearchBar>
                        </Box>
                        <p  style={{margin: '48px 0 24px'}} >
                            Gráfico de usuários por região - <b>Todos os locais | Desde o início</b>
                        </p>           
                        <S.GraficItemContainer>
                            <Grid
                                container
                                spacing={{ xs: 2.5, md: 4, lg: 4 }}
                                columns={{ sm: 4, md: 6, lg: 10 }}
                                flex-wrap='wrap'
                            >
                            
                            <Grid item sm={2} md={2} lg={2}>
                                <CardGraficItem
                                    icon=""
                                    list={card5.list}
                                    title={card5.title}
                                    value='325'
                                    id="sul"
                                    width='100%'
                                    height='197px'
                                    heightGrafic={85}
                                />
                            </Grid>
                            <Grid item sm={2} md={2} lg={2}>
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
                            </Grid>
                            <Grid item sm={2} md={2} lg={2}>
                                <CardGraficItem
                                    icon=""
                                    list={card7.list}
                                    title={card7.title}
                                    value='25'
                                    id="nordeste"
                                    width='100%'
                                    height='197px'
                                    heightGrafic={85}
                                />
                            </Grid>
                            <Grid item sm={2} md={2} lg={2}>
                                <CardGraficItem
                                    icon=""
                                    list={card8.list}
                                    title={card8.title}
                                    value='155'
                                    id="sudeste"
                                    width='100%'
                                    height='197px'
                                    heightGrafic={85}
                                />
                            </Grid>
                            <Grid item sm={2} md={2} lg={2}>
                                <CardGraficItem
                                    icon=""
                                    list={card9.list}
                                    title={card9.title}
                                    value='155'
                                    id="centroOeste"
                                    width='100%'
                                    height='197px'
                                    heightGrafic={85}
                                />                                
                            </Grid>
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
                                    spacing={{ xs: 2.5, md: 2.5, lg: 2.5 }}
                                    columns={{ sm: 2, md: 2, lg: 4 }}                        
                                    flex-wrap='nowrap'
                                >
                                    <Grid item sm={1} md={1} lg={1}>
                                        <CardInfo 
                                            icon={ocurrenceIcon}
                                            title="Total de novos usuários no ano"
                                            value={3160}
                                            type=""
                                            width="100%"
                                            height='108px'
                                        />
                                    </Grid>
                                    <Grid item sm={1} md={1} lg={1}>
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
                                    height='426px'                    
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