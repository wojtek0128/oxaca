import React, {useEffect, useState} from "react";
import CheckoutItem from "@/data/CheckoutItem";
import {useRouter} from "next/router";

type Props = {
    orderItems: CheckoutItem[];

    itemPrices: number;
};

/**
 * Displays a full checkout page with the customers complete cart
 * includes a form for customer to enter payment details and pay for their order
 * it uses a datastructure that kept the users order and displays it
 *
 * @param orderItems array of checkoutitems that store the users order
 * @param itemPrices variable to store the total price of users order
 * @constructor Stores payment details from the user
 */
function CheckoutForm({ orderItems, itemPrices }: Props) {

    // URL to add new order.
    const ADD_ORDER_URL = "http://localhost:8080/order/add";
    const ADD_ORDER_ITEM_URL = "http://localhost:8080/orderItem/add";
    const [ID, setID] = useState<string>("");
    const [paid, setPaid] = useState<boolean>(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvc, setCVC] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [postcode, setPostcode] = useState('');

    /**
     * New order state template.
     */
    const [order, setOrder] = useState({
        id: "",
        tableNo: "",
        timeOfOrder: "",
        completionStatus: "pending",
        price: (itemPrices / 100),
        waiter: "",
        isPaid: paid,
    });

    /**
     * New order item state template.
     */
    const [orderItem, setOrderItem] = useState({
        itemId: "",
        name: "",
        orderId: "",
        menuId: "",
        quantity: 0,
        notes: "",
    });

    const router = useRouter();

    /**
     * Completes sequence of events to submit a full order which has been paid online.
     */
    const handleSubmitPaid = async (event: any) => {
        setPaid(true);
        await saveOrder(event);
        await router.push('/order/OrderConfirmed');
        await addOrderItems(orderItems);
    };

    /**
     * Completes sequence of events to submit a full order which will be paid later.
     */
    const handleSubmit = async (event: any) => {
        await saveOrder(event);
        await router.push('/order/OrderConfirmed');
        await addOrderItems(orderItems);
    };


    /**
     * Adds individual order items to the order based on returned ID.
     * @param orderItems
     */
    const addOrderItems = async (orderItems: CheckoutItem[]) => {
        const promises = orderItems.map(async (item) => {
            const orderId = ID;
            const { id, name, quantity } = item;
            const token = window.localStorage.getItem('token');
            const response = await fetch(ADD_ORDER_ITEM_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ id, name, orderId, quantity }),
            });
            if (!response.ok) {
                throw new Error("Oh no! Something went wrong.");
            }
            const orderItem = await response.json();
            return orderItem;
        });
        const orderItemsArray = await Promise.all(promises);
        console.log(orderItemsArray);
    };

    /**
     * Updates order fields.
     * @param event
     */
    const handleChange = (event: any) => {
        const value = event.target.value;
        setOrder({...order, [event.target.name]: value});
    }

    /**
     * Sends order data to server.
     */
    const saveOrder = async (event: any) => {
        event.preventDefault();
        const token = window.localStorage.getItem('token');
        const response = await fetch(ADD_ORDER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(order),
        });
        if (!response.ok) {
            throw new Error("Oh no! Something went wrong.")
        }
        const _order = await response.json();
        setID(_order.id);
    };

        return (
            <section>
                <section>
                    <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
                        <div className="flex items-left gap-4 py-12 md:py-24">
                            <div className="max-w-lg space-y-8 px-4 lg:px-8">
                                <div>
                                    <p className="text-2xl font-medium tracking-tight font-bold tracking-wider text-black-600">
                                        Cart
                                    </p>

                                    <p className="mt-1 text-sm font-bold tracking-wider text-pink-600">Selected items</p>
                                </div>

                                    <div>
                                        <div>
                                            <p className="text-2xl mb-1 font-medium tracking-tight font-bold tracking-wider text-black-600">
                                                £{itemPrices / 100}
                                            </p>
                                        </div>
                                        <ul>
                                            <div>
                                                {orderItems.map((item, index) => (
                                                    <div key={index}>
                                                        <h3 className="text-sm text-[15px] text-gray-600font-bold tracking-wider">{item.name}</h3>
                                                    <dl className="mb-3 space-y-px text-[13px] text-gray-600 text-sm tracking-wider">
                                                            <dt className="inline">Quantity: {item.quantity}</dt>
                                                    </dl>
                                                        </div>
                                                    ))}
                                                </div>

                                        </ul>
                                        <h3 className="text-sm text-gray-90 text-[15px]"></h3>
                                    </div>
                            </div>
                        </div>


                        <form>
                            <div className="bg-white py-12 md:py-24">
                                <div className="mx-auto max-w-lg px-4 lg:px-8">
                                    <div className="col-span-3">
                                        <label
                                            key="FirstName"
                                            className="block text-xs font-medium text-gray-700"
                                        >
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            id="FirstName"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                            className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:border-gray-600 focus:outline-none"
                                        />
                                    </div>

                                    <div className="col-span-3">
                                        <label
                                            key="LastName"
                                            className="block text-xs font-medium text-gray-700"
                                        >
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            id="LastName"
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                            className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:border-gray-600 focus:outline-none"
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label key="Email" className="block text-xs font-medium text-gray-700">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            id="Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:border-gray-600 focus:outline-none"
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label key="Phone" className="block text-xs font-medium text-gray-700">
                                            Phone
                                        </label>

                                        <input
                                            type="tel"
                                            id="Phone"
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                            className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:border-gray-600 focus:outline-none"
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label key="tableNo" className="block text-xs font-medium text-gray-700">
                                            Table Number
                                        </label>

                                        <input
                                            type="text"
                                            name="tableNo"
                                            value={order.tableNo}
                                            onChange={(e) => handleChange(e)}
                                            className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:border-gray-600 focus:outline-none"
                                        />
                                    </div>

                                    <fieldset className="col-span-6">
                                        <legend className="block text-sm font-medium text-gray-700">
                                            Card Details
                                        </legend>

                                        <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                                            <div>
                                                <label key="CardNumber" className="sr-only"> Card Number </label>

                                                <input
                                                    type="text"
                                                    id="cardNumber"
                                                    onChange={(e) => setCardNumber(e.target.value)}
                                                    required
                                                    placeholder="Card Number"
                                                    className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:border-gray-600 focus:outline-none"
                                                />
                                            </div>

                                            <div className="flex -space-x-px">
                                                <div className="flex-1">
                                                    <label key="CardExpiry" className="sr-only"> Card Expiry </label>

                                                    <input
                                                        type="text"
                                                        id="CardExpiry"
                                                        onChange={(e) => setExpireDate(e.target.value)}
                                                        required
                                                        placeholder="Expiry Date"
                                                        className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:border-gray-600 focus:outline-none"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <label key="CardCVC" className="sr-only"> Card CVC </label>

                                                    <input
                                                        type="text"
                                                        id="cvc"
                                                        onChange={(e) => setCVC(e.target.value)}
                                                        required
                                                        placeholder="CVC"
                                                        className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:border-gray-600 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset className="col-span-6">
                                        <legend className="pt-2 block text-sm font-medium text-gray-700">
                                            Billing Address
                                        </legend>

                                        <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                                            <div>
                                                <label key="Country" className="sr-only">Country</label>

                                                <select
                                                    id="Country"
                                                    className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:border-gray-600 focus:outline-none"
                                                >
                                                    <option> England </option>
                                                    <option> Wales </option>
                                                    <option> Scotland </option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="sr-only" key="PostalCode"> ZIP/Post Code </label>

                                                <input
                                                    type="text"
                                                    id="PostalCode"
                                                    onChange={(e) => setPostcode(e.target.value)}
                                                    required
                                                    placeholder="ZIP/Post Code"
                                                    className="pb-3 w-full rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:border-gray-600 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div className="mt-1 col-span-6 pt-2">
                                        <button
                                            onClick={handleSubmitPaid}
                                            className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
                                        >
                                            Pay Now
                                        </button>
                                    </div>

                                    <p className="mt-4 text-base leading-7 text-gray-600"> Or you can pay at the restaurant. </p>
                                    <div className="col-span-6 pt-2">
                                        <button
                                            onClick={handleSubmit}
                                            className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg"
                                        >
                                            Pay Later
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </section>

            </section>
        )


    }


export default CheckoutForm;