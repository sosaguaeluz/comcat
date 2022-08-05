import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Dashboard_region_Users } from "../../@types";

const getDashboardRegionUsers = async <T>(token: string):Promise<Dashboard_region_Users[]> =>{
    const { data: resp } = await api.get<Dashboard_region_Users[]>('/dashboard/region-users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return resp;
};

export const useDashboardRegionUsers = <T>(token: string):UseQueryResult<Dashboard_region_Users[]> => {
    return useQuery('region_User', () => getDashboardRegionUsers(token))
};