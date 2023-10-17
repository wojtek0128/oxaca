import React, {Fragment, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import AllergensListbox from "@/components/waiter/menu/allergensListbox";

/**
 * Contains modal to edit a menu item's fields by the user.
 *
 * @param itemID ID of the menu item being edited.
 * @constructor
 */
function EditItem({ itemID }: any ) {

    // Modal opened / closed state.
    const [open, setOpen] = useState(false);

    /**
     * Sets the modals state to open.
     */
    function openEditMenuModal() {
        setOpen(true);
    }

    /**
     * Sets the modals state to closed.
     */
    function closeEditMenuModal() {
        setOpen(false);
    }

    // URLs to fetch items fields + update the items fields.
    const ITEM_GET_ID_URL = "http://localhost:8080/menu/getByID"
    const ITEM_UPDATE_URL = "http://localhost:8080/menu/update"

    // Default availability value set to false.
    const [stock, setStock] = useState("false");

    // Default state template for a menu item.
    const [item, setItem] = useState({
        allergens: false,
        availability: false,
        calories: "",
        course: "",
        description: "",
        ingredients: "",
        menuid: "",
        pname: "",
        price: "",
    });

    /**
     * Fetches the menu items fields from the server.
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = window.localStorage.getItem('token');
                const response = await fetch(ITEM_GET_ID_URL + "/" + itemID, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                })
                // Set the fetched item to current item.
                const _item = await response.json();
                setItem(_item);
                setStock(_item.availability.toString());
                openEditMenuModal();

            } catch (error) {
                console.log("Could not fetch menu item fields.");
            }
        };

        // Only fetch data if itemID provided.
        if (itemID) {
            fetchData();
        }

    }, [itemID]);

    /**
     * Sets updates values for an item based on the users input.
     * @param event New value provided by the user.
     */
    const handleChange = (event: any) => {
        const value = event.target.value;
        setItem({...item, [event.target.name]: value});
    }

    /**
     * Updates the availability of an item based on radio button input.
     * @param event Radio button update to trigger value change.
     */
    function handleRadioChange(event: any) {
        console.log(event.target.value);
        const stockValue = event.target.value === "true";
        setStock(event.target.value);
        setItem({...item, availability: stockValue});
    }

    /**
     * Sequence of events to reset fields back to default.
     * @param event Event to trigger reset sequence.
     */
    const reset = (event: any) => {
        event.preventDefault();
        closeEditMenuModal();
        location.reload();
    };

    /**
     * Updates values of the menu item based on users input.
     * @param e Updated item
     */
    const updateItem = async (e: any) => {
        e.preventDefault();
        const token = window.localStorage.getItem('token');
        // Send updated values.
        const response = await fetch(ITEM_UPDATE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(item),
        });
        if (!response.ok) {
            throw new Error("Oh no! Could not update item.")
        }
        reset(e);
    };

    return (
        <Transition.Root appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >

                            {/* Modal */}
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <div className="flex flex-col space-y-5 mt-2">

                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="menuTitle"
                                                           className="block text-md font-medium text-defaultText w-52">
                                                        Allergens
                                                    </label>
                                                    <AllergensListbox/>
                                                </div>

                                                {/* Main body */}
                                                <div className="flex w-full gap-5">

                                                    {/* Title */}
                                                    <div>
                                                        <label htmlFor="pname"
                                                               className="block text-md font-medium text-defaultText w-52">
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="pname"
                                                            value={item.pname}
                                                            onChange={(e) => handleChange(e)}
                                                            className="mt-1 p-2 w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                                                        />
                                                    </div>

                                                    {/* Price */}
                                                    <div>
                                                        <label htmlFor="price"
                                                               className="block text-md font-medium text-defaultText w-52">
                                                            Price
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="price"
                                                            value={item.price}
                                                            onChange={(e) => handleChange(e)}
                                                            className="mt-1 p-2 w-full rounded-md border border-gray-300 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex w-full gap-5">

                                                    {/* Course */}
                                                    <div>
                                                        <label htmlFor="course"
                                                               className="block text-md font-medium text-defaultText w-52">
                                                            Course
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="course"
                                                            value={item.course}
                                                            onChange={(e) => handleChange(e)}
                                                            className="mt-1 p-2 w-full rounded-md border border-gray-300 sm:text-sm"
                                                        />
                                                    </div>

                                                    {/* Calories */}
                                                    <div>
                                                        <label htmlFor="calories"
                                                               className="block text-md font-medium text-defaultText w-52">
                                                            Calories
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="calories"
                                                            value={item.calories}
                                                            onChange={(e) => handleChange(e)}
                                                            className="mt-1 p-2 w-full rounded-md border border-gray-300 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex w-full">

                                                    {/* Ingredients */}
                                                    <div>
                                                        <label htmlFor="ingredients"
                                                               className="block text-md font-medium text-defaultText w-[27.5rem]">
                                                            Ingredients
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="ingredients"
                                                            value={item.ingredients}
                                                            onChange={(e) => handleChange(e)}
                                                            className="mt-1 p-2 w-full rounded-md border border-gray-300 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex w-full">

                                                    {/* Description */}
                                                    <div>
                                                        <label htmlFor="description"
                                                               className="block text-md font-medium text-defaultText w-[27.5rem]">
                                                            Description
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="description"
                                                            value={item.description}
                                                            onChange={(e) => handleChange(e)}
                                                            className="mt-1 p-2 w-full rounded-md border border-gray-300 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex w-full gap-5">

                                                    {/* Availability */}
                                                    <div className="ml-24">
                                                        <fieldset className="flex flex-wrap gap-3">
                                                            <legend className="sr-only">Status</legend>

                                                            {/* In Stock */}
                                                            <div>
                                                                <input
                                                                    type="radio"
                                                                    name="availability"
                                                                    value="true"
                                                                    id="InStock"
                                                                    checked={stock === "true"}
                                                                    onChange={handleRadioChange}
                                                                    className="peer hidden [&:checked_+_label_svg]:block"
                                                                />
                                                                <label
                                                                    htmlFor="InStock"
                                                                    className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-100 py-2 px-3 text-defaultText hover:border-gray-200 peer-checked:border-darkGreen peer-checked:bg-lightGreen peer-checked:text-darkGreen"
                                                                >
                                                                    <svg
                                                                        className="hidden h-5 w-5"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                    <p className="text-sm font-medium"> In Stock </p>
                                                                </label>
                                                            </div>

                                                            {/* Out of Stock */}
                                                            <div>
                                                                <input
                                                                    type="radio"
                                                                    name="availability"
                                                                    value="false"
                                                                    id="OutOfStock"
                                                                    checked={stock === "false"}
                                                                    onChange={handleRadioChange}
                                                                    className="peer hidden [&:checked_+_label_svg]:block"
                                                                />

                                                                <label
                                                                    htmlFor="OutOfStock"
                                                                    className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-100 py-2 px-3 text-defaultText hover:border-gray-200 peer-checked:border-darkRed peer-checked:bg-lightRed peer-checked:text-darkRed"
                                                                >
                                                                    <svg
                                                                        className="hidden h-5 w-5"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                    <p className="text-sm font-medium"> Out of Stock </p>
                                                                </label>
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

                                    {/* Add item button */}
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-darkYellow bg-lightYellow px-4 py-2 text-base font-medium text-darkYellow shadow-sm hover:bg-darkYellow hover:text-white focus:outline-none focus:ring-2 focus:ring-darkGreen focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={updateItem}
                                    >
                                        Update
                                    </button>

                                    {/* Back button */}
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={reset}
                                    >
                                        Back
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default EditItem;