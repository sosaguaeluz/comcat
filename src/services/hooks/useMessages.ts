import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Messages } from "../../@types";

const getMessages = async <T>(
    token: string,
    order?: string,
    page?: number,
    take?: number,
    reason?: string,
    status?: string
):Promise<Messages[]> => {
    const { data } = await api.get<Messages[]>('/messages', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data;
};

export const useMessages = <T>(
    token: string,
    order?: string,
    page?: number,
    take?: number,
    reason?: string,
    status?: string
):UseQueryResult<Messages[]> => {
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