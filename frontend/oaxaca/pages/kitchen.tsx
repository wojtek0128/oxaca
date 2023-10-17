import InProgressOrders from "@/components/kitchen/inProgress/inProgressOrders";
import KitchenNavbar from "@/components/kitchen/kitchenNavbar";
import KitchenSidebar from "@/components/kitchen/kitchenSidebar";
import React from "react";

/**
 * Displays all elements for the mapping /kitchen.
 */
function Kitchen() {
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
                    
                    {/* Context bar + In Progress Orders */}
                    <InProgressOrders/>

                </main>

            </div>
        </section>
    )
}

export default Kitchen;