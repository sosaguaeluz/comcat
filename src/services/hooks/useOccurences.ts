import { api, queryClient} from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Occurrences } from "../../@types";

const getOccurrences = async <T>(
    order?: string,
    page?: number,
    take?: number,
    finished_status?: string,
    services?: string[] | any,
    address?: string,
    state?: string,
    city?: string,
    neighborhood?: string,
    initial_date?: string,
    final_date?: string

):Promise<Occurrences[]> => {

    let params = new URLSearchParams();

    if(order != undefined){
        params.append("order", order)
    } else {
        params.append("order", "DESC");
    }
    if(page != undefined){
        params.append("page", page.toString())
    }
    if(take != undefined){
        params.append("take", take.toString())
    }
    if(finished_status != undefined){
        params.append("finished_status", finished_status)
    }
    if(address != undefined){
        params.append("address", address)
    }
    if(city != undefined){
        params.append("city", city)
    }
    if(final_date != undefined){
        params.append("final_date", final_date)
    }
    if(initial_date != undefined){
        params.append("initial_date", initial_date)
    }
    if(neighborhood != undefined){
        params.append("neighborhood", neighborhood)
    }
    if(state != undefined){
        params.append("state", state)
    }

    const resp = await api.get<Occurrences[]>('/occurrences', {
        params: params
    })
    return resp.data;
}

export const useOccurrences = <T>(
    order?: string,
    page?: number,
    take?: number,
    finished_status?: string,
    services?: string[] | any,
    address?: string,
    state?: string,
    city?: string,
    neighborhood?: string,
    initial_date?: string,
    final_date?: string
):UseQueryResult<Occurrences> => {
    return useQuery(['ocurrence', 
    order,
    page,
    take,
    finished_status,
    services,
    address,
    state,
    city,
    neighborhood,
    initial_date,
    final_date 
    ], () => getOccurrences(
        order,
        page,
        take,
        finished_status,
        services,
        address,
        state,
        city,
        neighborhood,
        initial_date,
        final_date
    )
)}

export const putOccurrences = async (id: string, dados: any) => {
    const resp =  await api.put(`/occurrences/${id}`, dados)
    return resp
};