import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

interface IProps {
    open: boolean,
    onClose: () => void,
    children: any,
    width: number,
    padding: number,
    modalBackground: boolean
}

const PersonalModal: React.FC <IProps> = (props) => {
    const style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: props.width,
      bgcolor: 'background.paper',
      border: 'none',
      p: props.padding,
      borderRadius: '8px',
    };
    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            hideBackdrop={props.modalBackground}
        >
            <Box sx={style}>
                {props.children}
            </Box>
        </Modal>
    );
};

export default PersonalModal;