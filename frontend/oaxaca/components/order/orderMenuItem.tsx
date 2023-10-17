import React, { useState } from "react";
import { Item } from "@/data/item";
import CheckoutItem from "../../data/CheckoutItem";

type Props = {
    item: Item;
    orderItems: CheckoutItem[];
    setOrderItems: React.Dispatch<React.SetStateAction<CheckoutItem[]>>;
    itemPrices: number;
    setItemPrices: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Loaded individual menu item from server. Displays title, description and price with
 * the ability to change the quantity of each menu item chosen.
 *
 * @param item Individual menu item loaded from server.
 * @param orderItems Ancestor useState to store all wanted menu items and quantity.
 * @param setOrderItems Setter for orderItems.
 * @param itemPrices Ancestor useState for the total price of all selected items.
 * @param setItemPrices Setter for itemPrices.
 */
const OrderMenuItem = ({ item, orderItems, setOrderItems, itemPrices, setItemPrices }: Props) => {

    /**
     * Check if array contains stored quantity, if not, set to 0.
     */
    const [quantity, setQuantity] = useState<number>(() => {
        const existingCheckoutItem = orderItems.find(existingItem => existingItem.id == item.menuid);
        return existingCheckoutItem ? existingCheckoutItem.quantity : 0;
    });

    /**
     * Creates new CheckoutItem corresponding to menu item.
     */
    const checkoutItem: CheckoutItem = new CheckoutItem(item.menuid, item.pname, quantity, item.price);

    /**
     * Index's orderItems check if a value for respective item has already been stored.
     * @param checkoutItem
     */
    function returnIndex(checkoutItem: CheckoutItem): number {
        return orderItems.findIndex(existingItem => existingItem.id == checkoutItem.id);
    }

    /**
     * Increments the quantity of a menu item by one.
     *
     * @param checkoutItem Current item object being to have quantity increased by 1.
     */
    function handleIncrement(checkoutItem: CheckoutItem) {

        // Find index of item, if > -1, it exists.
        const index = returnIndex(checkoutItem);
        setQuantity(checkoutItem.quantity = (checkoutItem.quantity + 1));

        if (index != -1) {
            orderItems[index].quantity++;

        } else {
            orderItems.push(checkoutItem);
        }

        // Update total cart value.
        setItemPrices(itemPrices + (checkoutItem.price * 100));
        setOrderItems(orderItems);
    }

    /**
     * Decrements the quantity of a menu item by one. If set to change quantity
     * to zero, it deletes the item from orderItems.
     *
     * @param checkoutItem Current item object being to have quantity decreased by 1.
     */
    function handleDecrement(checkoutItem: CheckoutItem) {
        if (checkoutItem.quantity != 0) {

            const index = returnIndex(checkoutItem);

            // Remove object from array if next quantity is 0.
            if (checkoutItem.quantity == 1) {
                setQuantity(0);
                orderItems.splice(index, 1);
            }
            // Decrement quantity value by 1.
            else {
                setQuantity(checkoutItem.quantity = (checkoutItem.quantity - 1));

                if (index != -1) {
                    orderItems[index].quantity--;
                } else {
                    orderItems.push(checkoutItem);
                }
            }
            // Update total cart value.
            setItemPrices(itemPrices - (checkoutItem.price * 100));
            setOrderItems(orderItems);
        }
    }

    return (
        <div className="bg-white border-2 border-gray-100 p-4 rounded-xl relative">

            {/* Menu Item information */}
            <div className="flex flex-col items-center my-3 space-y-3.5">
                <h1 className="text-gray-900 font-bold text-2xl"> {item.pname} </h1>
                <p className="text-gray-500 text-sm text-center"> {item.description.slice(0, 100)} </p>
                <h2 className="text-gray-900 text-2xl font-semibold"> £{item.price} </h2>

                {/* Add to Order Button */}
                <div>
                    <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                    {/* Highlights border if item is chosen */}
                    <div className={`${quantity > 0 ? "border-pink-500" : "border-gray-200"} flex items-center rounded border`}>

                        {/* Decrease Quantity */}
                        <button
                            onClick={() => handleDecrement(checkoutItem)}
                            type="button"
                            className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
                        >
                            -
                        </button>

                        {/* Display Quantity */}
                        <span>
                          <input
                              type="number"
                              id="Quantity"
                              value={ quantity }
                              className="h-10 w-16 border-y-0 font-semibold border-gray-200 text-center sm:text-sm [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </span>

                        {/* Increase Quantity */}
                        <button
                            onClick={() => handleIncrement(checkoutItem)}
                            type="button"
                            className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default OrderMenuItem;