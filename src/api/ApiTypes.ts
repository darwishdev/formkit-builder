import type { FormKitSelectOptions } from '@/types/index';

export interface Role {
    roleId: number;
    roleName: string;
    roleDescription: string;
    createdAt?: Date;
    deletedAt?: Date;
}

export interface RoleCreateRequest {
    roleName: string;
    roleDescription: string;
    permissions: number[];
}

export interface RoleCreateResponse {
    role?: Role;
}

export interface RoleUpdateRequest {
    roleId: number;
    roleName: string;
    roleDescription: string;
    permissions: number[];
}

export interface RoleUpdateResponse {
    role?: Role;
}


export interface RoleFindRequest {
    roleId: number;
}

export interface RoleFindResponse {
    roleName: string;
    roleDescription: string;
    permissions: number[];
}

export interface RoleFindResponse {
    roleId: number;
    roleName: string;
    roleUsers: number;
    rolePermissions: number;
}

export interface RolesListRequest { }

export interface RolesListRow {
    roleId: number;
    roleName: string;
    roleUsers: number;
    rolePermissions: number;
}

export interface RolesListResponse {
    roles: RolesListRow[];
    deleteRoles: RolesListRow[];
}



export interface ApiClient {
    rolesList: (request: RolesListRequest) => Promise<RolesListResponse>
    rolesListWithErr: (request: RolesListRequest) => Promise<RolesListResponse>
    roleCreate: (req: RoleCreateRequest) => Promise<RoleCreateResponse>
    roleCreateWithErr: (req: RoleCreateRequest) => Promise<RoleCreateResponse>
    roleCreateWithGlobalErr: (req: RoleCreateRequest) => Promise<RoleCreateResponse>
    roleUpdate: (req: RoleUpdateRequest) => Promise<RoleUpdateResponse>
    roleUpdateWithErr: (req: RoleUpdateRequest) => Promise<RoleUpdateResponse>
    roleUpdateWithGlobalErr: (req: RoleUpdateRequest) => Promise<RoleUpdateResponse>
    roleFind: (req: RoleFindRequest) => Promise<RoleFindResponse>
    roleFindWithErr: (req: RoleFindRequest) => Promise<RoleFindResponse>
    getRolesInput: () => Promise<FormKitSelectOptions[]>
    getRolesInputWithErr: () => Promise<FormKitSelectOptions[]>
}