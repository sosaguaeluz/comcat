export type FormData = {
    "active": boolean,
    "trusted": string
}

export interface IProps {
    onClose: () => void;
    isModal: boolean;
}