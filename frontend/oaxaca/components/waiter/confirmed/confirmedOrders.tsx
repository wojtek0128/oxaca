import React, {useEffect, useState} from "react";
import ConfirmedOrderItem from "./confirmedOrderItem";

/**
 * Displays all orders with the status Ready and Confirmed respectively.
 *
 * @constructor Fetches all orders with the status Confirmed or Ready from the server.
 */
function ConfirmedOrders() {

    // URLs for Confirmed + Ready orders.
    const ORDER_URL_GETALL_CONFIRMED = "http://localhost:8080/order/getByStatus/confirmed";
    const ORDER_URL_GETALL_READY = "http://localhost:8080/order/getByStatus/ready";

    // States for Orders and Loading.
    const [orders, setOrders] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    /**
     * Fetches Ready + Confirmed orders and concatenates them to one output.
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = window.localStorage.getItem('token');
            try {

                // Fetching Confirmed Orders.
                const responseConfirmed = await fetch(ORDER_URL_GETALL_CONFIRMED, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const ordersConfirmed = await responseConfirmed.json();

                // Fetching Ready Orders.
                const responseReady = await fetch(ORDER_URL_GETALL_READY, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                // Concatenate both outputs and store locally.
                const ordersReady = await responseReady.json();
                setOrders(ordersReady.concat(ordersConfirmed));
            } catch (error) {
                console.log("Oh no. Confirmed and/or Ready orders could not be loaded.");
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
                <h1 className="font-bold p-4 text-md ml-2"> Confirmed Orders </h1>
            </div>

            {/* Confirmed Orders */}
            <div className="p-5 flex flex-col space-y-5 max-h-[30rem] sm:max-h-[30.5rem] xl:max-h-[29rem] 2xl:max-h-[38.5rem] overflow-y-scroll">

                {/* Order template */}
                {!loading ? (
                    orders?.map((order: any) => (
                        <ConfirmedOrderItem order={order} key={order.id} />
                    ))
                ) : (
                    // Displays loading while waiting for data.
                    <p className="text-center font-semibold">Loading...</p>
                )}
            </div>
        </section>
    )
}

export default ConfirmedOrders;
