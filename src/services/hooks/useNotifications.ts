import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Notifications } from "../../@types";

const getNotifications = async (
    order?: string,
    page?: number,
    take?: number,
    status?: string
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

    if(status !== undefined){
        params.append('status', status)
    }

    const { data: resp } = await api.get<Notifications[]>(`/notifications`, {
        params: params
    })

    return resp;
}

export const useNotifications = <T>(
    order?: string,
    page?: number,
    take?: number,
    status?: string
):UseQueryResult<Notifications[]> => {
    return useQuery(['notifications', 
    order,
    page,
    take,
    status
], () => getNotifications(
    order,
    page,
    take,
    status
))}

export const putNotifications = async (
    id: string,
    formData: any,
) => {
    const resp = await api.put(`/notifications/${id}`, formData)

    return resp.data
}