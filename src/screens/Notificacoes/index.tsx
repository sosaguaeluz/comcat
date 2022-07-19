import React, { useEffect, useState } from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { 
    extractDate, 
    useNotifications, 
    useOccurrences, 
    putNotifications 
} from '../../services';
import { RootState } from '../../stores';
import {
    orangeAlertNotify,
    showBlueArow,
    noTrusted
} from '../../assets/index'
import moment from 'moment';
import { extractHours } from '../../services/functions';

const Notificacoes: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.clickState);

    const [ list, setList ] = useState<any>([]);
    const [ atualDate, setAtualDate ] = useState<any>();
    const [ count, setCount ] = useState(10)

    const { data: occurrences } = useOccurrences(
        token,
        'DESC',
        1,
        undefined,
        'No'
    );
    const { data: notifications, refetch } = useNotifications(
        token,
        'DESC',
        1,
        count,
        'Pending'
    );

    function getList(){
        let aux:any =  []
        let arrayAuxList = []
        let tempAuxList: any = []
        let finalList = []
        
        //@ts-ignore
        notifications?.data?.forEach((id: any)=>{
            aux.push(extractDate(id.createdAt))
        })
    
        arrayAuxList = aux.filter((v: any, i: any, a: any) => a.indexOf(v) === i);
    
        arrayAuxList.forEach((id: any)=>{
            tempAuxList.push({
                "date": id,
                "items": []
            })
        })
    
        //@ts-ignore
        notifications?.data?.forEach((contentLista: any)=>{
            for(let i = 0; i < tempAuxList.length; i++){
                if(tempAuxList[i].date == extractDate(contentLista.createdAt)){
                    tempAuxList[i].items.push(contentLista)
                }
            }
        })
    
        setList(tempAuxList)
    }

    useEffect(() => {
        getList()
    }, [notifications])

    useEffect(() => {
        let date = moment().utc(true).format('DD-MM-YYYY');

        setAtualDate(date)

    }, []);

    function setDate(value: string){
        let aux = moment(value);
        let data = moment();
        
        return aux.diff(data, 'hours')
    };

    console.log(list)

    return (
        <S.Container>
            <h1>Notificações</h1>
            {list.map((id: any) => {
                return (
                    <div>
                        <p>{id.date === atualDate ? 'Hoje' : id.date}</p>
                        {id.items.map((item: any) => {
                            return (
                                <div>
                                    <img src={orangeAlertNotify} alt="" />
                                    <h2>Novas ocorrências estão esperando para serem aprovadas!</h2>
                                    <b>Cerca de {occurrences?.length} novas ocorrências estão esperando aprovação.</b>
                                    <p>
                                        {extractDate(item.createdAt) === atualDate 
                                            ? `Rebido há ${setDate(item.createdAt)} horas`
                                            : `Recebido as ${extractHours(item.createdAt)}`}
                                    </p>
                                    <S.ToOccurences to="/registros">
                                        Clique aqui e veja no mapa
                                        <img src={showBlueArow} alt="" />
                                    </S.ToOccurences>
                                    <S.Finished 
                                        type='button'
                                        onClick={() => {
                                            putNotifications(token, item.id, {
                                                status: 'Finished'
                                            }).then(() => {
                                                refetch()
                                            })
                                        }}
                                    >
                                        <img src={noTrusted} alt="" />
                                    </S.Finished>
                                </div>
                            )
                        })}
                    </div>
                );
            })}
        </S.Container>
    )
}

export default Notificacoes;