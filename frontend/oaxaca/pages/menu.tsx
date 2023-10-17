import React from "react";
import Home from "@/components/customer/Home";
import NavigationBar from "@/components/homepage/navbar";
import Footer from "@/components/homepage/footer";
import Dishes from "@/components/customer/Dishes";
import Head from "next/head";

/**
 * Displays the elements for the menu page.
 *
 */

export default function Menu() {
    return (
        <div className="font-poppins">
            <Head>
                <title> Oaxaca </title>
                <meta
                    name="description"
                    content="Oxaca Mexican Restaurant"
                />
            </Head>
            <NavigationBar />
            <Home />
            <Dishes  />
            <Footer />
        </div>
    );
};


