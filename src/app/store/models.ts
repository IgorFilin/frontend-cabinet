export interface IUserState {
    userInfo: {
        isAuth: boolean
        name: string
        id: string
        isAcceptKey: boolean
        role: string
    } | null
}