import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Messages } from "../../@types";

const getMessages = async <T>(token: string):Promise<Messages[]> => {
    const { data } = await api.get<Messages[]>('/messages', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data;
};

export const useMessages = <T>(token: string):UseQueryResult<Messages[]> => {
    return useQuery('messages', () => getMessages(token))
};