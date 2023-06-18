import { api, queryClient} from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { User, AllUsers } from "../../@types";

const getUsers = async <T>(
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

    if(order !== undefined){
        params.append("order", order)
    } else {
        params.append("order", "DESC");
    }
    if(page !== undefined){
        params.append("page", page.toString())
    }
    if(take !== undefined){
        params.append("take", take.toString())
    }
    if(name !== undefined){
        params.append("name", name)
    }
    if(breed !== undefined){
        params.append("breed", breed)    
    }
    if(genre !== undefined){
        params.append("genre", genre);
    }
    if(state !== undefined){
        params.append("state", state)
    }
    if(role !== undefined){
        params.append("role", role)
    }
    const resp  = await api.get<AllUsers>('/users', {
        params: params
    })

    return resp.data;
}

const getUsersSearch = async <T>(
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

    if(order !== undefined){
        params.append("order", order)
    } else {
        params.append("order", "DESC");
    }
    if(page !== undefined){
        params.append("page", page.toString())
    }
    if(take !== undefined){
        params.append("take", take.toString())
    }
    if(name !== undefined){
        params.append("name", name)
    }
    if(breed !== undefined){
        params.append("breed", breed)    
    }
    if(genre !== undefined){
        params.append("genre", genre);
    }
    if(state !== undefined){
        params.append("state", state)
    }
    if(role !== undefined){
        params.append("role", role)
    }
    const resp  = await api.get<AllUsers>('/users/search', {
        params: params
    })

    return resp.data;
}

export const useUsers = <T>(
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
    order,
    page,
    take,
    name,
    breed,
    genre,
    state,
    role,
    ], () => getUsers(
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

export const useUsersSearch = <T>(
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
    order,
    page,
    take,
    name,
    breed,
    genre,
    state,
    role,
    ], () => getUsersSearch(
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

export function postUser({ id, ...dados }: any){
    const resp =  api.post(`/users`, dados)
    
    return resp
};

export const putUser = async (id: string, dados: any) => {
    const resp =  await api.put(`/users/${id}`, dados)
    return resp.data
};

export const editUser = async (dados: any) => {
    const resp =  await api.put(`/users/${dados.id}`, dados)
    return resp.data
};

export const deleteUser = async ({...obj}: User):Promise<User> => {
    const resp = await api.delete<User>(`/users/${obj.id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    return resp.data
};

export const getUserById = async (id: string) => {
    const data = await api.get(`/users/${id}`)
    return data
};