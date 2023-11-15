export interface ILogin {
    email: string;
    password: string
}
export interface ILoginStore{
    email:string,
    password: string,
    jwtToken: string
}