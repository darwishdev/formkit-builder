import type { FormKitSection, FormKitError } from 'formkit-builder/types'
import i18n from '@/plugins/i18n';
const { t } = i18n.global
// import permissions from '@/assets/permissions'
export const sections: FormKitSection[] = [
    {
        user_details: [
            {
                $formkit: 'text',
                outerClass: "col-6",
                name: 'userName',
                label: 'Name',
                placeholder: 'Name',
                validation: 'required|length:3',
            },
            {
                $formkit: 'text',
                outerClass: "col-6",
                name: 'userPhone',
                label: 'Phone',
                placeholder: 'Phone',
                validation: '',
            },
            {
                $formkit: 'email',
                outerClass: "col-12",
                name: 'userEmail',
                label: 'Email',
                placeholder: 'Email',
                validation: 'required|email',
            },
        ],
    },
    {
        passwords: [
            {
                $formkit: 'password',
                outerClass: "col-6",
                name: 'userPassword',
                label: 'Password',
                placeholder: 'Password',
                validation: 'required|length:8|alphanumeric',
            },
            {
                $formkit: 'password',
                outerClass: "col-6",
                name: 'userPassword_confirm',
                label: 'Confirm Password',
                placeholder: 'Re-enter password',
                validation: 'required|confirm'
                // "validation-label": "Password confirmation"
            },
        ],
    },
    {
        security: [
            {
                $formkit: 'dropdown',
                outerClass: "col-12",
                name: 'userRoles',
                label: 'roles',
                placeholder: 'roles',
                options: [
                    { label: 'Admin', value: 1 },
                    { label: 'Chef', value: 2 },
                    { label: 'Cashier', value: 3 },
                    { label: 'Waiter', value: 4 }
                ]
                // validation: 'required',
            }
        ],
    },

]

export const errorHandler: Record<string, FormKitError> = {
    'unique_constraint_users_user_name_key': {
        userName: t('unique_constraint_users_user_name_key')
    },
    'unique_constraint_users_user_phone_key': {
        userPhone: t('unique_constraint_users_user_phone_key')
    },
    'unique_constraint_users_user_email_key': {
        userEmail: t('unique_constraint_users_user_email_key')
    }
}


export const redirectRoute: string = 'users_list'