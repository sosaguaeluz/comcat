import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { SourceFormData, Soucers } from "../../@types";

const getSource = async <T>():Promise<Soucers[]> => {
    const { data } = await api.get<Soucers[]>('/sources')
    return data;
}

export const useSources = <T>():UseQueryResult<Soucers[]> => {
    return useQuery('sources', () => getSource())
}

export function postSource({ id, ...dados }: any){
    const resp = api.post(`/sources`, dados);
    return resp
};

export function putSource(id: string, dados: SourceFormData){
    const resp = api.put(`/sources/${id}`, dados);
    return resp
};

export const deleteSource = async (id: any) => {
    const resp = await api.delete(`/sources/${id}`)

    return resp
};

export const getSourceById = async (id: any) => {
    const resp = await api.get(`/sources/${id}`)

    return resp
};