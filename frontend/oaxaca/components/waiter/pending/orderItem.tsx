import { Order } from "@/data/order";
import React, {useEffect, useState} from "react";
import { OrderMenuItem } from "@/data/orderMenuItem";
import DisplayOrderItems from "@/components/displayOrderItems";

/**
 * Displays each individual order with the status 'Pending'.
 *
 * @param order Individual Pending order pulled from the server.
 * @constructor Fetches attributes for the respective Pending order.
 */
function OrderItem({ order }: { order: Order }) {

    // Calculate minutes ago per order.
    const now = new Date().getTime();
    const orderTime = new Date(order.timeOfOrder).getTime();
    const timeDifference = Math.floor((now - orderTime) / (1000 * 60));

    // URL to fetch attributes for the order item.
    const ORDER_URL_ORDERMENUITEMS = `http://localhost:8080/orderItem/getById/${order.id}`;

    // Loading and OrderMenuItem states.
    const [orderMenuItems, setOrderMenuItems] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [waiterName, setWaiterName] = useState<string>();

    /**
     * Fetches all alltributes for the Pending order.
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = window.localStorage.getItem('token');
            try {
                const response = await fetch(ORDER_URL_ORDERMENUITEMS, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                // Stores data locally.
                const orderMenuItems = await response.json();
                setOrderMenuItems(orderMenuItems);
            } catch (error) {
                console.log("Could not load Pending order items.");
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    /**
     * Handles changing the status from 'Pending' to 'Confirmed' and sets the assigned waiter.
     */
    const handleApprove = async () => {
        const orderID = order.id;
        const name = waiterName;
        const token = window.localStorage.getItem('token');
        try {
            const waiterResponse = await fetch(`http://localhost:8080/order/changeWaiter/${orderID}/${name}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const statusResponse = await fetch(`http://localhost:8080/order/changeStatus/${orderID}/confirmed`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!(waiterResponse.ok || statusResponse.ok)) {
                throw new Error(`Unable to set order ${orderID} waiter name to ${name}`);
            }
        } catch (error) {
            console.error("Could not change waiter name.");
        }
        // Refreshes to ensure data displayed is up-to-date.
        location.reload();
    }

    /**
     * Changes the status of an order to 'Cancelled'.
     */
    const handleCancel = async () => {
        const orderID = order.id;
        const token = window.localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8080/order/changeStatus/${orderID}/cancelled`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("error. order status not updated from pending -> cancelled.")
            }

        } catch (error) {
            console.error("Could not cancel order.");
        }
        // Refreshes to ensure data displayed is up-to-date.
        location.reload();
    }

    /**
     * Updates the value stored as the waiters name.
     * @param event Function call event containing the new value.
     */
    const handleChange = (event: any) => {
        const name = event.target.value.toUpperCase();
        setWaiterName(name);
    }

    return (
        <div className="p-3 bg-basicGrey w-full h-36 rounded-2xl items-center">

            {/* Order + Order Contents + Button columns */}
            <div className="flex flex-row justify-between">

                {/* Order */}
                <div className="flex flex-col min-w-[10%] h-full gap-9 justify-between">

                    {/* Order Time */}
                    <div className="px-2 py-1 bg-white rounded-xl">
                        <span className="font-bold text-lg align-middle"> {timeDifference} </span>
                        <span className="font-semibold align-middle"> min(s) ago </span>
                    </div>

                    {/* Table Number + Total amount */}
                    <div className="container flex flex-col px-2">

                        {/* TABLE */}
                        <div>
                            <span className="text-sm"> TABLE: # </span>
                            <span className="text-sm -ml-0.5"> {order.tableNo} </span>
                        </div>

                        {/* TOTAL AMOUNT */}
                        <div>
                            <span className="font-semibold"> TOTAL: £ </span>
                            <span className="font-semibold -ml-1"> {order.price} </span>
                        </div>
                    </div>
                </div>

                {/* Order Contents */}
                <div className="px-2 bg-white h-30 w-4/12 xl:w-6/12 rounded-xl max-h-[7.5rem] overflow-y-scroll 2xl:text-lg">
                    {/* Order template */}
                    {!loading ? (
                        orderMenuItems?.map((orderMenuItem: OrderMenuItem) => (
                            <DisplayOrderItems OrderItem={orderMenuItem} key={orderMenuItem.itemId} />
                        ))
                    ) : (
                        // Displays loading while waiting for data.
                        <p className="text-center font-semibold"> Loading... </p>
                    )}
                </div>

                {/* Button */}
                <div className="flex flex-col w-56 h-30 bg-white rounded-xl border-r border-darkerGrey justify-center">

                    {/* Title */}
                    <div>
                        <h1 className="px-3 py-1 font-bold text-lg text-center"> Assign Waiter </h1>
                    </div>

                    {/* Waiter Input */}
                    <div className="px-5">
                        <input
                            type="text"
                            name="waiter"
                            onChange={(e) => handleChange(e)}
                            className="mt-4 p-2 w-full rounded-md border border-gray-300 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Button */}
                <div className="flex flex-col gap-3 w-56 h-30 bg-white rounded-xl border-r border-darkerGrey justify-center">

                    {/* Title */}
                    <div>
                        <h1 className="px-3 py-1 font-bold text-lg text-center"> Confirm Order? </h1>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-row px-2 justify-between">

                        {/* Cancel */}
                        <div className="p-3">
                            <a
                                onClick={handleCancel}
                                className="px-5 py-3 font-medium bg-lightRed hover:bg-darkRed hover:text-white text-darkRed rounded-lg text-xs cursor-pointer">
                                Cancel
                            </a>
                        </div>

                        {/* Approve */}
                        <div className="p-3">
                            <a
                                onClick={handleApprove}
                                className="px-4 py-3 font-medium bg-lightGreen hover:bg-darkGreen hover:text-white text-darkGreen rounded-lg text-xs cursor-pointer">
                                Approve
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItem;