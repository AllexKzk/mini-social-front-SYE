export interface IRegisterData {
    Login: string,
    Password: string,
    Name: string,
    Surname: string
}

export interface ILoginData {
    Login: string,
    Password: string
}

export interface IUser {
    name: string,
    surname: string,
    avatar: string,
    bio: string | undefined
}

export interface IAuthorizedUser {
    id: string,
    token: string
}