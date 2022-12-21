import React, { useEffect, useState } from 'react';
import { 
    Box,
    MultSelect 
} from '../index';
import * as S from './style';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip,
    ResponsiveContainer,
    Cell, 
} from 'recharts';
import {BREED, GENRE} from '../../constants'

type List = {
    name?: string,
    Male?: number,
    Female?: number,
    NonBinary?: number,
    Other?: number,
    Yellow?: number,
    White?: number,
    Indigenous?: number,
    Brown?: number,
    Black?: number,
    title?: string
}

type Genre = {
    male: number, 
    female: number, 
    nonbinary: number, 
    others: number
}

type Breed = {
    yellow: number,
    white: number,
    indigenous: number,
    brown: number,
    black: number
}

interface IProps {
    data?: List[] | Genre[] | Breed[] |any, 
    valueItem?: string[],
    onChange?: (e: any) => void,
    title: string,
    type: string,
    width?: string,
    height?: string,
    heightGrafic?: number,
}

const CardGraficArea: React.FC <IProps> = (props) => {
    const toPercent = (decimal: any, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;
    
    const getPercent = (value: any, total: any) => {
      const ratio = total > 0 ? value / total : 0;
    
      return toPercent(ratio, 2);
    };

    const namePortugues = (value: string) => {
           
        let marge = [...BREED, ...GENRE]

        return marge.find((e) => {if (e?.value === value){
            return e
        }})
    };
    
    const renderTooltipContent = (o: any) => {
        const { payload, label } = o;
        const total = payload.reduce((result: any, entry: any) => result + entry.value, 0);

        return (
            <div className="customized-tooltip-content" 
                style={{
                    background: '#2C3941',
                    opacity: '0.8',
                    borderRadius: '8px',
                    padding: '8px'
                }}
            >
                <ul className="list" >
                    {payload.map((entry: any, index: any) => (
                    <li key={`item-${index}`} style={{ color: '#FFF', listStyleType: 'none' }}>
                        {`${namePortugues(entry.name)?.label} - `} <b>{`${getPercent(entry.value, total)}`}</b>
                    </li>
                    ))}
                </ul>
            </div>
        );
    };

    console.log(props.data, 'props.data')

    return (
        <Box padding='32px' width={props.width} height={props.height}>
            <S.Container>
                <div>
                    <div>
                        <p>Percentual de ocorrências por</p>
                        <h1>{props.title}</h1>
                    </div>
                </div>
                <S.Values>
                    <div>
                        {props.type == 'genero' ?
                            <div>
                                <div style={{background: '#47DED0', marginRight: '8px'}}/>
                                <div style={{background: '#FF77F1', marginRight: '8px'}}/>
                                <div style={{background: '#9D86ED', marginRight: '8px'}}/>
                                <div style={{background: '#FF954E', marginRight: '8px'}}/>
                            </div>
                            :
                            <div>
                                <div style={{background: '#47DED0', marginRight: '8px'}}/> 
                                <div style={{background: '#FF77F1', marginRight: '8px'}}/> 
                                <div style={{background: '#9D86ED', marginRight: '8px'}}/> 
                                <div style={{background: '#FF954E', marginRight: '8px'}}/> 
                                <div style={{background: '#B8D335', marginRight: '8px'}}/> 
                            </div>
                        }
                    </div>
                </S.Values>
                <span>
                    <ResponsiveContainer width="100%" height={props.heightGrafic}>
                        <BarChart
                            height={props.heightGrafic}
                            data={props.data}
                        >
                            <XAxis dataKey={props.type === 'genero' ? 'genre' : 'breed'} />
                            <YAxis />
                            <Tooltip content={renderTooltipContent} 
                                cursor={false}
                            />
                            <Bar radius={[25, 25, 0, 0]} dataKey="name" >
                                {props.data.map((id: any, index: number) => (
                                    <>
                                        {id.charts.map((chart: any) => (
                                            <Cell fill="#47DED0" />
                                        ))}
                                    </>
                                ))}
                            </Bar>
                            {props.type == 'genero' 
                                ? 
                                    <>
                                        <Bar radius={[25, 25, 0, 0]} dataKey="Male" fill="#47DED0" />
                                        <Bar radius={[25, 25, 0, 0]} dataKey="Female" fill="#FF77F1" />
                                        <Bar radius={[25, 25, 0, 0]} dataKey="NonBinary" fill="#9D86ED" />
                                        <Bar radius={[25, 25, 0, 0]} dataKey="Other" fill="#FF954E" />
                                    </>
                                :
                                    <>
                                        <Bar radius={[25, 25, 0, 0]} dataKey="Yellow" fill="#FF954E" />
                                        <Bar radius={[25, 25, 0, 0]} dataKey="White" fill="#FF77F1" />
                                        <Bar radius={[25, 25, 0, 0]} dataKey="Indigenous" fill="#9D86ED" />
                                        <Bar radius={[25, 25, 0, 0]} dataKey="Brown" fill="#B8D335" />
                                        <Bar radius={[25, 25, 0, 0]} dataKey="Black" fill="#47DED0" />
                                    </>
                            }
                        </BarChart>
                    </ResponsiveContainer>
                </span>
            </S.Container>
        </Box>
    );
};

export default CardGraficArea;