import permissions from '@/api/permissions'
import type { FormKitSelectOptions } from '@/types/index';
import type {
    PermissionsListResponse, RoleCreateResponse, ApiClient, RoleCreateRequest, RolesListResponse, RoleUpdateRequest, RoleUpdateResponse, RoleFindRequest, RoleFindResponse
} from './ApiTypes'
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

export const rolesListResponse: RolesListResponse = {
    roles: [
        {
            roleId: 1,
            roleName: "Admin",
            roleUsers: 10,
            rolePermissions: 20
        },
        {
            roleId: 2,
            roleName: "User",
            roleUsers: 50,
            rolePermissions: 30
        }
    ],
    deleteRoles: [
        {
            roleId: 3,
            roleName: "Guest",
            roleUsers: 5,
            rolePermissions: 10
        }
    ]
};
export const roleUpdateRequest: RoleUpdateRequest = {
    roleId: 1,
    roleName: "head chef",
    roleDescription: "head chef role",
    permissions: [1, 2, 3, 4, 5]



};
export const roleUpdateResponse: RoleUpdateResponse = {
    role: {
        roleId: 1,
        roleName: "head chef",
        roleDescription: "head chef role",

    }

};

export const roleFindRequest: RoleFindRequest = {
    roleId: 1,



};
export const roleFindResponse: RoleFindResponse = {
    roleName: "head chef",
    roleDescription: "head chef role",
    permissions: [1, 2, 3, 4, 5],
    roleId: 1,
    roleUsers: 0,
    rolePermissions: 5
};

export const rolesInputOptions: FormKitSelectOptions[] = [
    { label: 'Admin', value: 1 },
    { label: 'Chef', value: 2 },
    { label: 'Cashier', value: 3 },
    { label: 'Waiter', value: 4 }
]
const apiClient: ApiClient = {
    permissionsList: async (): Promise<PermissionsListResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return permissions;
    },
    roleCreate: async (req: RoleCreateRequest): Promise<RoleCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return roleCreateResponse;
    },
    getRolesInput: async (): Promise<FormKitSelectOptions[]> => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        console.log("api hitttt")
        console.log("getRolesInput")
        return rolesInputOptions;
    },
    getRolesInputWithErr: async (): Promise<FormKitSelectOptions[]> => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        throw new Error("error")
    },
    roleCreateWithErr: async (req: RoleCreateRequest): Promise<RoleCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("already_exists unique_constraint_roles_role_name_key")
    },
    rolesList: async (): Promise<RolesListResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return rolesListResponse;
    },
    rolesListWithErr: async (): Promise<RolesListResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        throw new Error('Failed to fetch roles list');
    },
    roleCreateWithGlobalErr: async (req: RoleCreateRequest): Promise<RoleCreateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("internal internalServerError")
    },
    roleUpdate: async (req: RoleUpdateRequest): Promise<RoleUpdateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return roleUpdateResponse;
    },
    roleUpdateWithErr: async (req: RoleUpdateRequest): Promise<RoleUpdateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("already_exists unique_constraint_roles_role_name_key")
    },
    roleUpdateWithGlobalErr: async (req: RoleUpdateRequest): Promise<RoleUpdateResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("internal internalServerError")
    },
    roleFind: async (req: RoleFindRequest): Promise<RoleFindResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(req)
        return roleFindResponse;
    },
    roleFindWithErr: async (req: RoleFindRequest): Promise<RoleFindResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("error finding the role")
    }
};

export default apiClient;
