import React, { useState } from 'react';
import * as S from './style';
import { Box } from '../index';
import { 
    BarChart, 
    Bar, 
    Cell, 
    XAxis, 
    Tooltip, 
    ResponsiveContainer,
} from 'recharts';
import styled from '@emotion/styled';
import { Grid, LinearProgress, linearProgressClasses } from '@mui/material';

type List = {
    month: string,
    value: number,
    regions?:  any
}

interface IProps {
    title: string | undefined,
    number: number,
    data?: any,
    width?: string,
    height?: string,
    heightGrafic?: number,
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    background: 'red',
    color: '#AFAFAF',
    [`&.${linearProgressClasses.colorPrimary}`]: {
        borderRadius: 5,
        backgroundColor: '#FF954E80'
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#FF954E',
      },
    width: '100%'
}));

const YearGrafic: React.FC <IProps> = (props) => {
    const [focusBar, setFocusBar] = useState<any>(null);
    const [mouseLeave, setMouseLeave] = useState<any>(true);

    console.log(focusBar, 'focus bar')

    return (
        <Box padding='40px 24px 35px 24px' width={props.width} height={props.height}>
            <S.Container>
                <div>
                    <h1>{`${props.title} `} </h1>
                    <p>{props.number}</p>
                </div>
                <section>
                    <span>
                        <ResponsiveContainer width="100%" height={props.heightGrafic}>
                            <BarChart                            
                                height={props.heightGrafic}
                                data={props.data}
                                onMouseMove={(state) => {
                                    if (state.isTooltipActive) {
                                        setFocusBar(state.activeTooltipIndex);
                                        setMouseLeave(false);
                                    } else {
                                        setFocusBar(null);
                                        setMouseLeave(true);
                                    }
                                }}
                            >
                                <Tooltip cursor={false} />
                                <XAxis dataKey="month" />
                                <Bar 
                                    radius={[25, 25, 0, 0]} 
                                    dataKey="value" 
                                    fill="#C7C7C7" 
                                >
                                    {props?.data?.map((entry: any, index: any) => (
                                        <Cell 
                                            width={40}
                                            fill={
                                                focusBar === index ? "#2B5CE7" : "#C7C7C7"
                                            } 
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </span>
                    <S.ProgressBar>
                            <Grid 
                                container
                                spacing={{ xs: 2.5, md: 6, lg: 6, xl: 6 }}  
                                columnSpacing={8}                      
                                flex-wrap='nowrap'
                            >
                                {/* {focusBar && props?.data[focusBar]?.regions?.map((id: any, index: any) => (
                                    <Grid item xs sm md={6} lg={6} xl={6} key={index}>
                                        <span>
                                            <p>{id?.region}</p>
                                            <h1>{id?.value}</h1>
                                        </span>
                                        <div >
                                            <BorderLinearProgress variant="determinate" value={id?.value} />
                                        </div>
                                    </Grid>
                                ))} */}
                            </Grid>
                    </S.ProgressBar>
                </section>
            </S.Container>
        </Box>
    );
};

export default YearGrafic;