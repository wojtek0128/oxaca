import React, { useEffect, useState } from "react";
import CancelledItem from "@/components/kitchen/cancelled/cancelledItem";

/**
 * Displays all cancelled orders to kitchen staff, displaying the table number, all order items
 * in the order and time since the order was placed.
 *
 * @constructor Fetches cancelled orders from backend server.
 */
function CancelledOrders() {

    // Fetch URL + all orders and loading state variables.
    const ORDER_URL_GETCONFIRMED = "http://localhost:8080/order/getByStatus/terminated"
    const [orders, setOrders] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    /**
     * Fetches all cancelled orders from backend server.
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = window.localStorage.getItem('token');
            try {
                const response = await fetch(ORDER_URL_GETCONFIRMED, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                // Store all orders locally.
                const orders = await response.json();
                setOrders(orders);
            } catch (error) {
                console.log("Oh no! Could not load cancelled orders. Please try again.");
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <section>
            {/* Context bar */}
            <div className="h-14 -mt-6 border-b bg-basicGrey">

                {/* Heading */}
                <h1 className="font-bold p-4 text-md ml-2"> Cancelled Orders </h1>
            </div>

            {/* Terminated Orders */}
            <div className="p-5 flex flex-col space-y-5 max-h-[30rem] sm:max-h-[30.5rem] xl:max-h-[29rem] 2xl:max-h-[50rem] overflow-y-scroll">

                {/* Terminated Order template */}
                {!loading ? (
                    orders?.map((order: any) => (
                        <CancelledItem order={order} key={order.id} />
                    ))
                ) : (
                    // Display loading while waiting for orders or if orders cannot be pulled yet.
                    <p className="text-center font-semibold"> Loading... </p>
                )}
            </div>

        </section>
    )
}

export default CancelledOrders;