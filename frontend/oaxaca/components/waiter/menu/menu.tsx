import React, {useEffect, useState} from "react";
import MenuList from "../menu/menuList";
import AddItem from "./addItem";
import EditItem from "@/components/waiter/menu/editItem";

/**
 * Displays all menu items from the server and contains options to edit or delete each individual item.
 *
 * @constructor Pulls all menu items from the server.
 */
function Menu() {

    // URLs to fetch all items + delete item mapping.
    const ITEM_API_BASE_URL = "http://localhost:8080/menu/getAll";
    const ITEM_DELETE_URL = "http://localhost:8080/menu/deleteItem/";

    // Item, Loading and ItemID states.
    const [items, setItems] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [itemID, setItemID] = useState<any>(null);

    /**
     * Fetches all menu items from the server.
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = window.localStorage.getItem('token');
            try {
                const response = await fetch(ITEM_API_BASE_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                // Store menu items locally.
                const items = await response.json();
                setItems(items);
            } catch (error) {
                console.log("Unable to load menu items.");
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    /**
     * Deletes a selected menu item from the database.
     * @param event Event triggering the change to delete the selected menu item.
     * @param menuid ID of the menu item to be deleted.
     */
    const deleteItem = (event: any, menuid: string) => {
        event.preventDefault();
        const token = window.localStorage.getItem('token');

        try {
            fetch(ITEM_DELETE_URL + menuid, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            }).then(() => {
                // Updates current locally stored list to no longer contain the item, prevents reload.
                if (items) {
                    setItems((prevElement: any) => {
                        return prevElement.filter((item: any) => item.menuid !== menuid);
                    });
                }
            });
        } catch (error) {
            console.error(`Unable to delete item ${menuid}`);
        }
    };

    // Adds functionality to edit button for each menu item.
    const editItem = (e: any, menuid: string) => {
        e.preventDefault();
        setItemID(menuid);
    }

    return (
        <>
            <section>
                {/* Context bar */}
                <div className="h-14 -mt-6 border-b">

                    {/* Add item button */}
                    <AddItem/>
                </div>

                {/* Menu table */}
                <div className="p-3 max-h-[30rem] sm:max-h-[28rem] xl:max-h-[29rem] 2xl:p-5 2xl:max-h-[37rem] overflow-y-scroll">
                    <div className="overflow-x-autorounded-lg border border-borderGrey">
                        <table className="min-w-full divide-y-2 divide-borderGrey text-sm">
                            <thead className="bg-basicGrey">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-defaultText">
                                    Title
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-defaultText">
                                    Description
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-defaultText">
                                    Course
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-defaultText">
                                    Price
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-defaultText">
                                    Calories
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-defaultText">
                                    Status
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-defaultText">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            {!loading && (
                                <tbody className="divide-y divide-borderGrey">
                                {items?.map((item: any) => (
                                    <MenuList item={item} key={item.menuid} deleteItem={(e: any) => deleteItem(e, item.menuid)}
                                              editUser={(e: any) => editItem(e, item.menuid)}/>
                                ))
                                }
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </section>
        <EditItem itemID={itemID}/>
        </>
    )
}

export default Menu;