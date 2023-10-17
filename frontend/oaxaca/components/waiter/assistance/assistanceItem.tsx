import React from "react";
import { CustomerAlert } from "@/data/customerAlert";

/**
 * Displays an alert item containing the table number, time since help was request and an
 * option to mark the request as resolved.
 *
 * @param alert Individual alert fetched from server.
 */
function AssistanceItem({ alert }: { alert: CustomerAlert }) {

    // Calculate minutes ago since alert.
    const now = new Date().getTime();
    const orderTime = new Date(alert.timeOfRequest).getTime();
    const timeDifference = Math.floor((now - orderTime) / (1000 * 60));

    /**
     * Marks the request as resolved by removing it from the alert database.
     */
    const handleResolved = async () => {
        const alertID = alert.id;
        const token = window.localStorage.getItem('token');
        try {
            // Requests to remove alert based on the alerts ID.
            const response = await fetch(`http://localhost:8080/assistance/delete/${alertID}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Unable to mark the request as resolved. Please try again.")
            }

        } catch (error) {
            console.error(error);
        }
        // Refreshes all displayed alerts.
        location.reload();
    }

    return (
        <div className="p-3 bg-basicGrey w-full h-[6.3rem] rounded-2xl items-center">

            {/* Order + Order Contents + Button columns */}
            <div className="flex flex-row justify-between">

                {/* Order */}
                <div className="flex flex-row h-full space-x-10 justify-between">

                    {/* Order Time */}
                    <div className="flex items-center justify-start min-w-[50%] space-x-2 px-3 py-5 bg-white rounded-xl">
                        <span className="font-bold text-3xl align-middle ml-2"> {timeDifference} </span>
                        <span className="font-semibold align-bottom"> min(s) ago </span>
                    </div>

                    {/* Table Number */}
                    <div className="flex items-center justify-start min-w-[55%] space-x-0.5 px-3 py-5 bg-white rounded-xl">
                        <span className="font-semibold text-2xl align-middle ml-2 text-gray-800"> TABLE: # </span>
                        <span className="font-bold align-middle text-3xl"> { alert.tableNo } </span>
                    </div>
                </div>

                {/* Button */}
                <div className="flex flex-col gap-7 w-56 h-30 bg-white rounded-xl border-r border-darkerGrey justify-center">

                    {/* Buttons */}
                    <div className="flex flex-row px-2 justify-center">

                        {/* Complete */}
                        <div className="p-3">
                            <a
                                onClick={handleResolved}
                                className="px-[4rem] py-3.5 font-medium bg-lightRed hover:bg-darkRed hover:text-white text-darkRed rounded-lg text-md cursor-pointer">
                                Resolved
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssistanceItem;