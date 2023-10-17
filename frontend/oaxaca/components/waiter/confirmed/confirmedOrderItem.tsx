import { Order } from "@/data/order";
import React, {useEffect, useState} from "react";
import { OrderMenuItem } from "@/data/orderMenuItem";
import DisplayOrderItems from "@/components/displayOrderItems";

/**
 * Displays individual order item which has a status of 'Confirmed' or 'Ready' from server.
 *
 * @param order Individual order item fetched from server.
 * @constructor Fetches all order items and their quantity for the order item.
 */
function ConfirmedOrderItem({ order }: { order: Order }) {

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
     * Changes status of the order to 'Terminated'.
     */
    const handleTerminated = async () => {
        const orderID = order.id;
        const token = window.localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8080/order/changeStatus/${orderID}/terminated`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("error. order status not updated from confirmed -> terminated.")
            }

        } catch (error) {
            console.error("Something went wrong. Could not change the status.");
        }
        // Reload to ensure data is up-to date.
        window.location.reload();
    }

    /**
     * Changes status of the order to 'Ready'.
     */
    const handleReady = async () => {
        const orderID = order.id;
        const token = window.localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8080/order/changeStatus/${orderID}/ready`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("error. order status not updated from confirmed -> cancelled.")
            }

        } catch (error) {
            console.error("Something went wrong. Could not change the status.");
        }
        // Reload to ensure data is up-to date.
        window.location.reload();
    }

    /**
     * Changes status of the order to 'Delivered'.
     */
    const handleDelivered = async () => {
        const orderID = order.id;
        const token = window.localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8080/order/changeStatus/${orderID}/delivered`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("error. order status not updated from ready -> delivered.")
            }

        } catch (error) {
            console.error("Something went wrong. Could not change the status.");
        }
        // Reload to ensure data is up-to date.
        window.location.reload();
    }

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
                        <p className="text-center font-semibold">Loading...</p>
                    )}
                </div>

                {/* Button */}
                <div className="flex flex-col gap-3 w-6/10 h-30 bg-white rounded-xl border-r border-darkerGrey justify-center">

                    {/* Title */}
                    <div>
                        <h1 className="px-3 py-1 font-bold text-lg text-center"> Order Status </h1>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-row px-3 justify-between gap-1">

                        {/* Cancelled */}
                        <div className="py-3 px-1">
                            <a
                                onClick={handleTerminated}
                                className={`${order.completionStatus === "terminated" ? "bg-lightRed text-darkRed border border-darkRed" : "px-3 bg-white text-defaultText border border-defaultText opacity-70 border-opacity-40 hover:border-darkRed" } px-4 py-3 font-medium hover:bg-lightRed hover:text-darkRed rounded-lg text-xs cursor-pointer`}>
                                Terminate
                            </a>
                        </div>

                        {/* Confirmed */}
                        <div className="py-3 px-1">
                            <a
                                className={`${order.completionStatus === "confirmed" ? "bg-lightBlue text-darkBlue border border-darkBlue" : "px-3 bg-white text-defaultText border border-defaultText opacity-70 border-opacity-40" } px-3 py-3 font-medium rounded-lg text-xs`}>
                                Confirmed
                            </a>
                        </div>

                        {/* Ready */}
                        <div className="py-3 px-1">
                            <a
                                onClick={handleReady}
                                className={`${order.completionStatus === "ready" ? "bg-lightYellow text-darkYellow border border-darkYellow" : "bg-white text-defaultText border border-defaultText opacity-70 border-opacity-40 hover:border-darkYellow" } px-6 py-3 font-medium hover:bg-lightYellow hover:text-darkYellow rounded-lg text-xs cursor-pointer`}>
                                Ready
                            </a>
                        </div>

                        {/* Delivered */}
                        <div className="py-3 px-1">
                            <a
                                onClick={handleDelivered}
                                className={`${order.completionStatus === "delivered" ? "bg-lightGreen text-darkGreen border border-darkGreen" : "px-4 bg-white text-defaultText border border-defaultText opacity-70 border-opacity-40 hover:border-darkGreen" } px-4 py-3 font-medium hover:bg-lightGreen hover:text-darkGreen rounded-lg text-xs cursor-pointer`}>
                                Delivered
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmedOrderItem;