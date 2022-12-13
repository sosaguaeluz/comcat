import { IDashboardOccureecen } from './../../@types/IDashboardOccurrence';
import { api } from '../index'
import { useQuery, UseQueryResult } from 'react-query'
import { Dashboard_Occurrences } from '../../@types'

export const getDashboardOccurrences = async <T>(
    state: string,
    city: string,
    service: string,
    font: string,
    status: string,
    special: string,
    locale: string,
    initialDate: string,
    finalDate: string,
    area: string,
    genre: string,
    breed: string 

):Promise<IDashboardOccureecen> => {

    let params = new URLSearchParams();

    if(state !== '') params.append("state", state)
    if(city !== '') params.append("city", city)
    if(service !== '') params.append("service", service)
    if(font !== '') params.append("source", font)
    if(status !== '') params.append("status", status)
    if(special !== '') params.append("special_place", special)
    if(locale !== '') params.append("type_place", locale)
    if(initialDate !== '') params.append("initialdate", initialDate)
    if(finalDate !== '') params.append("finaldate", finalDate)
    if(area !== '') params.append("area", area)
    if(genre !== '') params.append("genre", genre)
    if(breed !== '') params.append("breed", breed)


    const { data } = await api.get<IDashboardOccureecen>('/dashboard/occurrences', {
        params: params,
    });

    return data;
};

export const useDashboardOccurrences = <T>(
    state: string,
    city: string,
    service: string,
    font: string,
    status: string,
    special: string,
    locale: string,
    initialDate: string,
    finalDate: string,
    area: string,
    genre: string,
    breed: string
):UseQueryResult<IDashboardOccureecen> => {
    return useQuery(['dashboard/occurrences',
    state,
    city,
    service,
    font,
    status,
    special,
    locale,
    initialDate,
    finalDate,
    area,
    genre,
    breed
    ], () => getDashboardOccurrences(
        state,
        city,
        service,
        font,
        status,
        special,
        locale,
        initialDate,
        finalDate,
        area,
        genre,
        breed
    )
)};

export const useAnnualOccurrences = <T>(
    state: string,
    city: string,
    service: string,
    font: string,
    status: string,
    special: string,
    locale: string,
    initialDate: string,
    finalDate: string,
    area: string,
    genre: string,
    breed: string
):UseQueryResult<IDashboardOccureecen> => {
    return useQuery(['dashboard/occurrences',
    state,
    city,
    service,
    font,
    status,
    special,
    locale,
    initialDate,
    finalDate,
    area,
    genre,
    breed
    ], () => getDashboardOccurrences(
        state,
        city,
        service,
        font,
        status,
        special,
        locale,
        initialDate,
        finalDate,
        area,
        genre,
        breed
))}