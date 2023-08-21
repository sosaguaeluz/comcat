
export function setStatusName(status: string) {
    switch (status) {
        case "Waiting":
            return "Aguardando aprovação";
        case "Approved":
            return "Aprovado";
        case "Disapproved":
            return "Reprovado";
        default:
            return status;
    }
}
;
