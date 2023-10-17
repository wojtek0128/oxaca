/**
 * Interface for all orders.
 */
export interface Order {
    readonly id: string,
    readonly tableNo: number,
    readonly  timeOfOrder: string,
    readonly completionStatus: string,
    readonly price: number,
    readonly waiter: string,
    readonly paid: boolean,
}