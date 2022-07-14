export function getReason(reason: string){
    if(reason === 'Denounce'){
        return 'Denúncia'
    } else if (reason === 'Doubt'){
        return 'Dúvida'
    } else if (reason === 'Complaint'){
        return 'Queixa'
    } else {
        return 'Sugestão'
    }
}