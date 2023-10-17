import React, {useEffect} from "react";
import { useState } from "react";

/**
 * Displays a full complete menu and displays them based on their course.
 *
 * @constructor Creates states to hold each different course
 */

function App() {
    const [starters, setStarters] = useState<any[]>([]);
    const [mainCourses, setMainCourses] = useState<any[]>([]);
    const [Dessert, setDessert] = useState<any[]>([]);


    // API fetch from Spring Boot server
    const ITEM_API_BASE_URL = "http://localhost:8080/menu/getAll";
    const [items, setItems] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    /**
     * fetches menu from backend and sorts it into arrays based on course
     */

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = window.localStorage.getItem('token');
                const response = await fetch(ITEM_API_BASE_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const items = await response.json();
                console.log('Fetched items:', items);
                setItems(items);
                setStarters(items.filter((item: any) => item.course === "Starter"));
                setMainCourses(items.filter((item: any) => item.course === "Main"));
                setDessert(items.filter((item: any) => item.course === "Dessert"));
                console.log('Items state:', items);
            } catch (error) {
                console.log(error);
            }

            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen">

            <div className="px-10 gap-8 mb-16 mt-15">
                <h2 className="pb-5 text-2xl text-center font-bold mt-4 mt-8 text-pink-600">Starters</h2>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                {starters?.map((item: any) => (
                    <div
                        className=" p-4 shadow-lg hover:shadow transition-all duration-300 cursor-pointer"
                        key={item.menuid}
                    >
                        <div className="flex justify-between mb-4">
                            <div className="md:text-xl text-[1rem] font-semibold">
                                {item.pname}
                            </div>
                            <p>{item.course}</p>

                        </div>


                        <p className="text-[0.85rem] opacity-90 mb-4">
                            {item.description}
                            <br/>
                        </p>
                        <p className="text-[0.85rem] opacity-60 mb-4">
                            {item.ingredients}
                        </p>

                        <div className="flex items-center justify-between">
                            <span className="text-xl font-semibold">£{item.price}</span>
                            <span className="text-xl font-semibold">{item.calories}kcal</span>
                        </div>
                    </div>
                ))}
            </div>
                <div className="mb-16 mt-15">
                    <h2 className="pb-5 text-2xl text-center font-bold mt-4 mt-8 text-pink-600">Mains</h2>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                        {mainCourses.map((item: any) => (
                            <div
                                className=" p-4 shadow-lg hover:shadow transition-all duration-300 cursor-pointer"
                                key={item.menuid}
                            >
                                <div className="flex justify-between mb-4">
                                    <div className="md:text-xl text-[1rem] font-semibold">
                                        {item.pname}
                                    </div>
                                    <p>{item.course}</p>

                                </div>


                                <p className="text-[0.85rem] opacity-90 mb-4">
                                    {item.description}
                                    <br/>
                                </p>
                                <p className="text-[0.85rem] opacity-60 mb-4">
                                    {item.ingredients}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-semibold">£{item.price}</span>
                                    <span className="text-xl font-semibold">{item.calories}kcal</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-16 mt-15">
                    <h2 className="pb-5 text-2xl text-center font-bold mt-4 mt-8 text-pink-600">Desserts</h2>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                        {Dessert.map((item: any) => (
                            <div
                                className=" p-4 shadow-lg hover:shadow transition-all duration-300 cursor-pointer"
                                key={item.menuid}
                            >
                                <div className="flex justify-between mb-4">
                                    <div className="md:text-xl text-[1rem] font-semibold">
                                        {item.pname}
                                    </div>
                                    <p>{item.course}</p>

                                </div>


                                <p className="text-[0.85rem] opacity-90 mb-4">
                                    {item.description}
                                    <br/>
                                </p>
                                <p className="text-[0.85rem] opacity-60 mb-4">
                                    {item.ingredients}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-semibold">£{item.price}</span>
                                    <span className="text-xl font-semibold">{item.calories}kcal</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default App;

