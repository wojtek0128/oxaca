import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Sidebar() {

    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState<string | null>(null);

    /**
     * Fetches user token.
     */
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setSuccess(true)
            console.log(true)
            setUser(localStorage.getItem('user'));
        } else {
            setSuccess(false)
        }
    })

    /**
     * Logs the user out of their account.
     */
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('Role');
        router.push('/');
    };

    return (
        <section className="flex flex-col justify-between h-screen w-48 bg-basicGrey border-r xl:w-72">
            <div className="px-4 py-6">

                {/* Main Sidebar Nav*/}

                <nav aria-label="Main Nav" className="flex flex-col mt-12 space-y-4">

                    {/* Dashboard */}

                    <div className="text-md ml-1.5 font-bold text-defaultText">
                        Dashboard
                    </div>

                    {/* Menu*/}
                    <Link href="/waiter" legacyBehavior>
                        <a
                            href="#"
                            className="flex items-center px-4 py-2 text-defaultText hover:bg-darkerGrey rounded-lg"
                        >
                            {/* Menu Icon */}

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 opacity-75"
                                viewBox="0 0 48 48"
                            >
                                <path d="M8.85 42.8q-1.45 0-2.55-1.1-1.1-1.1-1.1-2.55V8.85q0-1.45 1.1-2.55 1.1-1.1 2.55-1.1h30.3q1.45 0 2.55 1.1 1.1 1.1 1.1 2.55v30.3q0 1.45-1.1 2.55-1.1 1.1-2.55 1.1Zm0-3.65h30.3V8.85H8.85v30.3ZM15 34.2q.75 0 1.3-.525t.55-1.275q0-.75-.55-1.3t-1.3-.55q-.75 0-1.275.55-.525.55-.525 1.3t.525 1.275q.525.525 1.275.525Zm0-8.4q.75 0 1.3-.525T16.85 24q0-.75-.55-1.3t-1.3-.55q-.75 0-1.275.55-.525.55-.525 1.3t.525 1.275q.525.525 1.275.525Zm0-8.45q.75 0 1.3-.525t.55-1.275q0-.75-.55-1.3T15 13.7q-.75 0-1.275.55-.525.55-.525 1.3t.525 1.275q.525.525 1.275.525Zm8.3 16.9h9.05q.75 0 1.275-.55.525-.55.525-1.3t-.525-1.275Q33.1 30.6 32.35 30.6H23.3q-.8 0-1.325.525-.525.525-.525 1.275 0 .8.525 1.325.525.525 1.325.525Zm0-8.45h9.05q.75 0 1.275-.55.525-.55.525-1.3t-.525-1.275q-.525-.525-1.275-.525H23.3q-.8 0-1.325.525-.525.525-.525 1.275 0 .8.525 1.325.525.525 1.325.525Zm0-8.4h9.05q.75 0 1.275-.55.525-.55.525-1.3t-.525-1.275q-.525-.525-1.275-.525H23.3q-.8 0-1.325.525-.525.525-.525 1.275 0 .8.525 1.325.525.525 1.325.525ZM8.85 39.15V8.85v30.3Z"/>
                            </svg>

                            <span className="ml-3 text-sm font-medium"> Menu </span>
                        </a>
                    </Link>

                    {/* Orders */}

                    <div className="text-md ml-1.5 font-bold text-defaultText">
                        Orders
                    </div>

                    {/* Pending */}

                    <Link href="/waiter/pending" legacyBehavior>
                        <a
                            href="#"
                            className="flex items-center px-4 py-2 text-defaultText rounded-lg hover:bg-darkerGrey hover:text-gray-700"
                        >

                            {/* Pending Icon */}

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 opacity-75"
                                viewBox="0 0 48 48"
                            >
                                <path d="M35.15 33.95q0-.5-.35-.875t-.9-.375q-.55 0-.9.375t-.35.875v6.5q0 .55.35.9t.9.35q.55 0 .9-.35t.35-.9Zm3 0v6.5q0 .55.35.9t.9.35q.55 0 .9-.35t.35-.9v-6.5q0-.5-.35-.875t-.9-.375q-.55 0-.9.375t-.35.875ZM13.7 17.15h20.65q.75 0 1.275-.55.525-.55.525-1.3t-.525-1.275Q35.1 13.5 34.35 13.5H13.7q-.8 0-1.325.525-.525.525-.525 1.275 0 .8.525 1.325.525.525 1.325.525ZM36.65 47.3q-4.2 0-7.15-2.95t-2.95-7.1q0-4.15 2.95-7.15t7.15-3q4.15 0 7.125 3 2.975 3 2.975 7.15t-2.975 7.1Q40.8 47.3 36.65 47.3ZM5.2 44.25V8.9q0-1.5 1.05-2.575Q7.3 5.25 8.85 5.25h30.3q1.55 0 2.6 1.075T42.8 8.9v16.75q-.85-.45-1.75-.75t-1.9-.5V8.9H8.85v30.2h14.9q.1.75.25 1.5t.4 1.5l-1.2 1.1q-.1.15-.25.2-.15.05-.25-.05l-1.1-1.1q-.3-.3-.7-.3-.4 0-.65.3l-1.8 1.8q-.3.3-.7.3-.4 0-.65-.3l-1.75-1.8q-.3-.3-.7-.3-.4 0-.65.3l-1.8 1.8q-.3.3-.7.3-.4 0-.65-.3l-1.75-1.8q-.3-.3-.7-.3-.4 0-.65.25L5.9 44.05q-.1.1-.7.2Zm8.5-9.65h10.2q.2-1 .525-1.9.325-.9.825-1.75H13.7q-.8 0-1.325.525-.525.525-.525 1.275 0 .8.525 1.325.525.525 1.325.525Zm0-8.75h16.8q1.3-.8 2.725-1.225 1.425-.425 2.925-.475-.25-.8-.7-1.375-.45-.575-1.1-.575H13.7q-.8 0-1.325.55-.525.55-.525 1.3t.525 1.275q.525.525 1.325.525ZM8.85 39.1V8.9v30.2Z"/>
                            </svg>

                            <span className="ml-3 text-sm font-medium"> Pending </span>
                        </a>
                    </Link>

                    {/* Confirmed Orders */}

                    <Link href="/waiter/confirmed" legacyBehavior>
                        <a
                            href="#"
                            className="flex items-center px-4 py-2 text-defaultText rounded-lg hover:bg-darkerGrey hover:text-gray-700"
                        >

                            {/* Confirmed Icon */}

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 opacity-75"
                                viewBox="0 0 48 48"
                            >
                                <path d="m35.2 37.1-.65-.7q-.55-.5-1.275-.5-.725 0-1.225.55-.55.55-.55 1.225t.55 1.225l2.2 2.2q.35.4.925.4.575 0 1.025-.4l5.1-5q.5-.55.5-1.25t-.5-1.25q-.55-.55-1.275-.525-.725.025-1.225.525ZM13.7 17.15h20.65q.75 0 1.275-.55.525-.55.525-1.3t-.525-1.275Q35.1 13.5 34.35 13.5H13.7q-.8 0-1.325.525-.525.525-.525 1.275 0 .8.525 1.325.525.525 1.325.525ZM36.65 47.3q-4.2 0-7.15-2.95t-2.95-7.1q0-4.15 2.95-7.15t7.15-3q4.15 0 7.125 3 2.975 3 2.975 7.15t-2.975 7.1Q40.8 47.3 36.65 47.3ZM5.2 44.25V8.9q0-1.5 1.05-2.575Q7.3 5.25 8.85 5.25h30.3q1.55 0 2.6 1.075T42.8 8.9v16.75q-.85-.45-1.75-.75t-1.9-.5V8.9H8.85v30.2h14.9q.1.75.25 1.5t.4 1.5l-1.2 1.1q-.1.15-.25.225-.15.075-.25-.075l-1.1-1.1q-.3-.3-.7-.3-.4 0-.65.3l-1.8 1.8q-.3.3-.7.3-.4 0-.65-.3l-1.75-1.8q-.3-.3-.7-.3-.4 0-.65.3l-1.8 1.8q-.3.3-.7.3-.4 0-.65-.3l-1.75-1.8q-.3-.3-.7-.3-.4 0-.65.25L5.9 44.05q-.1.1-.7.2Zm8.5-9.65h10.2q.2-1 .525-1.9.325-.9.825-1.75H13.7q-.8 0-1.325.525-.525.525-.525 1.275 0 .8.525 1.325.525.525 1.325.525Zm0-8.75h16.8q1.3-.8 2.725-1.225 1.425-.425 2.925-.475-.25-.8-.7-1.375-.45-.575-1.1-.575H13.7q-.8 0-1.325.55-.525.55-.525 1.3t.525 1.275q.525.525 1.325.525ZM8.85 39.1V8.9v30.2Z"/>
                            </svg>

                            <span className="ml-3 text-sm font-medium"> Confirmed </span>
                        </a>
                        </Link>

                    {/* Delivered */}

                    <Link href="/waiter/delivered" legacyBehavior>
                        <a
                            href="#"
                            className="flex items-center px-4 py-2 text-defaultText rounded-lg hover:bg-darkerGrey hover:text-gray-700"
                        >

                            {/* Delivered Icon */}

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 opacity-75"
                                viewBox="0 0 48 48"
                            >
                                <path d="m20.95 27.35-3.95-4q-.6-.6-1.55-.6-.95 0-1.65.6-.7.75-.7 1.675t.7 1.475l5.6 5.6q.6.7 1.55.7.95 0 1.6-.7L34 20.65q.6-.6.575-1.5-.025-.9-.625-1.6-.65-.65-1.6-.65-.95 0-1.65.65Zm3.1 17.7q-4.45 0-8.35-1.6-3.9-1.6-6.725-4.425Q6.15 36.2 4.55 32.3q-1.6-3.9-1.6-8.35 0-4.4 1.6-8.25 1.6-3.85 4.425-6.7Q11.8 6.15 15.7 4.525 19.6 2.9 24.05 2.9q4.4 0 8.25 1.625Q36.15 6.15 39 9q2.85 2.85 4.475 6.7Q45.1 19.55 45.1 24q0 4.4-1.625 8.3Q41.85 36.2 39 39.025q-2.85 2.825-6.7 4.425-3.85 1.6-8.25 1.6ZM24 24Zm0 16.5q7 0 11.75-4.7T40.5 24q0-7.05-4.725-11.775Q31.05 7.5 24 7.5q-7 0-11.75 4.7T7.5 24q0 7.05 4.725 11.775Q16.95 40.5 24 40.5Z"/>
                            </svg>

                            <span className="ml-3 text-sm font-medium"> Delivered </span>
                        </a>
                    </Link>

                    {/* Assistance */}

                    {/* Help */}

                    <div className="ml-1.5 text-md font-bold -mb-2 text-defaultText">
                        Help
                    </div>

                    <Link href="/waiter/assistance" legacyBehavior>
                        <a
                            href="#"
                            className="flex items-center px-4 py-2 text-defaultText rounded-lg hover:bg-darkerGrey hover:text-gray-700"
                        >
                            {/* Help Icon */}

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 opacity-80"
                                viewBox="0 0 48 48"
                            >
                                <path d="M24.2 34.4q.75 0 1.275-.525Q26 33.35 26 32.55v-8.8q0-.7-.55-1.225Q24.9 22 24.2 22q-.8 0-1.325.525-.525.525-.525 1.275v8.8q0 .75.55 1.275.55.525 1.3.525ZM24 17.9q.8 0 1.35-.525t.55-1.325q0-.85-.55-1.4-.55-.55-1.35-.55-.85 0-1.375.55T22.1 16q0 .85.55 1.375T24 17.9Zm0 26.9q-4.4 0-8.2-1.6-3.8-1.6-6.6-4.4-2.8-2.8-4.4-6.6-1.6-3.8-1.6-8.2 0-4.4 1.6-8.2Q6.4 12 9.2 9.2q2.8-2.8 6.6-4.4 3.8-1.6 8.2-1.6 4.4 0 8.2 1.6 3.8 1.6 6.6 4.4 2.8 2.8 4.4 6.6 1.6 3.8 1.6 8.2 0 4.4-1.6 8.2-1.6 3.8-4.4 6.6-2.8 2.8-6.6 4.4-3.8 1.6-8.2 1.6ZM24 24Zm0 17.15q7.05 0 12.1-5.025T41.15 24q0-7.05-5.05-12.1T24 6.85q-7.1 0-12.125 5.05T6.85 24q0 7.1 5.025 12.125T24 41.15Z"/>
                            </svg>

                            <span className="ml-3 text-sm font-medium"> Assistance </span>
                        </a>
                    </Link>
                    
                </nav>
            </div>

            {/* Footer Desktop */}

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 lg:hidden xl:block">
                <section
                    className="flex items-center p-3.5 xl:px-2.5 xl:py-4 bg-white shrink-0"
                >
                    {/* Waiter information */}

                    <div className="ml-1.5">
                        <p className="text-xs mr-2.5 xl:mr-2 2xl:mr-5 truncate">
                            <strong className="block font-bold"> {user} </strong>
                            <span> {user}@oaxaca.co.uk </span>
                        </p>
                    </div>

                    {/* Logout Button */}

                    <a onClick={handleLogout}
                       className="px-1.5 py-2 font-medium bg-red-50 hover:bg-red-50 hover:text-red-600 text-red-500 rounded-lg text-xs cursor-pointer">
                        Log Out
                    </a>

                </section>
            </div>

            {/* Footer Tablet */}

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 xl:hidden">
                <section
                    className="flex flex-col items-center p-3.5 bg-white shrink-0"
                >
                    {/* Waiter information */}

                    <div className="ml-1.5">
                        <p className="text-xs mr-4 truncate">
                            <strong className="block font-bold"> { user } </strong>
                            <span> { user }@oaxaca.co.uk </span>
                        </p>
                    </div>

                    {/* Logout Button */}

                    <div className="py-1 mt-2">
                        <a onClick={handleLogout}
                           className="px-14 py-2 font-medium bg-red-50 hover:bg-red-50 hover:text-red-600 text-red-500 rounded-lg text-xs cursor-pointer">
                            Log Out
                        </a>
                    </div>
                </section>
            </div>
        </section>
    )
}