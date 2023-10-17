import React, {useEffect, useState} from "react";
import DeliveredItem from "./deliveredItem";

/**
 * Displays all orders with the status Delivered respectively.
 *
 * @constructor Fetches all orders with the status Delivered from the server.
 */
function DeliveredOrders() {

    // Orders URL + delivered orders and loading states.
    const ORDER_URL_GET_DELIVERED = "http://localhost:8080/order/getByStatus/delivered";
    const [orders, setOrders] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    /**
     * Fetches all orders with the status 'Delivered' from server.
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = window.localStorage.getItem('token');
            try {
                const response = await fetch(ORDER_URL_GET_DELIVERED, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                // Store all alerts locally.
                const orders = await response.json();
                setOrders(orders);
            } catch (error) {
                console.log("Oh no! Could not load delivered orders.");
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <section>
            {/* Context bar */}
            <div className="h-14 -mt-6 border-b">

                {/* Heading */}
                <h1 className="font-bold p-4 text-md ml-2"> Delivered Orders </h1>
            </div>

            {/* In Progress Orders */}
            <div className="p-5 flex flex-col space-y-5 max-h-[30rem] sm:max-h-[30.5rem] xl:max-h-[29rem] 2xl:max-h-[38.5rem] overflow-y-scroll">

                {/* Order template */}
                {!loading ? (
                    orders?.map((order: any) => (
                        <DeliveredItem order={order} key={order.id}/>
                    ))
                ) : (
                    // Display loading while waiting on data.
                    <p className="text-center font-semibold"> Loading... </p>
                )}
            </div>

        </section>
    )
}

export default DeliveredOrders;