import React from 'react';
import * as S from './style';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import {
    options,
    closeRed
} from '../../assets/index'
import Poppover from '../Poppover';

interface IProps {
    onClick: () => any,
    serviceName: string,
    fonte?: number | string,
    status: boolean,
    image: string,
    backgrounColor: string,
    onDelete: () => void,
    onEdit: () => void
    width?: string;
}

const CardService: React.FC <IProps> = (props) => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <S.Container>
            <S.Top background={props.backgrounColor}>
                <div>
                    <div>
                        <img src={props.image} alt="" />
                    </div>
                    <div>
                        <p>Serviço</p>
                        <h1>{props.serviceName}</h1>
                    </div>
                </div>
                <S.Options>
                    <Poppover
                        onClick={() => {}}
                            
                        onDelete={
                            props.onDelete
                        }
                        onEdit={
                            props.onEdit
                        }
                        type={
                            "userPanel"
                        }
                    />
                </S.Options>
            </S.Top>
            <S.Bottom status={props.status}>
                <div>
                    <p>Fontes</p>
                    <p>{props.fonte}</p>
                </div>
                <div>
                    <p>Status</p>
                    <p>{props.status == true ? 'Ativo' : 'Inativo'}</p>
                </div>
            </S.Bottom>
        </S.Container>
    );
};

export default CardService;