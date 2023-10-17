import ConfirmedOrders from "@/components/waiter/confirmed/confirmedOrders";
import Dashboard from "@/components/waiter/dashboard";
import Navbar from "@/components/waiter/navbar";
import Sidebar from "@/components/waiter/sidebar";
import React from "react";

/**
 * Displays all elements for the mapping /waiter/confirmed.
 */
function Confirmed() {
    return (
        <section>
            <div className="flex w-full min-h-full">

                {/* Sidebar Menu */}
                <Sidebar/>

                <main className="flex flex-col flex-1 gap-6 py-5 2xl:py-5">

                    {/* Navigation bar */}
                    <header>
                        <Navbar/>
                    </header>

                    <hr className="w-full border-greyBorder"/>

                    {/* Dashboard section*/}
                    <Dashboard/>

                    <hr className="w-full border-greyBorder -mt-6"/>

                    {/* Context bar + Confirmed orders */}
                    <ConfirmedOrders/>
                    
                </main>
            </div>
        </section>
    )
}

export default Confirmed;