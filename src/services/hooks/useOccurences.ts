import { api, queryClient} from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Occurrences } from "../../@types";

const getOccurrences = async <T>(
    order: string,
    page: number,
    take: number,
    finished_status: string,
    services: string[] | any,
    address: string,
    state: string,
    city: string,
    initial_date: string,
    final_date: string,
    filterByUserId: string
):Promise<Occurrences[]> => {

    let params = new URLSearchParams();

    if(order !== undefined){
        params.append("order", order)
    } else {
        params.append("order", "DESC");
    }
    if(services !== ''){
        params.append("services", services);
        params.append("services", services);
    }
    if(page !== undefined){
        params.append("page", page.toString())
    }
    if(take !== undefined){
        params.append("take", take.toString())
    }
    if(finished_status !== ""){
        params.append("status", finished_status)
    }
    if(address !== ''){
        params.append("address", address)
    }
    if(city !== ''){
        params.append("city", city)
    }
    if(initial_date !== ''){
        params.append("initial_date", initial_date)
    }
    if(final_date !== ''){
        params.append("final_date", final_date)
    }
    if(state !== ''){
        params.append("state", state)
    }
    if(filterByUserId !== '') {
        params.append("user", filterByUserId);
    }

    const resp = await api.get<Occurrences[]>('/occurrences', {
        params: params
    })
    return resp.data;
}

export const useOccurrences = <T>(
    order: string,
    page: number,
    take: number,
    finished_status: string,
    services: string[] | any,
    address: string,
    state: string,
    city: string,
    initial_date: string,
    final_date: string,
    filterByUserId: string
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
    initial_date,
    final_date ,
    filterByUserId
    ], () => getOccurrences(
        order,
        page,
        take,
        finished_status,
        services,
        address,
        state,
        city,
        initial_date,
        final_date,
        filterByUserId
    )
)}

export const putOccurrences = async (id: string, dados: any) => {
    const resp =  await api.put(`/occurrences/${id}`, dados)
    return resp
};