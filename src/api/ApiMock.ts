import type { RoleCreateResponse, ApiClient, RoleCreateRequest } from './ApiTypes'
export const roleCreateRequest: RoleCreateRequest = {
    roleName: "head chef",
    roleDescription: "head chef role",
    permissions: [1, 2, 3, 4, 5]
};
export const roleCreateResponse: RoleCreateResponse = {
    role: {
        roleId: 1,
        roleName: "head chef",
        roleDescription: "head chef role"
    }

};

const apiClient: ApiClient = {
    roleCreate: async (req: RoleCreateRequest): Promise<RoleCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return roleCreateResponse;
    },
    roleCreateWithErr: async (req: RoleCreateRequest): Promise<RoleCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("already_exists unique_constraint_roles_role_name_key")
    },
    roleCreateWithGlobalErr: async (req: RoleCreateRequest): Promise<RoleCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("internal internalServerError")
    },
};

export default apiClient;
