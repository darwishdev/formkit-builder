

import type FormKitFactoryInterface from '../types';
import type { FormKitOptions, FormKitSection, FormKitSectionOutput, FormKitSpacer, FormKitHr, FormKitHeader, FormKitFlex, FormKitInput, FormKitSubmit, FormKitWraper, FormKitTitle, FormKitLoading } from '../types'

export class FormKitFactory implements FormKitFactoryInterface {
    private static instance: FormKitFactory;
    // isType = <Type>(thing: any): thing is Type => true;
    private constructor() {
        // Private constructor to prevent instantiation
    }
    CreateSectionOutput(section: FormKitSection): FormKitSectionOutput {
        const title = this.getSectionKey(section)
        const formTitle: FormKitTitle = this.getTitle(title)
        const inputs = section[title]
        const formSeciotn: FormKitSectionOutput =
        {
            $el: 'div',
            attrs: {
                class: 'bg-card p-4 border-round mb-4'
            },
            children: [
                formTitle,
                {
                    $el: 'div',
                    attrs: {
                        class: 'grid mt-3'
                    },
                    children: inputs
                },
            ]
        }
        return formSeciotn
    }
    ConvertSections(sections: FormKitSection[]): FormKitSectionOutput[] {
        return sections.map((section: FormKitSection) => this.CreateSectionOutput(section))
    }
    getSpacer(): FormKitSpacer {
        const spacer: FormKitSpacer = {
            $el: 'div',
            attrs: {
                class: 'my-4'
            },
        }
        return spacer
    }

    getLoading(): FormKitLoading {
        const loading: FormKitLoading = {
            $cmp: 'FormLoadiang',

        }
        return loading
    }

    getSubmit(): FormKitSubmit {
        const submit: FormKitSubmit = {
            $formkit: 'submit',
            outerClass: "m-0 w-full",
            label: "submit",

        }
        return submit
    }

    getFlex(flexChildren: any, justify: string = ''): FormKitFlex {
        const flex: FormKitFlex = {
            $el: 'div',
            attrs: {
                class: `flex  justify-content-${justify} align-items-center`
            },
            children: flexChildren

        }
        return flex
    }
    getTitle(title: string): FormKitTitle {
        const formTitle: FormKitTitle = {
            $el: 'h1',
            attrs: {
                class: 'mx-2'
            },
            children: title
        }
        return formTitle
    }
    getHr(): FormKitHr {
        const formHr: FormKitHr = {
            $el: 'hr',
            attrs: {
                class: 'my-4'
            },
        }
        return formHr
    }
    getHeader(options: FormKitOptions): FormKitHeader {
        const stayHereToggle: FormKitInput = {
            $formkit: "toggle",
            outerClass: "mb-0 mx-4",
            label: "stayOnSamePageAfterSuccess",
            name: "stayOnSamePageAfterSuccess"
        }
        const submit = this.getSubmit()
        const title: FormKitTitle = this.getTitle(options.title)
        const header: FormKitHeader =
            [
                this.getFlex(
                    [
                        title,
                        this.getFlex(options.allowBulkDelete ? [
                            stayHereToggle,
                            submit,
                        ] : [submit]),
                    ],

                    'between'
                ),
                this.getHr()
            ]
        return header
    }

    getSectionKey(section: FormKitSection): string {
        return Object.keys(section)[0]
    }
    CreateForm(options: FormKitOptions, sections: FormKitSection[]): FormKitWraper {
        const submit = this.getSubmit()
        const header = this.getHeader(options)
        const formWrapper: FormKitWraper =
        {
            $el: 'div',
            attrs: {
                class: 'bg-card p-4 border-round'
            },
            children: [...header]
        }

        const lastSection = sections[sections.length - 1]
        const lastSectionKey = this.getSectionKey(lastSection)
        lastSection[lastSectionKey].push(submit)
        formWrapper.children.push(...this.ConvertSections(sections))
        return formWrapper
    }

    public static getInstance(): FormKitFactory {
        if (!FormKitFactory.instance) {
            FormKitFactory.instance = new FormKitFactory();
        }
        return FormKitFactory.instance;
    }
}


export default FormKitFactory.getInstance();