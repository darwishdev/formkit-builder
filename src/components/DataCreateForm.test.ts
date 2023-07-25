import { mount } from '@vue/test-utils'
import DataCreateForm from './DataCreateForm.vue'
import type { RoleCreateRequest, RoleCreateResponse } from '@/api/ApiTypes';
import apiClient from '@/api/ApiMock';
import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
const jest = require('jest');

const mockUseToast = jest.fn();
const mockI18n = { t: jest.fn() };
const mockUseRouter = jest.fn();

jest.mock('vue-router', () => ({
  useRouter: () => mockUseRouter,
}));

jest.mock('vue-i18n/dist/vue-i18n.js', () => ({
  i18n: () => mockI18n,
}));

jest.mock('@/factory/FormKitFactory', () => jest.fn());
jest.mock('@/components/shared/FormHelpers', () => ({
  handleSuccessToast: jest.fn(),
  handleError: jest.fn(),
}));

describe('DataCreateForm', () => {
  it('renders without crashing', async () => {
    const wrapper = mount(DataCreateForm, {
      global: {
        provide: {
          useToast: mockUseToast,
          i18n: mockI18n,
        },
      },
      props: {
        sections: [
                  {
                    roleInfo: [
                      {
                        $formkit: 'text',
                        outerClass: "col-4",
                        name: 'roleName',
                        label: 'roleNameLabel',
                        placeholder: 'roleNamePlaceholder',
                        validation: 'required|length:3',
                
                      },
                      {
                        $formkit: 'textarea',
                        outerClass: "col-8",
                        name: 'roleDescription',
                        label: 'roleDescriptionLabel',
                        placeholder: 'roleDescriptionPlaceholder',
                        validation: '',
                      },
                      {
                        $formkit: 'taglist',
                        outerClass: "col-12",
                        closeOnSelect: false,
                        name: 'userRoles',
                        label: 'roles',
                        placeholder: 'roles',
                        options: apiClient.getRolesInput
                      }
                    ],
                  }
                ],
        options: {
                  title: "role_create",
                  allowBulkDelete: false,
                },
        submitHandler : {
                  submit: apiClient.roleCreateWithErr,
                  errorHandler: {
                      'unique_constraint_roles_role_name_key': {
                          roleName: 'unique_constraint_roles_role_name_key'
                      }
                  }
                },
        toastHandler : {
        hideToast: false
      },
      },
    });

    await nextTick();

  expect(wrapper.exists()).toBe(true);
  expect(wrapper.text()).toMatch('unique_constraint_roles_role_name_key')
  });

  // Add more tests here to check the functionality of your component
});





// describe('DataCreateForm', () => {
//     it('renders props when passed', () => {
//   const wrapper = mount(DataCreateForm, {
//     props: { 'sections' : [
//         {
//           roleInfo: [
//             {
//               $formkit: 'text',
//               outerClass: "col-4",
//               name: 'roleName',
//               label: 'roleNameLabel',
//               placeholder: 'roleNamePlaceholder',
//               validation: 'required|length:3',
      
//             },
//             {
//               $formkit: 'textarea',
//               outerClass: "col-8",
//               name: 'roleDescription',
//               label: 'roleDescriptionLabel',
//               placeholder: 'roleDescriptionPlaceholder',
//               validation: '',
//             },
//             {
//               $formkit: 'taglist',
//               outerClass: "col-12",
//               closeOnSelect: false,
//               name: 'userRoles',
//               label: 'roles',
//               placeholder: 'roles',
//               options: apiClient.getRolesInput
//             }
//           ],
//         }
//       ],
//       submitHandler : {
//         submit: apiClient.roleCreateWithErr,
//         submitCallBack: (res: any) => {
//           router.push({ name: "list" })
//         },
//         errorHandler: {
//             'unique_constraint_roles_role_name_key': {
//                 roleName: 'unique_constraint_roles_role_name_key'
//             }
//             }
//         ,
//       },
//       toastHandler : {
//         hideToast: false
//       },
//       options : {
//         title: "role_create",
//         allowBulkDelete: false,
//       }
//        }
//   })

//   // Check each prop
  // expect(wrapper.text()).toMatch('unique_constraint_roles_role_name_key')
//   expect(wrapper.text()).toMatch('New Role')
//   // add more expectations as needed
// })
// })