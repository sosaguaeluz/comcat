import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Dashboard_region_Occurrences } from "../../@types";

const getDashboardRegionOccurrences = async <T>():Promise<Dashboard_region_Occurrences[]> =>{
    const { data: resp } = await api.get<Dashboard_region_Occurrences[]>('/dashboard/region-Occurrences')
    return resp;
};

export const useDashboardRegionOccurrences = <T>():UseQueryResult<Dashboard_region_Occurrences[]> => {
    return useQuery('region_Occurrences', () => getDashboardRegionOccurrences())
};