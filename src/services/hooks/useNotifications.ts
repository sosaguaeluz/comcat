import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Notifications } from "../../@types";

const getNotifications = async (
    token: string,
    order?: string,
    page?: number,
    take?: number
):Promise<Notifications[]> => {

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

    const resp = await api.get<Notifications[]>(`/notifications`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: params
    })

    return resp.data;
}

export const useNotifications = <T>(
    token: string,
    order?: string,
    page?: number,
    take?: number,
):UseQueryResult<Notifications[]> => {
    return useQuery(['notifications', 
    token,
    order,
    page,
    take
], () => getNotifications(
    token,
    order,
    page,
    take
))}

export const putNotifications = async (
    token: string,
    id: string,
    formData: any,
) => {
    const resp = await api.put(`/notifications/${id}`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return resp.data
}