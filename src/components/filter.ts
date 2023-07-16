import { parseDate } from "./shared/FormHelpers";
import type { FormKitNode } from '@formkit/core'
// Define the FilterHandler interface
export interface FilterHandler {
    getDisplayValue(inputNode: FormKitNode): string;
}

// Implement the DefaultInput class
export class DefaultInputFilter implements FilterHandler {
    getDisplayValue(inputNode: FormKitNode): string {
        // console.log(inputNode.value)
        return inputNode.value as string
    }

}

// Implement the ListInput class
export class ListInputFilter implements FilterHandler {
    getDisplayValue(inputNode: FormKitNode): string {
        return inputNode.props.options.find(option => option.value === `__mask_${inputNode.value}`).label
    }
}

// Implement the DateInput class
export class DateInputFilter implements FilterHandler {
    getDisplayValue(inputNode: FormKitNode): string {
        return parseDate(inputNode.value as string)
    }
}

const defaultFilter = new DefaultInputFilter()
const listFilter = new ListInputFilter()
const dateFilter = new DateInputFilter()
export const inputTypes: Record<string, FilterHandler> = {
    "text": defaultFilter,
    "dropdown": listFilter,
    "datepicker": dateFilter,
}