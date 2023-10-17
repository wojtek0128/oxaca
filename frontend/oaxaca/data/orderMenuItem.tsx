/**
 * Interface for each order item within an order.
 */
export interface OrderMenuItem {
    readonly itemId: string,
    readonly orderId: string,
    readonly menuId: string,
    readonly quantity: number,
    readonly notes: string
    readonly name: string,
}