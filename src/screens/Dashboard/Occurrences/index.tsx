import React, { useState } from 'react';
import * as S from './style';
import { 
    useAnnualOccurrences,
    useCity, 
    useDashboardOccurrences, 
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

const DashOccurrences: React.FC = () => {
    const [ ufValue, setUfValue ] = useState<string>('');
    const [ cityValue, setCityValue ] = useState<string>('');
    const [ initialDate, setInitialDate ] = useState<any>(undefined);
    const [ finalDate, setFinalDate ] = useState<any>(undefined);
    const [ resetSearch, setResetSearch] = useState(false);
    const [ multValueGenre, setMultValueGenre ] = useState<string[]>([]);
    const [ multValueBreed, setMultValueBreed ] = useState<string[]>([]);
    const [ initialDateAnnual, setInitialDateAnnual ] = useState<any>(undefined);
    const [ finalDateAnnual, setFinalDateAnnual ] = useState<any>(undefined);
    const [ yearValue, setYearValue ] = useState('');
    
    const { data: dataUf } = useUf();
    const { data: dataCity } = useCity(ufValue);
    const { data: dashboard } = useDashboardOccurrences();
    const { data: annualOccurrences } = useAnnualOccurrences( initialDateAnnual, finalDateAnnual, yearValue)

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
        
    ];
    

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
                <Grid
                    container
                    spacing={{ xs: 2.5, md: 2.5, lg: 2.5 }}
                    flex-wrap='wrap'
                >
                    <Grid item xs sm={6} md lg xl>
                        <CardInfo 
                            icon={ocurrenceIcon}
                            title={"Ocorrências no período"}
                            value={dashboard?.total}
                            type=""
                            width='100%'
                        />
                    </Grid>
                    <Grid item xs sm={6} md lg xl>
                        <CardInfo 
                            icon=''
                            title="Total de novas ocorrências (hoje)"
                            value={dashboard?.new_today}
                            type=""
                            width='100%'
                        />
                    </Grid>
                    <Grid item xs sm={6} md lg xl>
                        <CardInfo 
                            icon=''
                            title="Total de ocorrências aprovadas (hoje)"
                            value={dashboard?.approved_today}
                            type=""
                            width='100%'
                        />
                    </Grid>
                    <Grid item xs sm={6} md lg xl>
                        <CardInfo 
                            icon=''
                            title="Total de ocorrências reprovadas (hoje)"
                            value={dashboard?.disapproved_today}
                            type=""
                            width='100%'
                        />
                    </Grid>
                </Grid>
            </S.StatusBox>

            <S.Description>
                Gráfico de ocorrências - 
                <b>
                    {ufValue !== ''
                    && cityValue !== undefined 
                        ? `${ufValue}, ${cityValue}`
                        : 'Todos os locais '
                    }
                    |
                    {
                    initialDate !== undefined 
                        ? ` de ${initialDate}`
                        : ' Desde o inicio'
                    }
                    {
                    finalDate !== undefined 
                        ? ` até ${finalDate}` 
                        : ' até hoje'
                    }
                </b>
            </S.Description>

            <S.GraficItemContainer>
                <Grid
                    container
                    spacing={2.5}
                    flex-wrap='wrap'
                >
                    {dashboard?.line_charts?.map((id: any) => {
                        return (
                            <Grid item xs sm={6} md={4} lg={3} xl={3}>
                                <CardGraficItem
                                    width='100%'
                                    title={id?.service?.name}
                                    value={id?.value}
                                    icon={id?.service?.image}
                                    id={id?.name}
                                    heightGrafic={85}
                                />
                            </Grid>
                        );
                    })}
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
                            valueItem={multValueGenre}
                            onChange={(e) => {
                                setMultValueGenre(e)
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
                            valueItem={multValueBreed}
                            onChange={(e) => {
                                setMultValueBreed(e)
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
                <p> Ocorrências no útimo ano - <b>{dashboard?.annual_occurrences?.year}</b></p>
            </S.TextData>

            <S.GraficYearContainer>
                {/*PRONTO*/}
                <Grid
                    container                  
                    flex-wrap='nowrap'
                >
                    <Grid item xs sm md={3} lg={3} xl={3}>
                        <CardInfo 
                            icon={ocurrenceIcon}
                            title="Total de ocorrências no ano"
                            value={dashboard?.annual_occurrences?.total}
                            type=""
                            width="100%"
                            height='108px'
                        />
                    </Grid>
                    <Grid item xs sm md={3} lg={3} xl={3}>
                        <CardInfo 
                            icon=''
                            title="Média de novas ocorrências por mês"
                            value={dashboard?.annual_occurrences?.monthly_rate}
                            type=""
                            width="100%"
                            height='108px'
                        />
                    </Grid>
                </Grid>
                {/*FALTA DADOS DA API*/}
                <YearGrafic 
                    title={`Ocorrências no ano de ${dashboard?.annual_occurrences?.total}`}
                    number={1000}
                    data={ocurrences}
                    width= "100%"
                    height='auto'                    
                    heightGrafic={300}
                />
            </S.GraficYearContainer>
        </>
    );
};

export default DashOccurrences;