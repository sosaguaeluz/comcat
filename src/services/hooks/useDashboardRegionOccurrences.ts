import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Dashboard_region_Occurrences } from "../../@types";

const getDashboardRegionOccurrences = async <T>(token: string):Promise<Dashboard_region_Occurrences[]> =>{
    const { data: resp } = await api.get<Dashboard_region_Occurrences[]>('/dashboard/region-Occurrences', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return resp;
};

export const useDashboardRegionOccurrences = <T>(token: string):UseQueryResult<Dashboard_region_Occurrences[]> => {
    return useQuery(['region_Occurrences', token], () => getDashboardRegionOccurrences(token))
};