import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { AllMessages, Messages } from "../../@types";

const getMessages = async <T>(
    token: string,
    order?: string,
    page?: number,
    take?: number,
    reason?: string,
    status?: string
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

    if(reason !== undefined){
        params.append("reason", reason)
    }

    if(status !== undefined){
        params.append('status', status)
    }

    const  resp = await api.get<AllMessages>('/messages', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: params
    })
    return resp.data;
};

export const useMessages = <T>(
    token: string,
    order?: string,
    page?: number,
    take?: number,
    reason?: string,
    status?: string
):UseQueryResult<AllMessages> => {
    return useQuery(['messages', 
    token,
    order,
    page,
    take,
    reason,
    status
], () => getMessages(
        token,
        order,
        page,
        take,
        reason,
        status
    ))
};

export const deleteMessage = async (token: string, id: string) => {
    const resp = await api.delete(`/messages/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
  
    return resp.data;
};

export const putMessages = async (token: string, id: string, formData: Messages ) => {
    const resp = await api.put(`/messages/${id}`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return resp.data
};