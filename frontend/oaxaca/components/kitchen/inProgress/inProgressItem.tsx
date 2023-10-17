import { Order } from "@/data/order";
import React, { useEffect, useState } from "react";
import { OrderMenuItem } from "@/data/orderMenuItem";
import DisplayOrderItems from "@/components/displayOrderItems";

/**
 * Individual in progress order item containing table number, all order items in the order,
 * time since the order was placed and the current status.
 *
 * @param order Individual in progress order item pulled from server.
 * @constructor Fetches all order items from the server for this current order.
 */
function InProgressItem({ order }: { order: Order }) {

    // Calculate minutes ago per order.
    const now = new Date().getTime();
    const orderTime = new Date(order.timeOfOrder).getTime();
    const timeDifference = Math.floor((now - orderTime) / (1000 * 60));

    // Load OrderItems for each Order.
    const ORDER_URL_ORDERMENUITEMS = `http://localhost:8080/orderItem/getById/${order.id}`;
    const [orderMenuItems, setOrderMenuItems] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    /**
     * Fetches all individual order items from server and their respective quantity.
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
                // Store all items locally.
                const orderMenuItems = await response.json();
                setOrderMenuItems(orderMenuItems);
            } catch (error) {
                console.log("Oh no! Looks like the items could not be loaded.");
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    /**
     * Sets the status of an order to 'Ready'.
     */
    const handleComplete = async () => {
        const orderID = order.id;
        const token = window.localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8080/order/changeStatus/${orderID}/ready`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            // If the response from the server is no correct.
            if (!response.ok) {
                throw new Error("error. order status not updated from confirmed -> ready.")
            }

        } catch (error) {
            console.error("Oh no! Order status could not be changed to 'Ready'.");
        }
        // Ensures all values are up-to date.
        window.location.reload();
    }

    return (
        <div className="p-3 bg-basicGrey w-full h-44 rounded-2xl items-center">

            {/* Order + Order Contents + Button columns */}
            <div className="flex flex-row justify-between">

                {/* Order */}
                <div className="flex flex-col min-w-[10%] h-full gap-20 space-y-2 justify-between">

                    {/* Order Time */}
                    <div className="px-3 py-1 bg-white rounded-xl">
                        <span className="font-bold text-xl align-middle"> {timeDifference} </span>
                        <span className="font-semibold align-bottom"> min(s) ago </span>
                    </div>

                    {/* Table Number */}
                    <div className="container flex flex-col px-2">

                        {/* TABLE NUMBER */}
                        <div>
                            <span className="font-semibold text-lg"> TABLE: # </span>
                            <span className="font-semibold text-lg -ml-1"> {order.tableNo} </span>
                        </div>
                    </div>
                </div>

                {/* Order Contents */}
                <div className="px-2 py-1 bg-white h-44 w-6/12 rounded-xl max-h-[9.5rem] overflow-y-scroll 2xl:text-lg">
                    {/* Order template */}
                    {!loading ? (
                        orderMenuItems?.map((orderMenuItem: OrderMenuItem) => (
                            <DisplayOrderItems OrderItem={orderMenuItem} key={orderMenuItem.itemId} />
                        ))
                    ) : (
                        // Display loading while waiting for items.
                        <p className="text-center font-semibold">Loading...</p>
                    )}
                </div>

                {/* Button */}
                <div className="flex flex-col gap-7 w-56 h-30 bg-white rounded-xl border-r border-darkerGrey justify-center">

                    {/* Title */}
                    <div>
                        <h1 className="px-3 py-1 font-bold text-lg text-center"> Complete Order? </h1>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-row px-2 justify-between">

                        {/* Complete */}
                        <div className="p-3">
                            <a
                                onClick={handleComplete}
                                className="px-16 py-4 font-medium bg-lightGreen hover:bg-darkGreen hover:text-white text-darkGreen rounded-lg text-xs cursor-pointer">
                                Complete
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InProgressItem;