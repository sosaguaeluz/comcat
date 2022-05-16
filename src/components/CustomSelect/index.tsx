import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type List = {
    value?: string,
    label?: string
};

type State = {
    id?: number,
    sigla?: string,
    nome?:string,
}

interface IProps {
    onBlur?:(e: any) => any,
    onChange: (e: any) => any,
    onClick?: () => void,
    label: string,
    list: List[] | State[] | any,
    value: string,
    defaultValue?: string,
    width?: string,
    labelDefault?: string,
};

const CustomSelect:React.FC <IProps> = (props) => {
    const theme = createTheme({
        components: {
            MuiSelect: {
                styleOverrides: {
                    select: {
                        color: '#2C3941',
                        fontWeight: '700',
                        fontFamily: 'Inter', 
                        border: '1px solid #AFAFAF !important',
                        borderRadius: '8px', 
                        background: '#fff',
                        paddingTop: '25px',
                    },
                    
                }
            },
            MuiInputLabel: {
                styleOverrides:{
                    root: {
                    color: '#AFAFAF',
                    "&.Mui-focused": {
                        "color": "#AFAFAF",
                        },
                    },
                    
                }
            },
            MuiFormControl: {
                styleOverrides: {
                    root: {
                        border: '0',
                        "*": {
                            "border": 'none',
                        }
                    },
                }
            }
        }
    });
    
    const handleChange = (event: any) => props.onChange(event.target.value);
    
    return (
        <ThemeProvider theme={theme} >
            <FormControl variant="filled" sx={{ minWidth: 372, height: 56 }}>
                {props.value === '' ? 
                    <InputLabel>{props.labelDefault}</InputLabel>
                    :
                    <InputLabel>{props.label}</InputLabel>
                }
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    disableUnderline
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                >
                    <MenuItem disabled value="">
                        <em>{props.labelDefault}</em>
                    </MenuItem>
                    {props.list?.map((id: any, index: number) => {
                        return (
                            <MenuItem 
                                key={index} 
                                value={id.value || id.nome}
                            >
                                {id.label || id.nome}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </ThemeProvider>
    );
};

export default CustomSelect;