import { IRegisterData, ILoginData, IAuthorizedUser, IUser } from "./interfaces";
import { setUser, setUserData } from "../storage/AuthUser";
import { store } from "../storage/Store";
import { IPostsCollection, IPost } from "../Components/Posts/IPost";

export const serverUrl = 'https://rich-teal-leopard-gown.cyclic.app';
const apiUrl = `${serverUrl}/api`;

interface IBodyRequest {
    method: string,
    headers: {'Content-Type': string} | undefined,
    body: string | undefined | FormData
};

function send<Type>(reqUrl: string, body: IBodyRequest): Promise<Type> {
    return fetch(`${apiUrl}/${reqUrl}`, {...body})
        .then(res => {
            if (!res.ok)
                throw new Error(res.statusText);
            return res.json() as Promise<Type>;
        });
}

export function sendUnFollow(userId: string){
    return send('unfollow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            followerId: sessionStorage.getItem('id')
        })
    })
    .catch((err: Error) => {
        throw err;
    });
}

export function sendFollow(userId: string){
    return send('follow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            followerId: sessionStorage.getItem('id')
        })
    })
    .catch((err: Error) => {
        throw err;
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
        store.dispatch(setUser(userData));
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
        store.dispatch(setUser(userData));
        return userData.id;
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
        console.log(userData.friends);
        return userData;
    })
    .catch((err: Error) => {
        throw err;
    });
}

export function updateProfileSettings(field: string, value: string){
    return send('update-user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: sessionStorage.getItem('id'),
            field: [field, value]
        })
    })
    .catch((err: Error) => {
        throw err;
    });
}

export function authByToken(){
    return send<IUser>('bytoken', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: sessionStorage.getItem('id'),
            token: sessionStorage.getItem('token')
        })
    })
    .then((userData: IUser) => {
        store.dispatch(setUserData(userData));
    })
    .catch((err: Error) => {
        throw err;
    });
}

export function createPost(caption: string | null, img: File | null){
    const form = new FormData();
    if (img)
        form.append('caption-img', img);
    if (caption)
        form.append('caption', caption);

    form.append('authorId', sessionStorage.getItem('id')!);
    return send('create-post', {
        method: 'POST',
        headers: undefined,
        body: form
    })
    .catch((err: Error) => {
        throw err;
    });
}

export function getPosts(sources: string[], minId: string){
    return send<IPost[]>('get-posts', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sources: sources,
            reqUserId: sessionStorage.getItem('id'),
            minId: minId
        })
    })
    .then((posts: IPost[]) => {
        const collection: IPostsCollection = {
            posts: posts,
            lastPostId: posts.length ? posts[posts.length - 1].id : '0'
        };
        return collection;
    })
    .catch((err: Error) => {
        throw err;
    });
}

export function likePost(postId: string){
    return send('like', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postId: postId,
            authorId: sessionStorage.getItem('id')
        })
    })
    .catch((err: Error) => {
        throw err;
    });
}

export function uploadAvatar(img: File){
    const form = new FormData();

    form.append('avatar', img);
    form.append('id', sessionStorage.getItem('id')!);

    return send('load-avatar', {
        method: 'POST',
        headers: undefined,
        body: form
    })
    .catch((err: Error) => {
        throw err;
    });
}

export function getFile(key: string, callback: (url: string) => void){
    return send<{signedSrc: string}>('image', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            key: key
        })
    })
    .then((data: {signedSrc: string}) => {
        callback(data.signedSrc);
    })
    .catch((err: Error) => {
        throw err;
    });
}