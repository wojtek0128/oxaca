import React, {useEffect, useState} from "react";
import InProgressItem from "./inProgressItem";

/**
 * Displays all in progress orders to kitchen staff, displaying the table number, all order items
 * in the order, time since the order was placed and the status of the current order.
 *
 * @constructor Fetches in progress (confirmed and ready) orders from server.
 */
function InProgressOrders() {

    // InProgress URL + Loading and Orders states.
    const ORDER_URL_GETCONFIRMED = "http://localhost:8080/order/getByStatus/confirmed"
    const [orders, setOrders] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    /**
     * Fetches all InProgress orders (confirmed + ready) from the server.
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
                // Stores orders locally.
                const orders = await response.json();
                setOrders(orders);
            } catch (error) {
                console.log("Oh no! Could not load orders. Please try again.");
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
                <h1 className="font-bold p-4 text-md ml-2"> In Progress </h1>
            </div>

            {/* In Progress Orders */}
            <div className="p-5 flex flex-col space-y-5 max-h-[30rem] sm:max-h-[30.5rem] xl:max-h-[29rem] 2xl:max-h-[50rem] overflow-y-scroll">

                {/* Order template */}
                {!loading ? (
                    orders?.map((order: any) => (
                        <InProgressItem order={order} key={order.id} />
                    ))
                ) : (
                    // Displays 'Loading' while waiting for items from server.
                    <p className="text-center font-semibold"> Loading... </p>
                )}
            </div>

        </section>
        )
}

export default InProgressOrders;