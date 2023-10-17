import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

function KitchenSidebar() {

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
        <section className="flex flex-col justify-between h-screen w-48 bg-basicGrey border-r xl:w-64">
            <div className="px-4 py-6">

                {/* Main Sidebar Navigation */}

                <nav aria-label="Main Nav" className="flex flex-col mt-12 space-y-4">

                    {/* Orders Dashboard */}

                    <div className="text-md ml-1.5 font-bold text-defaultText">
                        Dashboard
                    </div>

                    <div className="text-md ml-1.5 font-bold text-defaultText">
                        Active Orders
                    </div>

                    {/* In Progress */}

                    <Link href="/kitchen" legacyBehavior>
                        <a
                            className="flex items-center px-4 py-2 text-defaultText rounded-lg hover:bg-darkerGrey hover:text-gray-700"
                        >

                            {/* In Progress Icon */}

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 opacity-75"
                                viewBox="0 96 960 960"
                            >
                                <path d="m673 938 157-98-157-98v196ZM237 439h486v-73H237v73Zm495.634 603q-83.254 0-142.444-59.19Q531 923.62 531 841q0-83.055 59.046-143.027Q649.091 638 732.866 638q82.754 0 142.444 59.973Q935 757.945 935 841q0 82.62-59.556 141.81-59.555 59.19-142.81 59.19ZM104 991V274q0-29.75 21.125-51.375T177 201h606q30.75 0 51.875 21.625T856 274v335q-17.169-8.857-34.978-14.829Q803.213 588.2 783 584V274H177v604h298q1.885 15.172 4.942 30.086Q483 923 488 938l-30 30-40-41-63 64-62-64-63 64-62-64-64 64Zm133-203h241.272Q482 768 488.5 750t16.5-35H237v73Zm0-175h373q26-16 54.5-24.5T723 579v-39H237v73Zm-60 265V274v604Z"/>
                            </svg>

                            <span className="ml-3 text-sm font-medium"> In Progress </span>
                        </a>
                    </Link>

                    <div className="text-md ml-1.5 font-bold text-defaultText">
                        Past Orders
                    </div>

                    {/* Cancelled Orders */}

                    <Link href="/kitchen/cancelled" legacyBehavior>
                        <a
                            className="flex items-center px-4 py-2 text-defaultText rounded-lg hover:bg-darkerGrey hover:text-gray-700"
                        >

                            {/* Cancelled Icon */}

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 opacity-75"
                                viewBox="0 96 960 960"
                            >
                                <path d="M703 775q0-10-7-17.5t-18-7.5q-11 0-18 7.5t-7 17.5v130q0 11 7 18t18 7q11 0 18-7t7-18V775Zm60 0v130q0 11 7 18t18 7q11 0 18-7t7-18V775q0-10-7-17.5t-18-7.5q-11 0-18 7.5t-7 17.5ZM274 439h413q14.775 0 25.388-10.86Q723 417.281 723 402.14q0-15.14-10.612-25.64Q701.775 366 687 366H274q-15.75 0-26.375 10.675Q237 387.351 237 402.491q0 15.141 10.625 25.825T274 439Zm458.634 603Q649 1042 590 983q-59-59-59-142 0-83.435 58.856-143.218Q648.711 638 732.866 638 816 638 875.5 697.782 935 757.565 935 841q0 83-59.366 142-59.365 59-143 59ZM104 981V274q0-29.75 21.125-51.375T177 201h606q30.75 0 51.875 21.625T856 274v335q-17.169-8.857-34.978-14.829Q803.213 588.2 783 584V274H177v604h298q1.885 15.172 4.942 30.086Q483 923 488 938l-24 22q-2.404 3-5.048 4.05-2.644 1.05-4.567-.85L432 941q-5.818-6-13.909-6Q410 935 405 941l-36 36q-5.818 6-13.909 6Q347 983 342 977l-35-36q-5.818-6-13.909-6Q285 935 280 941l-36 36q-5.818 6-13.909 6Q222 983 217 977l-35-36q-5.636-6-13.818-6Q160 935 155 940l-37 37q-2 2-14 4Zm170-193h203.916Q482 768 488.5 750t16.5-35H274q-15.75 0-26.375 10.675Q237 736.351 237 751.491q0 15.141 10.625 25.825T274 788Zm0-175h336q26-16 54.5-24.5T723 579q-5-16-14-27.5T686.715 540H274q-15.75 0-26.375 10.95Q237 561.901 237 577.175q0 14.85 10.625 25.338Q258.25 613 274 613Zm-97 265V274v604Z"/>
                            </svg>

                            <span className="ml-3 text-sm font-medium"> Cancelled </span>
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
                            <strong className="block font-bold"> {user} </strong>
                            <span> {user}@oaxaca.co.uk </span>
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

export default KitchenSidebar;