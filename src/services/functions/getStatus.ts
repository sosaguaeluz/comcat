export function getStatus(status: string){
    if(status === 'Answered'){
        return 'Respondida'
    } else {
        return 'Não respondida'
    }
}