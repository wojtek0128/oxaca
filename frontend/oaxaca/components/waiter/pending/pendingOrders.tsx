import React, {useEffect, useState} from "react";
import OrderItem from "./orderItem";

/**
 * Displays all orders with the status Pending as a list.
 *
 * @constructor Loads data from server to display all orders with the status 'Pending'.
 */
function PendingOrders() {

    // URL to get all Pending orders.
    const ORDER_URL_GETALL = "http://localhost:8080/order/getByStatus/pending"

    // Order and Loading states.
    const [orders, setOrders] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    /**
     * Fetches all Pending orders from the server and stores data locally.
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = window.localStorage.getItem('token');
            try {
                const response = await fetch(ORDER_URL_GETALL, {
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
                console.log("Could not fetch Pending orders.");
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
                <h1 className="font-bold p-4 text-md ml-2"> Pending Orders </h1>
            </div>

            {/* Pending Orders */}
            <div className="p-5 flex flex-col space-y-5 max-h-[30rem] sm:max-h-[30.5rem] xl:max-h-[29rem] 2xl:max-h-[38.5rem] overflow-y-scroll">

                {/* Order template*/}
                {!loading ? (
                    orders?.map((order: any) => (
                        <OrderItem order={order} key={order.id} />
                    ))
                ) : (
                    // Displays loading while waiting for data.
                    <p className="text-center font-semibold"> Loading... </p>
                )}
            </div>
        </section>
    )
}

export default PendingOrders;