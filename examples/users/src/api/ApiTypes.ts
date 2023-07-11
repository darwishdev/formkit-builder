
export interface User {
    userId: number;
    userName: string;
    userPhone: string;
    userEmail: string;
    userPassword: string;
    userRoles: number[];
}

export interface UserCreateRequest {
    userName: string;
    userPhone: string;
    userEmail: string;
    userPassword: string;
    userRoles: number[];
}

export interface UserCreateResponse {
    user?: User;
}

export interface UserUpdateRequest {
    userId: number;
    userName: string;
    userPhone: string;
    userEmail: string;
    userPassword: string;
    userRoles: number[];
}

export interface UserUpdateResponse {
    user?: User;
}


export interface UserFindRequest {
    userId: number;
}

export interface UserFindResponse {
    userId: number;
    userName: string;
    userPhone: string;
    userEmail: string;
    userPassword: string;
    userRoles: number[];
}


export interface ApiClient {
    userCreate: (req: UserCreateRequest) => Promise<UserCreateResponse>
    userCreateWithErr: (req: UserCreateRequest) => Promise<UserCreateResponse>
    userCreateWithGlobalErr: (req: UserCreateRequest) => Promise<UserCreateResponse>
    userUpdate: (req: UserUpdateRequest) => Promise<UserUpdateResponse>
    userUpdateWithErr: (req: UserUpdateRequest) => Promise<UserUpdateResponse>
    userUpdateWithGlobalErr: (req: UserUpdateRequest) => Promise<UserUpdateResponse>
    userFind: (req: UserFindRequest) => Promise<UserFindResponse>
    userFindWithErr: (req: UserFindRequest) => Promise<UserFindResponse>
}