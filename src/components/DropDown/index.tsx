import React from 'react';
import { iconShow } from '../../assets/index';

import * as S from './style';
import { DropDownButtom } from '../index';

import { styled } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps,} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

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
    expanded?: string | boolean,
    onClick?: () => any,
}

const Accordion = styled((props: AccordionProps ) => (
    <MuiAccordion 
        disableGutters
        square
        {...props} 
    />
))(({ theme }) => ({
    boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    height: '88px',
    background: "#FFFFFF",
    zIndex: '10',
}));
  
const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<DropDownButtom/>}
        {...props}
    />
))(({ theme }) => ({
    margin: '0',
    padding: '0',
    width: '100%',
    height: '100%',
    '& .MuiAccordionSummary-expandIconWrapper': {
        marginRight: '20px',
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)', 
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    width: '100%',
    margin: '0',
    padding: '0',
}));

const DropDown: React.FC<IProps> = (props) => {
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel: any) => {
      setExpanded(panel);
    };

    const slideProps = {
        mountOnEnter: true,
        unmountOnExit: true,
        timeout: { enter: 600, exit: 200 }
    };  

    return ( 
        <div onMouseLeave={() => {handleChange("");}}>         
            <Accordion 
                id={props.title}
                expanded={expanded === props.title}     
                onMouseOver={() => handleChange(props.title)}
                style={{
                    borderRadius: `${expanded ? '8px 8px 0 0' :'8px'}`,
                    background: `${expanded ? '#F8F8F8' : "#FFFFFF"}`,
                    zIndex: `${expanded ? '10' : "1"}`,
                }}
                TransitionProps={slideProps}
            >
                <AccordionSummary  
                    id={props.title}
                >
                    <Typography>  
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
                <AccordionDetails>
                    <Typography>    
                        <S.List>
                            {props.list?.map((id: any) => {
                                return (
                                    <div>
                                        <h1>{id.label || id.name}</h1>
                                        <p>{id.number || id.user_total || id.occurrences_total}</p>
                                    </div>
                                )
                            })}
                        </S.List>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default DropDown;