import { api, queryClient} from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { User, AllUsers } from "../../@types";

const getUsers = async <T>(
    token: string,
    order?: string,
    page?: number,
    take?: number,
    name?: string,
    breed?: string,
    genre?: string,
    state?: string,
    role?: string,
):Promise<AllUsers> => {
        
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
    if(name != undefined){
        params.append("name", name)
    }
    if(breed != undefined && breed != 'All'){
        params.append("breed", breed)    
    }
    if(genre != undefined && genre != 'All'){
        params.append("genre", genre);
    }
    if(state != undefined && state != 'All'){
        params.append("state", state)
    }
    if(role != undefined){
        params.append("role", role)
    }
    console.log('teste', params)
    const resp  = await api.get<AllUsers>('/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: params
    })
    return resp.data;
}

export const useUsers = <T>(
    token: string,
    order?: string,
    page?: number,
    take?: number,
    name?: string,
    breed?: string,
    genre?: string,
    state?: string,
    role?: string,
):UseQueryResult<AllUsers> => {
    return useQuery(['users',
    token,
    order,
    page,
    take,
    name,
    breed,
    genre,
    state,
    role,
    ], () => getUsers(
        token,
        order,
        page,
        take,
        name,
        breed,
        genre,
        state,
        role,
    )
)}

export function postUser(token: string, { id, ...dados }: any){
    const resp =  api.post(`/users`, dados, { 
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    
    return resp
};

export const putUser = async (token: string, id: string, dados: any) => {
    const resp =  await api.put(`/users/${id}`, dados, { 
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    getUsers(token)
    return resp.data
};

export const deleteUser = async (token: string, id: string) => {
    const data = await api.delete(`/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    getUsers(token)
    return data
};

export const getUserById = async (token: string, id: string) => {
    const data = await api.get(`/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data
};