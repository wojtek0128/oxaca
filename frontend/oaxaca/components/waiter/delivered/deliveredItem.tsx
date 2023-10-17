import DisplayOrderItems from "@/components/displayOrderItems";
import { Order } from "@/data/order";
import { OrderMenuItem } from "@/data/orderMenuItem";
import React, { useEffect, useState } from "react";

/**
 * Displays individual order item which has a status of 'Delivered' from server.
 *
 * @param order Individual order item fetched from server.
 * @constructor Fetches all order items and their quantity for the order item.
 */
function DeliveredItem({ order }: { order: Order }) {

    // Calculate minutes ago per order.
    const now = new Date().getTime();
    const orderTime = new Date(order.timeOfOrder).getTime();
    const timeDifference = Math.floor((now - orderTime) / (1000 * 60));

    // OrderItem URL + order item and loading states.
    const ORDER_URL_ORDERMENUITEMS = `http://localhost:8080/orderItem/getById/${order.id}`;
    const [orderMenuItems, setOrderMenuItems] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    /**
     * Fetches all menu items and quantity for respective order from server.
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
                // Store menu items and quantity locally.
                const orderMenuItems = await response.json();
                setOrderMenuItems(orderMenuItems);
            } catch (error) {
                console.error("Something went wrong. Could not change the status.");
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    /**
     * Changes the payment status to 'Paid'.
     */
    const handlePayment = async () => {
        if (!order.paid) {
            const orderID = order.id;
            const token = window.localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:8080/order/isPaid/${orderID}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                // If the response from the server is no correct.
                if (!response.ok) {
                    throw new Error(`Unable to mark order ${orderID} as paid.`)
                }

            } catch (error) {
                console.error("Oh no! Unable to change the status to paid.");
            }
            // Ensures all values are up-to date.
            location.reload();
        }
    }

    useEffect(() => {
        console.log(order.paid);
    }, [order.paid]);

    return (
        <div className="p-3 bg-basicGrey w-full h-36 rounded-2xl items-center">

            {/* Order + Order Contents + Button columns */}
            <div className="flex flex-row justify-between">

                {/* Order */}
                <div className="flex flex-col min-w-[10%] h-full gap-0.5 justify-between">

                    {/* Order Time */}
                    <div className="px-2 py-1 bg-white rounded-xl">
                        <span className="font-bold text-lg align-middle"> {timeDifference} </span>
                        <span className="font-semibold align-middle"> min(s) ago </span>
                    </div>

                    {/* Table Number + Total amount */}
                    <div className="container flex flex-col px-2">

                        {/* TABLE */}
                        <div>
                            <span className="text-md font-bold -ml-0.5"> {order.waiter.toUpperCase()} </span>
                        </div>

                        {/* TABLE */}
                        <div className="mt-3.5">
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
                <div className="px-2 bg-white h-30 w-4/12 rounded-xl max-h-[7.5rem] overflow-y-scroll 2xl:text-lg">
                    {/* Order template */}
                    {!loading ? (
                        orderMenuItems?.map((orderMenuItem: OrderMenuItem) => (
                            <DisplayOrderItems OrderItem={orderMenuItem} key={orderMenuItem.itemId} />
                        ))
                    ) : (
                        // Display loading while waiting on data.
                        <p className="text-center font-semibold"> Loading... </p>
                    )}
                </div>

                {/* Button */}
                <div className="flex flex-col space-y-2 xl:w-2/12 h-30 bg-white rounded-xl border-r border-darkerGrey justify-center items-center">

                    {/* Title */}
                    <div>
                        <h1 className="px-3 py-1 font-bold text-lg text-center"> Payment Status </h1>
                    </div>

                    {/* Button */}
                    <div className="px-2 justify-between">

                        {/* Complete */}
                        <div className="p-3">
                            <a
                                onClick={handlePayment}
                                className={`${order.paid ? "px-[5rem] bg-lightGreen text-darkGreen" : "px-[3.75rem] bg-lightYellow text-darkYellow hover:bg-darkYellow cursor-pointer hover:text-white" } py-4 font-medium rounded-lg text-xs`}>
                                {order.paid ? 'Paid' : 'Pay in Cash' }
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveredItem;