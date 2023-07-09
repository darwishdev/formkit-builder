

export interface RolesListRequest { }

export interface RoleCreateRequest {
    roleName: string;
    roleDescription: string;
    permissions: number[];
}

export interface RoleCreateResponse {
    role?: Role;
}




export interface Role {
    roleId: number;
    roleName: string;
    roleDescription: string;
    createdAt?: Date;
    deletedAt?: Date;
}
export interface RoleFindResponse {
    roleId: number;
    roleName: string;
    roleUsers: number;
    rolePermissions: number;
}

export interface ApiClient {
    roleCreate: (req: RoleCreateRequest) => Promise<RoleCreateResponse>
    roleCreateWithErr: (req: RoleCreateRequest) => Promise<RoleCreateResponse>
    roleCreateWithGlobalErr: (req: RoleCreateRequest) => Promise<RoleCreateResponse>
}