import type { PermissionsListResponse } from "./ApiTypes"

const perms: PermissionsListResponse = {
    "permissions": [
        {
            "permissions": [
                {
                    "permission_id": 1,
                    "permission_name": "create role",
                    "permission_function": "",
                    "permission_description": "Permission to create a role"
                },
                {
                    "permission_id": 2,
                    "permission_name": "update role",
                    "permission_function": "",
                    "permission_description": "Permission to update a role"
                },
                {
                    "permission_id": 3,
                    "permission_name": "list roles",
                    "permission_function": "",
                    "permission_description": "Permission to list roles"
                },
                {
                    "permission_id": 4,
                    "permission_name": "find role",
                    "permission_function": "",
                    "permission_description": "Permission to find a role"
                },
                {
                    "permission_id": 5,
                    "permission_name": "delete/restore role",
                    "permission_function": "",
                    "permission_description": "Permission to delete or restore a role"
                }
            ],
            "group": "roles"
        },
        {
            "permissions": [
                {
                    "permission_id": 6,
                    "permission_name": "create user",
                    "permission_function": "",
                    "permission_description": "Permission to create a user"
                },
                {
                    "permission_id": 7,
                    "permission_name": "update user",
                    "permission_function": "",
                    "permission_description": "Permission to update a user"
                },
                {
                    "permission_id": 8,
                    "permission_name": "list users",
                    "permission_function": "",
                    "permission_description": "Permission to list users"
                },
                {
                    "permission_id": 9,
                    "permission_name": "find user",
                    "permission_function": "",
                    "permission_description": "Permission to find a user"
                },
                {
                    "permission_id": 10,
                    "permission_name": "delete/restore user",
                    "permission_function": "",
                    "permission_description": "Permission to delete or restore a user"
                },
                {
                    "permission_id": 11,
                    "permission_name": "update user roles/permissions",
                    "permission_function": "",
                    "permission_description": "Permission to update user roles and permissions"
                }
            ],
            "group": "users"
        },
        {
            "permissions": [
                {
                    "permission_id": 12,
                    "permission_name": "find menu",
                    "permission_function": "",
                    "permission_description": "Permission to find a menu"
                }
            ],
            "group": "menu"
        },
        {
            "permissions": [
                {
                    "permission_id": 13,
                    "permission_name": "create order",
                    "permission_function": "",
                    "permission_description": "Permission to create an order"
                }
            ],
            "group": "orders"
        }
    ],
    "permissionsIds": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13
    ]
}
export default perms