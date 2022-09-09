import { api, queryClient} from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Uploads } from "../../@types";

const getUploads = async <T>():Promise<Uploads[]> => {
    const { data } = await api.get<Uploads[]>('/uploads')
    return data;
}

export const useUploads = <T>():UseQueryResult<Uploads[]> => {
    return useQuery('uploads', () => getUploads())
}