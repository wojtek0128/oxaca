import React, { useEffect, useState } from "react";
import Container from "@/components/homepage/container";
import OrderMenuItem from "@/components/order/orderMenuItem";
import CheckoutItem from "../../data/CheckoutItem";

type Props = {
    itemPrices: number;
    setItemPrices: React.Dispatch<React.SetStateAction<number>>;
    orderItems: CheckoutItem[];
    setOrderItems: React.Dispatch<React.SetStateAction<CheckoutItem[]>>;
}

/**
 * Displays full menu loaded from server and allows choice of items,
 * allows filtering based on menu item course and stores the output
 * in a datastructure to be used in the cart.
 *
 * @param itemPrices Total float price of all items in the cart.
 * @param setItemPrices Setter for itemPrices.
 * @param orderItems orderItems array
 * @param setOrderItems Setter for orderItems
 * @constructor Loads menu items from backend based on filter choice.
 */
function OrderItems( { itemPrices, setItemPrices, orderItems, setOrderItems }: Props) {

    // All order items + the current choice of course (filter).
    const [menuCourse, setMenuCourse] = useState("Starter");

    // Fetching from server + fetch load status.
    const [items, setItems] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    /**
     * Loads menu items from server based on the current filter choice.
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {

                // Change fetch url based on filter choice.
                let url;
                if (menuCourse === "All") {
                    url = `http://localhost:8080/menu/getAll`;
                } else {
                    url = `http://localhost:8080/menu/search/${menuCourse}`;
                }
                const token = window.localStorage.getItem('token');
                // Fetch from backend server
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                // Store response values locally.
                const items = await response.json();
                setItems(items);
            } catch (error) {
                console.log(`Unable to load menu items from ${menuCourse}`);
            }
            setLoading(false);
        };
        fetchData();

    //     Update everytime filter option changes.
    }, [menuCourse]);

    /**
     * Updates the menu course based on user selection.
     *
     * @param course Starter, Main or Dessert.
     */
    const handleCourses = (course: string) => {
        setMenuCourse(course)
    }

    return (
        <Container className="flex w-full flex-col mt-4 items-center justify-center text-center">

            {/* Pre-text */}
                <div className="text-sm font-bold tracking-wider text-pink-600">
                    ORDER NOW
                </div>

                <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl">
                    Buy whatever you want! It&#39;s on you.
                </h2>

                <p className={`max-w-2xl py-4 text-lg leading-normal text-gray-800 lg:text-xl xl:text-xl`}>
                    Choose from a range of our delicious dishes, we have a spanning variety of dishes
                    from starters to mains and desserts, but that&#39;s for the end.
                </p>

            <section className="my-12 max-w-screen-xl mx-auto px-6">

                {/* Filter Courses */}
                <div className="flex items-center justify-center space-x-6 cursor-pointer -ml-2">
                    <p onClick={() => handleCourses("Starter")} className={menuCourse === "Starter" ? "p-1.5 px-3 rounded-full bg-pink-500 text-white font-semibold" : ""}> Starters </p>
                    <p onClick={() => handleCourses("Main")} className={menuCourse === "Main" ? "p-1.5 px-3 rounded-full bg-pink-500 text-white font-semibold" : ""}> Mains </p>
                    <p onClick={() => handleCourses("Dessert")} className={menuCourse === "Dessert" ? "p-1.5 px-3 rounded-full bg-pink-500 text-white font-semibold" : ""}> Desserts </p>
                    <p> • </p>
                    <p onClick={() => handleCourses("All")} className={menuCourse === "All" ? "p-1.5 px-3 rounded-full bg-pink-500 text-white font-semibold" : ""}> All </p>
                </div>

                {/* Display Menu Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-14">
                    {!loading ? (
                        items?.map((item: any) => (
                            <OrderMenuItem item={item} key={item.menuid} orderItems={orderItems} setOrderItems={setOrderItems}
                                           itemPrices={itemPrices} setItemPrices={setItemPrices}/>
                    ))
                ) : (
                    // Display loading while waiting for data.
                    <p className="text-center font-semibold mt-96"> Loading... </p>
                )}
                </div>
            </section>
        </Container>
    )
}

export default OrderItems;