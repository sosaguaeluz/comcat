import { api } from '../index'
import { useQuery, UseQueryResult } from 'react-query'
import { Dashboard_Occurrences } from '../../@types'

export const getDashboardOccurrences = async <T>(
    initialdate?: string,
    finaldate?: string,
    state?: string,
    city?: string,
    neighborhood?: string,
    annual_occurrences?: string[] | any,    

):Promise<Dashboard_Occurrences> => {

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


    const { data } = await api.get<Dashboard_Occurrences>('/dashboard/occurrences', {
        params: params  
    });

    return data;
};

export const useDashboardOccurrences = <T>(
    initialdate?: string,
    finaldate?: string,
    state?: string,
    city?: string,
    neighborhood?: string
):UseQueryResult<Dashboard_Occurrences> => {
    return useQuery(['dashboard/occurrences',
    initialdate,
    finaldate,
    state,
    city,
    neighborhood
    ], () => getDashboardOccurrences(
        initialdate,
        finaldate,
        state,
        city,
        neighborhood
    )
)};

export const useAnnualOccurrences = <T>(
    initialdate?: string,
    finaldate?: string,
    annual_occurrences?: string[] | any, 
):UseQueryResult<Dashboard_Occurrences> => {
    return useQuery(['dashboard/occurrences',
    initialdate,
    finaldate,
    annual_occurrences
    ], () => getDashboardOccurrences(
        initialdate,
        finaldate,
        annual_occurrences
    )
)};