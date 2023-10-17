import React from "react";
import { Item } from "@/data/item";

/**
 * Provides template for each individual menu item in the list displaying attributes + edit and delete buttons.
 *
 * @param item Individual menu item.
 * @param deleteItem Function which triggers deleting item sequence of events.
 * @param editUser Function which triggers editing a menu item.
 */
const MenuList = ({ item, deleteItem, editUser }: { item: Item, deleteItem: (e: any, menuid: string) => void, editUser: (e: any, menuid: string) => void }) => {
    return (
        <tr key={item.menuid}>
            <td className="px-4 py-2 text-defaultText font-semibold truncate"> {item.pname} </td>
            <td className="px-4 py-2 text-defaultText text-ellipsis"> {item.description} </td>
            <td className="px-4 py-2 text-defaultText truncate"> {item.course} </td>
            <td className="px-4 py-2 text-defaultText truncate"> {item.price} </td>
            <td className="px-4 py-2 text-defaultText truncate"> {item.calories} </td>
            <td className="text-left">
                <span className={`${item.availability ? "bg-lightGreen text-darkGreen" : "bg-lightRed text-darkRed" } whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm`}>
                    {item.availability ? "In Stock" : "Out of Stock" }
                </span>
            </td>

            {/* Buttons */}
            <td className="flex flex-row space-x-2 inline-block align-middle px-7 py-5">

                {/* Edit Button */}
                <div>
                    <a onClick={(e: any) => editUser(e, item.menuid)}
                       className="fill-defaultText cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 opacity-75 hover:fill-darkYellow"
                            viewBox="0 0 48 48"
                        >
                            <path d="M8.65 39.4h2.65l22-22.05-2.65-2.65-22 22.05Zm31.9-24.2L32.8 7.4l2.05-2.05q1.05-1.05 2.6-1.025Q39 4.35 40.05 5.4l2.6 2.65q1.05 1.05 1.025 2.55-.025 1.5-1.075 2.55ZM6.8 43.05q-.8 0-1.3-.525T5 41.25V36q0-.35.125-.675.125-.325.375-.575L30.75 9.5l7.75 7.75L13.3 42.5q-.3.3-.6.425t-.65.125Zm25.2-27-1.35-1.35 2.65 2.65Z"/>
                        </svg>
                    </a>
                </div>

                {/* Delete Button */}
                <div>
                    <a onClick={(e: any) => deleteItem(e, item.menuid)}
                       className="fill-defaultText cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 opacity-75 hover:fill-darkRed"
                            viewBox="0 96 960 960"
                        >
                            <path d="M259 952q-28.725 0-50.863-22.138Q186 907.725 186 879V304h-11q-14.75 0-25.375-10.86Q139 282.281 139 267.14q0-15.14 10.613-25.64Q160.225 231 175 231h172q0-15 10.625-24.5T383 197h195q14.75 0 25.375 9.425T614 231h172q15.2 0 26.1 10.675 10.9 10.676 10.9 25.816 0 15.141-10.9 25.825T786 304h-11v575q0 28.725-22.138 50.862Q730.725 952 702 952H259Zm0-648v575h443V304H259Zm98 452q0 14.775 10.658 25.388Q378.316 792 393.158 792T419 781.388q11-10.613 11-25.388V426q0-15.2-10.95-26.1-10.951-10.9-26.225-10.9-14.85 0-25.338 10.9Q357 410.8 357 426v330Zm175 0q0 14.775 10.658 25.388Q553.316 792 568.158 792T594 781.388q11-10.613 11-25.388V426q0-15.2-10.95-26.1-10.951-10.9-26.225-10.9-14.85 0-25.338 10.9Q532 410.8 532 426v330ZM259 304v575-575Z"/>
                        </svg>
                    </a>
                </div>

            </td>
        </tr>
    )
};

export default MenuList;