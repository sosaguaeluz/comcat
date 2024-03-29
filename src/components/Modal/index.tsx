import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

interface IProps {
    open: boolean,
    onClose: () => void,
    children: any,
    width: string,
    padding: number,
    modalBackground: boolean,
    register?: boolean
    height?: string,
}

const PersonalModal: React.FC <IProps> = (props) => {
    
    const style = {
        display: 'block',
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: props.width,
        bgcolor: 'background.paper',
        border: 'none',
        p: props.padding,
        borderRadius: '8px',
        height: props.height,
        overflow:'auto',
    };

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            hideBackdrop={props.modalBackground}
            disableEscapeKeyDown={true}
        >
            {props.register === true ?
                props.children
                :
                <Box sx={style}>
                    {props.children}
                </Box>

            }
        </Modal>
    );
};

export default PersonalModal;