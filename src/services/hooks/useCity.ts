import { ibge } from "../index";
import { City } from "../../@types/index";
import { useQuery, UseQueryResult } from "react-query";

export const getCity = async (sigla: string):Promise<City[]> => {
    const { data: resp } = await ibge.get<City []>(`/estados/${sigla}/municipios?orderBy=nome`)

    return resp;
}

export const useCity = (sigla: string):UseQueryResult<City []> => {
    return useQuery(["city", sigla], () => getCity(sigla))
}