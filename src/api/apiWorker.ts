import { IRegisterData, ILoginData, IAuthorizedUser, IUser } from "./interfaces";
import { updateData } from "../storage/AuthUser";
import { store } from "../storage/Store";

const apiUrl = 'https://rich-teal-leopard-gown.cyclic.app/';//'http://localhost:5000/api';

interface IBodyRequest {
    method: string,
    headers: {'Content-Type': string} | undefined,
    body: string | undefined
};

function send<Type>(reqUrl: string, body: IBodyRequest): Promise<Type> {
    return fetch(`${apiUrl}/${reqUrl}`, {...body})
        .then(res => {
            if (!res.ok)
                throw new Error(res.statusText);
            return res.json() as Promise<Type>;
        });
}

export function register(regData: IRegisterData){
    return send<IAuthorizedUser>('reg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(regData)
    })
    .then((userData: IAuthorizedUser) => {
        store.dispatch(updateData(userData));
    })
    .catch((err: Error) => {
        throw err;
    });
}

export function login(loginData: ILoginData){
    return send<IAuthorizedUser>('login', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then((userData: IAuthorizedUser) => {
        store.dispatch(updateData(userData));
    })
    .catch((err: Error) => {
        throw err;
    });
}

export function getProfile(id: string){
    return send<IUser>('user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    })
    .then((userData: IUser) => {
        return userData;
    })
    .catch((err: Error) => {
        throw err;
    });
}

export function updateProfileSettings(field: string){
    return send('update-user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: store.getState().id,
            field: [field, {...store.getState()}[field]]
        })
    })
    .catch((err: Error) => {
        throw err;
    });
}