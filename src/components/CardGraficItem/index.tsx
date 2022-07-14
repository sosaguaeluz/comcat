import React, { useEffect, useState } from 'react';
import * as S from './style';
import { Box } from '../index';
import { 
    Area, 
    AreaChart,
    ResponsiveContainer,
} from 'recharts';
import { Container } from '@mui/material';

type List = {
    label?: string,
    value?: string,
}

interface IProps {
    icon?: string,
    title?: string,
    value?: string,
    id?: string,
    list?: List[],
    width?: string,
    widthChart?: number;
}

const CardGraficItem: React.FC <IProps> = (props) => {
    const [ color, setColor ] = useState('');

    function setColorGrafic(){
        if(props.title == 'Quedas de energia' || props.title == 'Sul'){
            setColor('#FF954E')
        } 
        if(props.title == 'Falta de água' || props.title == 'Norte'){
            setColor('#47DED0')
        }
        if(props.title == 'Quedas de internet' || props.title == 'Nordeste'){
            setColor('#9D86ED')
        }
        if(props.title == 'Falta de gás'){
            setColor('#FF77F1')
        }
        if(props.title == 'Sudeste'){
            setColor('#FF4363')
        }
        if(props.title == 'Centro-Oeste'){
            setColor('#B8D335')
        }
    };

    useEffect(() => {
        setColorGrafic()
    }, [color]);
    
    return (
        <Container  maxWidth="md">
            <Box padding='0px -24px 0px -24px' width={props.width}>
                <S.Container>
                    <div>
                        <img src={props.icon} alt="" />
                        <div>
                            <h1>{props.title}</h1>
                            <p>{props.value}</p>
                        </div>
                    </div>
                    <ResponsiveContainer height={82}>
                        <AreaChart 
                            width={props.widthChart} 
                            height={82} 
                            data={props.list}
                            // margin={{
                            //     top: 0,
                            //     right: -24,
                            //     left: -24,
                            //     bottom: 0,
                            // }}
                            style={{background: '#fff', borderRadius: '8px'}}
                        >
                            <defs>
                                <linearGradient id={props.id} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                                    <stop offset="100%" stopColor={color} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="label" stroke={color} fillOpacity={1} fill={`url(#${props.id})`} />
                            <Area type="monotone" dataKey="value" stroke={color} fillOpacity={1} fill={`url(#${props.id})`} />
                        </AreaChart>
                    </ResponsiveContainer>
                </S.Container>
            </Box>
        </Container>
    );
};

export default CardGraficItem;