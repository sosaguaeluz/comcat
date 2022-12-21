import React, { useEffect, useState } from 'react';
import * as S from './style';
import { 
    extractDate,
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
    energiIcon,
    ocurrenceIcon, whaterIcon
} from '../../../assets';
import { dateNoConver } from '../../../services/functions/date';
import { LineCharts } from '../../../@types/IDashboardOccurrence';

const DashOccurrences: React.FC = () => {
    const data = new Date();
    const year = data.getFullYear();
    const day = data.getDay();
    const month = data.getMonth();

    const [ ufValue, setUfValue ] = useState<string>('');
    const [ cityValue, setCityValue ] = useState<string>('');
    const [ resetSearch, setResetSearch] = useState(false);
    const [ multValueGenre, setMultValueGenre ] = useState<string[]>([]);
    const [ multValueBreed, setMultValueBreed ] = useState<string[]>([]);

    const [ state, setState ] = useState('');
    const [ city, setCity ] = useState('');
    const [ service, setService ] = useState('')
    const [ font, setFont ] = useState('')
    const [ status, setStatus ] = useState('');
    const [ special, setSpecial ] = useState('');
    const [ typeSpecial, setTypeSpecial ] = useState();
    const [ initialDate, setInitialDate ] = useState<any>(`${year}-01-01`);
    const [ finalDate, setFinalDate ] = useState<any>(dateNoConver(data.toISOString()));
    const [ area, setArea ] = useState('');
    const [ genre, setGenre ] = useState('');
    const [ breed, setBreed ] = useState('');
    
    const { data: dataUf } = useUf();
    const { data: dataCity } = useCity(ufValue);
    const { data: dashboard } = useDashboardOccurrences(
        state === undefined ? '' : state,
        city === undefined ? '' : city,
        service === undefined ? '' : service,
        font === undefined ? '' : font,
        status === undefined ? '' : status,
        special === undefined ? '' : special,
        typeSpecial === undefined ? '' : typeSpecial ,
        initialDate === undefined ? '' : initialDate ,
        finalDate === undefined ? '' : finalDate ,
        area === undefined ? '' : area ,
        genre === undefined ? '' : genre ,
        breed === undefined ? '' : breed
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

    const cardGraficItem = [
        {label: 'energia', value: Math.floor(Math.random() * 100)},
        {label: 'energia', value: Math.floor(Math.random() * 100)},
        {label: 'energia', value: Math.floor(Math.random() * 100)},
        {label: 'energia', value: Math.floor(Math.random() * 100)},
        {label: 'energia', value: Math.floor(Math.random() * 100)},
        {label: 'energia', value: Math.floor(Math.random() * 100)},
        {label: 'energia', value: Math.floor(Math.random() * 100)},
    ];

    const cardGraficItem2 = [
        {label: 'água', value: Math.floor(Math.random() * 100)},
        {label: 'água', value: Math.floor(Math.random() * 100)},
        {label: 'água', value: Math.floor(Math.random() * 100)},
        {label: 'água', value: Math.floor(Math.random() * 100)},
        {label: 'água', value: Math.floor(Math.random() * 100)},
        {label: 'água', value: Math.floor(Math.random() * 100)},
        {label: 'água', value: Math.floor(Math.random() * 100)},
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
                            max={`${year}-${month}-${day}`}
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
                            title={"Ocorrências nos ultimos 7 dias"}
                            value={dashboard?.last_seven_days}
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
                    {state !== undefined
                    && city !== '' 
                        ? `${ufValue}, ${city}`
                        : 'Todos os locais '
                    }
                    |
                    {
                    initialDate !== undefined
                        ? ` de ${initialDate ? extractDate(initialDate) : ''}`
                        : ' Desde o inicio'
                    }
                    {
                    finalDate !== undefined
                        ? ` até ${finalDate ? extractDate(finalDate) : ''}` 
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
                    {dashboard?.line_charts?.map((id: LineCharts, index: number) => {
                        return (
                            <Grid item xs sm={6} md={4} lg={3} xl={3} key={index}>
                                <CardGraficItem
                                    title={id?.name}
                                    value={id?.total}
                                    icon={id?.name === 'Água' ? whaterIcon : energiIcon}
                                    id={id?.name === 'Água' ? 'água' : 'energia'}
                                    heightGrafic={180}
                                    list={id?.charts}
                                    backgroundColor={id?.name === 'Água' ? '#1773E2' : '#FF954E'}
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
                            data={dashboard?.gender_charts}
                            title="Genero"
                            type="genero"
                            width= "100%"
                            height="389px"
                            heightGrafic={210}
                        />
                    </Grid>
                    <Grid item xs sm md={6} lg={6} xl={6}>
                        <CardGraficArea
                            data={dashboard?.breed_charts}
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
                            //@ts-ignore
                            value={`${dashboard?.annual_occurrences?.monthly_rate?.toFixed(2)}%`}
                            type=""
                            width="100%"
                            height='108px'
                        />
                    </Grid>
                </Grid>
                {/*FALTA DADOS DA API*/}
                <YearGrafic 
                    title={`Ocorrências no ano de ${dashboard?.annual_occurrences?.year}`}
                    //@ts-ignore
                    number={dashboard?.annual_occurrences?.total}
                    data={dashboard?.annuel_charts}
                    width= "100%"
                    height='auto'                    
                    heightGrafic={300}
                />
            </S.GraficYearContainer>
        </>
    );
};

export default DashOccurrences;