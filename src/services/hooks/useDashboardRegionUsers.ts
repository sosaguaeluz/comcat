import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Dashboard_region_Users } from "../../@types";

const getDashboardRegionUsers = async <T>():Promise<Dashboard_region_Users[]> =>{
    const { data: resp } = await api.get<Dashboard_region_Users[]>('/dashboard/region-users')
    return resp;
};

export const useDashboardRegionUsers = <T>():UseQueryResult<Dashboard_region_Users[]> => {
    return useQuery('region_User', () => getDashboardRegionUsers())
};