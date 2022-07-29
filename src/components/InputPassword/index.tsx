import React from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, createTheme, IconButton, InputAdornment, ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';
import { PassThrough } from 'stream';

const theme = createTheme({
    components: {
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
        }
    },
});

interface IProps {
    label: string,
    onChange: (e: any) => any,
    onBlur: (e: any) => any,
    type: string,
    value: any,
    width: string | number,
    maxWidth?: number,
    ref? : any,
    id?: string,
    name?: string
    disabled?: boolean;
    defaultValue?: string;
}
interface State {
    password: string;
    showPassword: boolean;
}

const InputPassword: React.FC <IProps> = (props) => {
    const [values, setValues] = React.useState<State>({
        password: "",
        showPassword: false
      });
    
      const handleChange = (prop: keyof State) => (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword
        });
      };
    
      const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
      ) => {
        event.preventDefault();
      };

    return (
        <ThemeProvider theme={theme}>
            <FormControl
                variant="filled"
                sx={{ width: props.width, maxWidth: props.maxWidth, height: 56, background: '#FFF  !important', borderRadius: '8px !important', border:'none'}}
            >
                <TextField
                    name={props.name} 
                    variant="filled" 
                    type='password'
                    label={props.label}
                    value={props.value}
                    id={props.id}
                    ref={props.ref}
                    autoComplete="off"
                    defaultValue={props.defaultValue}
                    disabled= {props.disabled}
                    InputProps={{
                        disableUnderline: true,
                        style: {
                            color: '#2C3941',
                            fontWeight: '700',
                            fontFamily: 'Inter', 
                            border: '0',
                            borderRadius: '8px', 
                            background: '#FFF', 
                            outline: 'none',
                        },
                        // endAdornment: (
                        //     <InputAdornment position="end">
                        //       <Button
                        //         onClick={handleClickShowPassword}
                        //         onMouseDown={handleMouseDownPassword}
                        //         edge="end"
                        //       >
                        //         {values.showPassword ? "Ver Senha" : "Desver"}
                        //       </Button>
                        //     </InputAdornment>
                        // )
                    }}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                />
            </FormControl>
        </ThemeProvider>
    );
};

export default InputPassword;