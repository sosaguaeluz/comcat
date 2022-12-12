import React, { useState } from 'react';
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

const DashUsers: React.FC = () => {
    const [ ufValue, setUfValue ] = useState<string>('');
    const [ cityValue, setCityValue ] = useState<string>('');
    const [ resetSearch, setResetSearch] = useState(false);
    const [ multValueGenre, setMultValueGenre ] = useState<string[]>([]);
    const [ multValueBreed, setMultValueBreed ] = useState<string[]>([]);
    const [ initialDateAnnual, setInitialDateAnnual ] = useState<any>(undefined);
    const [ finalDateAnnual, setFinalDateAnnual ] = useState<any>(undefined);
    const [ yearValue, setYearValue ] = useState('');

    const [ state, setState ] = useState('');
    const [ city, setCity ] = useState('');
    const [ service, setService ] = useState('')
    const [ font, setFont ] = useState('')
    const [ status, setStatus ] = useState('');
    const [ special, setSpecial ] = useState('');
    const [ typeSpecial, setTypeSpecial ] = useState('');
    const [ initialDate, setInitialDate ] = useState<any>('2020-01-01T00:00:01.076Z');
    const [ finalDate, setFinalDate ] = useState<any>(undefined);
    const [ area, setArea ] = useState('');
    const [ genre, setGenre ] = useState('');
    const [ breed, setBreed ] = useState('')
    
    const { data: dataUf } = useUf();
    const { data: dataCity } = useCity(ufValue);
    const { data: annualOccurrences } = useAnnualOccurrences( 
        state,
        city,
        service,
        font,
        status,
        special,
        typeSpecial,
        initialDate,
        finalDate,
        area,
        genre,
        breed
    )
    const { data: dashboard } = useDashboardUsers(
        initialDate  === undefined ? '' : initialDate,
        finalDate === undefined ? '' : finalDate,
        ufValue === undefined ? '' : ufValue, 
        cityValue  === undefined ? '' : cityValue 
    )

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

    console.log(dashboard?.anual_line_charts, 'userssss')
    

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
                </Grid>
            </S.StatusBox>

            <S.TextData>
                <p> usuários no útimo ano - <b>{dashboard?.total}</b></p>
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
                <p> Usuário no ultimo ano - <b>{dashboard?.annual_users?.total}</b></p>
            </S.TextData>

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
                {/*FALTA DADOS DA API*/}
                <YearGrafic 
                    title='Usuarios em '
                    number={1000}
                    data={dashboard?.anual_line_charts}
                    width= "100%"
                    height='auto'                    
                    heightGrafic={300}
                />
            </S.GraficYearContainer>
        </>
    );
};

export default DashUsers;