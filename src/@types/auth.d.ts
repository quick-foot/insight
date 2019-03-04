export interface ICallbackResponse extends ICallbackResponseIndex {
    id: string;
    login: string;
    name: string;
    avatar: string;
    accessToken: string;
}

export interface ICallbackResponseIndex {
    [key: string]: string | string[] | undefined;
}
