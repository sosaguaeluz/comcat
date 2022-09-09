import { ibge } from "../index";
import { listUf } from "../../@types/index";
import { useQuery, UseQueryResult } from "react-query";


const getState = async (): Promise<listUf []> => {
    const { data: resp} = await ibge.get<listUf []>('/estados?orderBy=nome')
    return resp;
}

export const useUf = <T>(): UseQueryResult<listUf []> => {
    return useQuery(["state"], () => getState())
}