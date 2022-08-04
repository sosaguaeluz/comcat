import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material';

interface IProps {
    onChange: (e: any) => void,
    valueItem: string[] | any,
    width: string | number,
    list: any,
    maxWidth?: number,
};

const theme = createTheme({
    components: {
        MuiSelect: {
            styleOverrides: {
                select: {
                    width: '100%',
                    color: '#2C3941',
                    fontWeight: '700',
                    fontFamily: 'Inter', 
                    borderRadius: '8px',
                    border: '1px solid #AFAFAF', 
                    background: '#fff',
                    paddingTop: '15px',
                    "& :hover": {
                        border: 'none',
                        borderColor: '#AFAFAF'
                    }                    
                },
            }
        },
        MuiInputLabel: {
            styleOverrides:{
                root: {
                    color: '#AFAFAF',
                    // background: 'transparent',
                    "&.Mui-focused": {
                        "color": "#AFAFAF",
                        // 'background': 'transparent',
                        // 'border': 'none'
                    },
                },                
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    color: '#2C3941',
                    fontWeight: '700',
                    fontFamily: 'Inter', 
                    border: '0',
                    borderRadius: '8px  !important', 
                    background: '#FFF !important'
                }
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
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    color: '#2C3941',
                    fontWeight: '700',
                    fontFamily: 'Inter', 
                    border: '1px solid #AFAFAF',
                    borderRadius: '8px  !important', 
                    background: '#FFF !important', 
                }
            }
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    height: '100%',
                }
            }
        }
    }
});

const MultSelect: React.FC <IProps> = (props) => {
    const handleChange = (event: SelectChangeEvent<typeof props.valueItem>) => {
        const {
            target: { value },
        } = event;
        props.onChange(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <ThemeProvider theme={theme}>
            <FormControl 
                variant="filled"
                sx={{ width: props.width, maxWidth: props.maxWidth, height: 58, background: '#FFF  !important', borderRadius: '8px !important', border:'none' }} 
                >
                {props.valueItem.length == 0 ? 
                    <></>                    
                    :
                    <InputLabel>Serviços</InputLabel>
                }
                <Select
                    multiple
                    displayEmpty
                    disableInjectingGlobalStyles
                    value={props.valueItem}
                    onChange={handleChange}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                        return 'Todos os serviços';
                        }
                        return selected.join(', ');
                    }}
                    inputProps={{
                        disableUnderline: true,
                        style: {
                            color: '#2C3941',
                            fontWeight: '700',
                            fontFamily: 'Inter', 
                            border: '0',
                            borderRadius: '8px', 
                            background: '#FFF', 
                            outline: 'none',
                        }
                    }}
                    // inputProps={{ 'aria-label': 'Without label' }}
                    style={{height: '58'}}
                >
                    {/* <MenuItem key='Todos os serviços' value="Todos os serviços">
                        <Checkbox checked={props.valueItem.indexOf('Todos os serviços') > -1} />
                        <ListItemText primary='Todos os serviços' />
                    </MenuItem> */}
                {props.list?.map((id: any, index: number) => (
                    <MenuItem key={index} value={id}>
                        <Checkbox checked={props.valueItem.indexOf(id) > -1} />
                        <ListItemText primary={id} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </ThemeProvider>
    );
};

export default MultSelect;