import { api } from '../index'
import { useQuery, UseQueryResult } from 'react-query'
import { Dashboard_Users } from '../../@types'

export const getDashboardUsers = async <T>(
    token: string,
    initialdate?: string,
    finaldate?: string,
    state?: string,
    city?: string,
    neighborhood?: string,
    annual_users?: string[] | any   

):Promise<Dashboard_Users > => {

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
    if(annual_users == ['']){
        params.append("annual_users", annual_users)
    }

    const { data } = await api.get<Dashboard_Users>('/dashboard/users', {
        headers: {
            Authorization: `Bearer ${token}`
    },
    params: params
    });

    return data;
};

export const useDashboardUsers = <T>(
    token: string,
    initialdate?: string,
    finaldate?: string,
    state?: string,
    city?: string,
    neighborhood?: string,
    annual_users?: string[] | any
):UseQueryResult<Dashboard_Users> => {
    return useQuery(['dashboard/users',
    token,
    initialdate,
    finaldate,
    state,
    city,
    neighborhood,
    annual_users
    ], () => getDashboardUsers(
        token,
        initialdate,
        finaldate,
        state,
        city,
        neighborhood,
        annual_users
    )
)};

export const useAnnualUsers = <T>(
    token: string,
    initialdate?: string,
    finaldate?: string,
    annual_users?: string[] | any, 
):UseQueryResult<Dashboard_Users> => {
    return useQuery(['dashboard/users',
    token,
    initialdate,
    finaldate,
    annual_users
    ], () => getDashboardUsers(
        token,
        initialdate,
        finaldate,
        annual_users
    )
)};