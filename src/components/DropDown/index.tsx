import React from 'react';
import { iconShow } from '../../assets/index';
import * as S from './style';
import { 
    Accordion,
    AccordionDetails,
    AccordionSummary,
    SvgIcon,
    Typography 
} from '@mui/material';
import { useState } from 'react';

type List = {
    name?: string,
    user_total?: number,
    label?: string,
    number?: number,
}

interface IProps {
    title?: string,
    value?: number,
    icon?: string,
    list?: List[]
    open?: boolean | any,
    setOpen?: () => void,
    type: string,
    width: string | any,
    height?: string | any,
}

const DropDown: React.FC<IProps> = (props) => {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

        const IconShow = () => (
            <SvgIcon>
              <img src={iconShow} />
            </SvgIcon>
          );

    return (            
            <Accordion       
            disableGutters
            expanded={expanded === 'panel1'} 
            onChange={handleChange('panel1')}
            square
            style={{ 
                boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '8px 0',
                width: props.width,
                margin: '0',
            }}
            sx={{
                height: '88px',
                '@media screen and (max-width: 1560px)':{
                    height: '108px',
                },
                '@media screen and (max-width: 1200px)':{
                    height: '88px',
                },
            }}
            >
                <AccordionSummary  
                // expandIcon={}
                id={props.title}
                style={{
                    margin: '0',
                    padding: '0',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                }}
                >
                        <Typography
                        style={{
                            margin: '0',
                            padding: '0',
                            width: '100%',
                            height: '100%',
                        }}
                        >  
                            <S.Card>                   
                                {props.icon != "" && (
                                    <img src={props.icon} alt="" />
                                )}
                                <S.Content>
                                    <div>
                                        <h1>{props.title}</h1>
                                        <p>{props.value}</p>
                                    </div>
                                </S.Content>
                            </S.Card>
                        </Typography>
                </AccordionSummary>
                <AccordionDetails
                style={{
                    width: '100%',
                    margin: '',
                    padding: '0',
                    zIndex: '1000',

                }}
                >
                    <Typography
                    style={{
                        width: '100%',
                        zIndex: '1000',
                    }}>    
                        <S.List>
                                {props.list?.map((id: any) => {
                                    return (
                                        <div>
                                            <h1>{id.label || id.name}</h1>
                                            <p>{id.number || id.user_total}</p>
                                        </div>
                                    )
                                })}
                        </S.List>
                    </Typography>
                </AccordionDetails>
            </Accordion>
    );
};

export default DropDown;