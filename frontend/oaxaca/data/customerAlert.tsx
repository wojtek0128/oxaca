/**
 * Interface for assistance alerts made by customer.
 */
export interface CustomerAlert {
    readonly id: string,
    readonly tableNo: number,
    readonly timeOfRequest: string,
}