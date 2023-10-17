/**
 * Interface for menu items.
 */
export interface Item {
    readonly menuid: string,
    readonly pname: string,
    readonly description: string,
    readonly course: string,
    readonly price: number,
    readonly calories: number,
    readonly availability: boolean,
    readonly ingredients: string,

    
}