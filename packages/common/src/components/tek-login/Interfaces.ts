import { ILogin } from '@zeedhi/common';

export interface ITekLogin extends ILogin {
    endPoint: string,
    isProduct?: boolean
}
