import type {
    UserCreateResponse, ApiClient, UserCreateRequest, UserUpdateRequest, UserUpdateResponse, UserFindRequest, UserFindResponse
} from './ApiTypes'
export const userCreateRequest: UserCreateRequest = {
    userName: "admin",
    userPhone: "010202000200",
    userEmail: "admin@mln.com",
    userPassword: "123456789",
    userRoles: [1, 2, 3]
};
export const userCreateResponse: UserCreateResponse = {
    user: {
        userId: 1,
        userName: "admin",
        userPhone: "010202000200",
        userEmail: "admin@mln.com",
        userPassword: "123456789",
        userRoles: [1, 2, 3]
    }

};
export const userUpdateRequest: UserUpdateRequest = {
    userId: 1,
    userName: "admin2",
    userPhone: "010202000210",
    userEmail: "admin@mln.com",
    userPassword: "123456789",
    userRoles: [1, 2, 3, 4]



};
export const userUpdateResponse: UserUpdateResponse = {
    user: {
        userId: 1,
        userName: "admin2",
        userPhone: "010202000210",
        userEmail: "admin@mln.com",
        userPassword: "123456789",
        userRoles: [1, 2, 3, 4]

    }

};

export const userFindRequest: UserFindRequest = {
    userId: 1,



};
export const userFindResponse: UserFindResponse = {
    userId: 1,
    userName: "admin2",
    userPhone: "010202000210",
    userEmail: "admin@mln.com",
    userPassword: "123456789",
    userRoles: [1, 2, 3, 4]
};
const apiClient: ApiClient = {
    userCreate: async (req: UserCreateRequest): Promise<UserCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return userCreateResponse;
    },
    userCreateWithErr: async (req: UserCreateRequest): Promise<UserCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("already_exists unique_constraint_users_user_name_key")
    },
    userCreateWithGlobalErr: async (req: UserCreateRequest): Promise<UserCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("internal internalServerError")
    },
    userUpdate: async (req: UserUpdateRequest): Promise<UserUpdateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return userUpdateResponse;
    },
    userUpdateWithErr: async (req: UserUpdateRequest): Promise<UserUpdateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("already_exists unique_constraint_users_user_name_key")
    },
    userUpdateWithGlobalErr: async (req: UserUpdateRequest): Promise<UserUpdateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("internal internalServerError")
    },
    userFind: async (req: UserFindRequest): Promise<UserFindResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return userFindResponse;
    },
    userFindWithErr: async (req: UserFindRequest): Promise<UserFindResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("error finding the user")
    }
};

export default apiClient;
