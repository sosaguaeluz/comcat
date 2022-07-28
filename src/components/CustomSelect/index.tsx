import React, { ReactNode, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material';
import { listCity, listUf, Services } from '../../@types';

type List = {
    value?: string,
    label?: string
};

interface IProps {
    onBlur?: (e: any) => any,
    onChange: (e: any) => any,
    onClick?: () => void,
    label?: string,
    list?: List[] | listUf[] | listCity[] | Services[] | any,
    value?: string,
    defaultValue?: string,
    width?: string | number,
    labelDefault?: string,
    id?: string,
    another_options?: boolean,
    children?: any,
    disabled?: boolean,
    renderValue?: (e: string) => ReactNode
};

const CustomSelect: React.FC<IProps> = (props) => {
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
                styleOverrides: {
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
            <FormControl variant="filled" sx={{ width: props.width, height: 56 }}>
                {props.value === 'All' ?
                    <InputLabel>{props.labelDefault}</InputLabel>
                    :
                    <InputLabel>{props.label}</InputLabel>
                }
                <Select
                    labelId={props.id}
                    id={props.id}
                    disableUnderline
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    defaultValue={props.defaultValue}
                    disabled={props.disabled}
                >
                    <MenuItem disabled value={props.value}>
                        <em>{props.labelDefault}</em>
                    </MenuItem>
                    {props.list?.map((id: any, index: number) => {
                        return (
                            <MenuItem
                                key={index}
                                value={id.value || id.sigla || id.nome || id.name || id.id}
                            >
                                {id.label || id.nome || id.name}
                            </MenuItem>
                        )
                    })}
                    {props.children}
                </Select>
            </FormControl>
        </ThemeProvider>
    );
};

export default CustomSelect;