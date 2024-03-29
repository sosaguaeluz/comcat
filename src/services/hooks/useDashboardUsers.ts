import { api } from '../index'
import { useQuery, UseQueryResult } from 'react-query'
import { IDashboardUser } from '../../@types/IDashboardUsers';

export const getDashboardUsers = async <T>(
    initialdate?: string,
    finaldate?: string,
    state?: string,
    city?: string,
    neighborhood?: string,
    annual_users?: string[] | any   

):Promise<IDashboardUser > => {

    let params = new URLSearchParams();

    if(initialdate != undefined){
        params.append("initialdate", initialdate)
    }
    if(finaldate != undefined){
        params.append("finaldate", finaldate)
    }
    if(state != undefined){
        params.append("state", state)
    }
    if(city != undefined){
        params.append("city", city)
    }
    if(neighborhood != undefined){
        params.append("neighborhood", neighborhood)
    }

    const { data } = await api.get<IDashboardUser>('/dashboard/users', {
        params: params,
    });

    return data;
};

export const useDashboardUsers = <T>(
    initialdate?: string,
    finaldate?: string,
    state?: string,
    city?: string,
):UseQueryResult<IDashboardUser> => {
    return useQuery(['dashboard/users',
    initialdate,
    finaldate,
    state,
    city,
    ], () => getDashboardUsers(
        initialdate,
        finaldate,
        state,
        city,
    )
)};

export const useAnnualUsers = <T>(
    initialdate?: string,
    finaldate?: string,
    annual_users?: string[] | any, 
):UseQueryResult<IDashboardUser> => {
    return useQuery(['dashboard/users',
    initialdate,
    finaldate,
    annual_users
    ], () => getDashboardUsers(
        initialdate,
        finaldate,
        annual_users
    )
)};