import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { AllMessages, Messages } from "../../@types";

const getMessages = async <T>(
    order?: string,
    page?: number,
    take?: number,
    // reason?: string,
    // status?: string
):Promise<AllMessages> => {

    let params = new URLSearchParams();

    if(order !== undefined){
        params.append("order", order)
    } else {
        params.append("order", 'DESC')
    }

    if(page !== undefined){
        params.append('page', page.toString())
    }

    if(take !== undefined){
        params.append('take', take.toString())
    }

    // if(reason !== undefined){
    //     params.append("reason", reason)
    // }

    // if(status !== undefined){
    //     params.append('status', status)
    // }

    const  resp = await api.get<AllMessages>('/messages', {
        params: params
    })
    return resp.data;
};

export const useMessages = <T>(
    order?: string,
    page?: number,
    take?: number,
    // reason?: string,
    // status?: string
):UseQueryResult<AllMessages> => {
    return useQuery(['messages', 
    order,
    page,
    take,
    // reason,
    // status
], () => getMessages(
        order,
        page,
        take,
        // reason,
        // status
    ))
};

export const useAlertMessages = <T>(
    order?: string,
    page?: number,
    take?: number,
    // reason?: string,
    // status?: string
):UseQueryResult<AllMessages[]> => {
    return useQuery(['messages', 
    order,
    page,
    take,
    // reason,
    // status
], () => getMessages(
        order,
        page,
        take,
        // reason,
        // status
    ))
};

export const deleteMessage = async (id: string) => {
    const resp = await api.delete(`/messages/${id}`)
  
    return resp.data;
};

export const putMessages = async (id: string, formData: Messages ) => {
    const resp = await api.put(`/messages/${id}`, formData)

    return resp.data
};