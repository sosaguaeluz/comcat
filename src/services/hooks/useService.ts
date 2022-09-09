import { ServiceFormData } from './../../@types/index';
import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Services } from "../../@types";

const getServices = async <T>():Promise<Services[]> => {
    const { data } = await api.get<Services[]>('/services')
    return data;
};

export const useService = <T>():UseQueryResult<Services[]> => {
    return useQuery('services', () => getServices())
};

export function postService({ id, ...dados }: any){
    const resp =  api.post(`/services`, dados)
    
    return resp
};

export const putService = async (id: string, dados: any) => {
    const resp =  await api.put(`/services/${id}`, dados)
    getServices()
    return resp
};

export const deleteService = async (id: string) => {
    const data = await api.delete(`/services/${id}`)
    getServices()
    return data
};

export const getServiceById = async (id: string) => {
    const data = await api.get(`/services/${id}`)
    return data
};