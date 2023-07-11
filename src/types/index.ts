export type Router = {
    push: (to: { name: string }) => Promise<any>;
}
export interface ToastMessageOptions {
    /**
     * Severity level of the message.
     * @defaultValue info
     */
    severity?: 'success' | 'info' | 'warn' | 'error' | undefined;
    /**
     * Summary content of the message.
     */
    summary?: string | undefined;
    /**
     * Detail content of the message.
     */
    detail?: any | undefined;
    /**
     * Whether the message can be closed manually using the close icon.
     * @defaultValue true
     */
    closable?: boolean | undefined;
    /**
     * Delay in milliseconds to close the message automatically.
     */
    life?: number | undefined;
    /**
     * Key of the Toast to display the message.
     */
    group?: string | undefined;
    /**
     * Style class of the message.
     */
    styleClass?: any;
    /**
     * Style class of the content.
     */
    contentStyleClass?: any;
}
export type ToastServiceMethods = {
    add(message: ToastMessageOptions): void;
    /**
     * Clears the messages that belongs to the group.
     * @param {string} group - Name of the message group.
     */
    removeGroup(group: string): void;
    /**
     * Clears all the messages.
     */
    removeAllGroups(): void;
}

export type FormKitComponent = {
    $cmp: string
    props?: Object;
    attrs?: Record<string, any>
}
export type TextFormKitInput = {
    $formkit: string
    outerClass: string
    inputClass?: string
    name: string
    validation?: string
    label?: string
    placeholder?: string
    attrs?: Record<string, any>
    class?: string
}
export type FormKitSelectOptions = {
    value: number
    label: string
}
export type SelectFormKitInput = {
    $formkit: string
    outerClass: string
    inputClass?: string
    name: string
    validation?: string,
    props?: Object,
    closeOnSelect?: boolean
    options?: () => Promise<FormKitSelectOptions[]> | FormKitSelectOptions[]
    optionsPop?: string
    label?: string
    placeholder?: string
    attrs?: Record<string, any>
    class?: string
}
export type FormKitInput = TextFormKitInput | SelectFormKitInput

export type FormKitSpacer = {
    $el: string
    attrs: Record<string, any>
}

export type FormKitHeader = [
    FormKitFlex,
    FormKitHr
]


export type FormKitFlex = {
    $el: string
    attrs: Record<string, any>
    children: [
        FormKitTitle,
        FormKitFlex
    ]
}

export interface FormKitSection {
    [key: string]: Array<FormKitInput | FormKitComponent | FormKitSubmit>;
}

export interface FormKitSectionOutput {
    $el: string
    attrs: Record<string, any>
    children: Array<any>
}

export interface FormFindDataHandler<Req, Res, TargetResponse> {
    findData: (req: Req) => Promise<Res>;
    findRequerPropertyName: string;
    mapFunction?: (response: Res) => TargetResponse;
}
export interface FormKitToastHandler {
    hideToast?: boolean
    title?: String
    message?: String
}
export interface FormSubmitHandler<Req, TargetRequest, Res> {
    submit: (req: TargetRequest) => Promise<Res>;
    indentifierPropertyName?: string;
    errorHandler: Record<string, FormKitError>
    mapFunction?: (req: Req) => TargetRequest;
    redirectRoute: any; // Modify the type to match your redirect route
}
export interface FormKitOptions {
    title: string;
    allowBulkDelete?: boolean;
    showHeaderSubmit?: boolean;
}
export type FormKitSubmit = {
    $formkit: string
    outerClass: string
    label: string
}
export type FormKitTitle = {
    $el: string
    attrs: Record<string, any>
    children: string
}

export type FormKitError = Record<string, string>

export type FormKitErrorHandler = {
    error: Record<string, any>
}
export type FormKitLoading = {
    $cmp: string
    if?: string
}
export type FormKitWraperChild =
    FormKitSpacer | FormKitHeader | FormKitLoading

export type FormKitWraper = {
    $el: string
    attrs: Record<string, any>
    children: FormKitWraperChild[]
}

export type FormKitHr = {
    $el: string
    attrs: Record<string, any>
}

export type FormKitGrid = {
    $el: string
    attrs: Record<string, any>
    children: Array<FormKitInput | FormKitSubmit>
}


export default interface FormKitFactoryInterface {
    CreateSectionOutput(section: FormKitSection): FormKitSectionOutput
    ConvertSections(sections: FormKitSection[]): FormKitSectionOutput[]
    getSpacer(): FormKitSpacer
    getLoading(): FormKitLoading
    getSubmit(): FormKitSubmit
    getFlex(flexChildren: any, justify: string): FormKitFlex
    getTitle(title: string): FormKitTitle
    getHr(): FormKitHr
    getHeader(options: FormKitOptions): FormKitHeader
    getSectionKey(section: FormKitSection): string
    CreateForm(options: FormKitOptions, sections: FormKitSection[]): FormKitWraper
}