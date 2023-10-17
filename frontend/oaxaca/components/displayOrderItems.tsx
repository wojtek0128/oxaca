import { OrderMenuItem } from "@/data/orderMenuItem";

/**
 * Template to display order items for each order.
 * @param OrderItem All orders items and their quantity for each order.
 */
function displayOrderItems({ OrderItem }: { OrderItem: OrderMenuItem }) {

    return (
        <div key={OrderItem.itemId}>
            <span> { OrderItem.quantity } </span>
            <span className="-ml-1"> x </span>
            <span> { OrderItem.name } </span>
        </div>
    )
}

export default displayOrderItems;