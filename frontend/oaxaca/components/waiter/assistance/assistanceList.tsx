import React, {useEffect, useState} from "react";
import AssistanceItem from "@/components/waiter/assistance/assistanceItem";

/**
 * Displays all alerts of assistance which have been requested by a customer.
 *
 * @constructor Fetches all alerts from server.
 */
function AssistanceList() {

    // Alerts URL + alerts and loading states.
    const ORDER_URL_GETCONFIRMED = "http://localhost:8080/assistance/getAll"
    const [alerts, setAlerts] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    /**
     * Fetches all assistance requests from server.
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
                // Store all alerts locally.
                const alerts = await response.json();
                setAlerts(alerts);
            } catch (error) {
                console.log("Oh no! Could not load assistance requests.");
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
                <h1 className="font-bold p-4 text-md ml-2"> Assistance Requested </h1>
            </div>

            {/* In Progress Orders */}
            <div className="p-5 flex flex-col space-y-5 max-h-[30rem] sm:max-h-[30.5rem] xl:max-h-[29rem] 2xl:max-h-[38.5rem] overflow-y-scroll">

                {/* Order template */}
                {!loading ? (
                    alerts?.map((alert: any) => (
                        <AssistanceItem alert={alert} key={alert.id}/>
                    ))
                ) : (
                    // Display loading while waiting on data.
                    <p className="text-center font-semibold"> Loading... </p>
                )}
            </div>

        </section>
    )
}

export default AssistanceList;