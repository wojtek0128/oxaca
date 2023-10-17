import React, {useEffect, useState} from "react";
import Head from "next/head";
import Navbar from "@/components/homepage/navbar";
import OrderCta from "@/components/order/OrderCta";
import Footer from "@/components/homepage/footer";
import OrderItems from "@/components/order/orderItems";
import CheckoutForm from "@/components/checkout/checkoutForm";
import {useSuccess} from "@/components/order/OrderCta";
import CheckoutItem from "@/data/CheckoutItem";


/**
 * Displays all elements for the mapping /order.
 */
function Order() {

    // Ancestor state to parse total cart price to elements.
    const [itemPrices, setItemPrices] = useState<number>(0);
    const [orderItems, setOrderItems] = useState<CheckoutItem[]>([]);

    const {success, setSuccess} = useSuccess();
    console.log(success);

    const HandleClick = async () => {
        setSuccess(true);
        return (success);
    }

    const HandleClickFalse = async () => {
        setSuccess(false);
        return (success);
    }

    return (
        <>
            <Head>
                <title> Oaxaca </title>
                <meta
                    name="description"
                    content="Oxaca Mexican Restaurant"
                />
            </Head>

            {/* Navigation Bar */}
            <Navbar />

            <>
            {success ? (
                <>
                    <CheckoutForm orderItems={orderItems} itemPrices={itemPrices}/>
                    <div className="fixed p-5 bottom-0 right-10">
                        <a className="relative inline-block px-8 py-4 font-medium group" onClick={HandleClickFalse}>
                            <span
                                className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-pink-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                            <span
                                className="absolute inset-0 w-full h-full bg-pink-100 border-2 border-pink-500 group-hover:border-teal-900 group-hover:bg-teal-100"></span>
                            <span className="relative text-pink-500 font-bold group-hover:text-teal-900"> Return to Ordering </span>
                        </a>
                    </div>
                </>
                ) : (
                <>
                    <OrderItems itemPrices={itemPrices} setItemPrices={setItemPrices} orderItems={orderItems} setOrderItems={setOrderItems}/>
                    <div className="fixed p-5 bottom-0 right-10">
                        <a className="relative inline-block px-8 py-4 font-medium group" onClick={HandleClick}>
                            <span
                                className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-pink-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                            <span
                                className="absolute inset-0 w-full h-full bg-pink-100 border-2 border-pink-500 group-hover:border-teal-900 group-hover:bg-teal-100"></span>
                            <span className="relative text-pink-500 font-bold group-hover:text-teal-900"> Checkout </span>
                        </a>
                    </div>
                    <OrderCta itemPrices={itemPrices}/>


                </>

                )}
            </>





            {/* Footer section + Links */}
            <Footer/>
        </>
    );
}

export default Order;