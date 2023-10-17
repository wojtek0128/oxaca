import React from "react";
import KitchenSidebar from "@/components/kitchen/kitchenSidebar";
import KitchenNavbar from "@/components/kitchen/kitchenNavbar";
import CancelledOrders from "@/components/kitchen/cancelled/cancelledOrders";

/**
 * Displays all elements for the mapping /kitchen/cancelled.
 */
function Cancelled() {
    return (
        <section>
            <div className="flex w-full min-h-full">

                {/* Sidebar */}
                <KitchenSidebar/>

                <main className="flex flex-col flex-1 gap-6 py-5 2xl:py-5">

                    {/* Navigation bar */}
                    <header>
                        <KitchenNavbar/>
                    </header>

                    <hr className="w-full border-greyBorder"/>

                    {/* Context bar + Cancelled Orders */}
                    <CancelledOrders/>

                </main>

            </div>
        </section>
    )
}

export default Cancelled;