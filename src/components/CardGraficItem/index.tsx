import React, { useEffect, useState } from 'react';
import * as S from './style';
import { 
    Area, 
    AreaChart,
    ResponsiveContainer,
} from 'recharts';

type List = {
    label?: string,
    value?: string,
}

interface IProps {
    icon?: string,
    title: string,
    value?: string,
    id?: string,
    list?: any[],
    height?: string;
    heightGrafic?: number
    backgroundColor: string
}

const CardGraficItem: React.FC <IProps> = (props) => {
    const [ color, setColor ] = useState('');
    
    useEffect(() => {
        if(props.id === 'energia' || props.id === 'south'){
            return setColor('#FF954E')
        } 
        if(props.id === 'água' || props.id === 'north'){
            return setColor('#1773E2')
        }
        if(props.id === 'Quedas de internet' || props.id === 'north_east'){
            return setColor('#9D86ED')
        }
        if(props.id === 'Falta de gás'){
            return setColor('#FF77F1')
        }
        if(props.id === 'south_east'){
            return setColor('#FF4363')
        }
        if(props.id === 'mid_west'){
            return setColor('#B8D335')
        }
    }, [color]);

    function renderTitle(value: string){
        switch(value){
            case 'south':
                return 'Sul'
            case 'north':
                return 'Norte'
            case 'north_east':
                return 'Noroeste'
            case 'south_east':
                return 'Sudeste'
            case 'mid_west':
                return "Centroeste"
            default: 
                return null
        }
    }

    console.log(color);
    
    return (
            <S.Card>
                <S.Container
                    icon={props.icon}
                    backgroundColor={props.backgroundColor}
                >
                    <div>
                        <figure>
                            <img src={props.icon} alt="" />
                        </figure>
                        <div>
                            <h1>{renderTitle(props.title)}</h1>
                            <p>{props.value}</p>
                        </div>
                    </div>
                    <span>
                        <ResponsiveContainer width="100%" height={props.heightGrafic}>
                            <AreaChart 
                                height={props.heightGrafic} 
                                data={props.list}
                                style={{background: '#fff', borderRadius: '8px'}}
                            >
                                <defs>
                                    <linearGradient id={props.id} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                                        <stop offset="100%" stopColor={color} stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="label" stroke={color} fillOpacity={1} fill={`url(#${props.id})`}  />
                                <Area type="monotone" dataKey='value' stroke={color} fillOpacity={1} fill={`url(#${props.id})`}  />
                            </AreaChart>
                        </ResponsiveContainer>
                    </span>
                </S.Container>
            </S.Card>
    );
};

export default CardGraficItem;