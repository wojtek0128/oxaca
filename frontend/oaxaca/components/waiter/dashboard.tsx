import { useState, useEffect } from "react";

/**
 * Displays a dashboard to inform and notify waiter of order information and customer assistance requests.
 *
 * @constructor Fetches all statistics and number of assiatnce requests from the server.
 */
function Dashboard() {

    // URL to display order and assistance information.
    const ORDER_URL_GETSTATS = "http://localhost:8080/order/getStats";
    const ORDER_URL_GETCONFIRMED = "http://localhost:8080/assistance/getAll"

    // Statistic and Loading states.
    const [stats, setStats] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    // Instantiate states for dashboard attributes.
    const [pending, setPending] = useState<number>();
    const [inProgress, setInProgress] = useState<number>();
    const [assistance, setAssistance] = useState<number>();
    const [total, setTotal] = useState<number>();

    /**
     * Fetches Pending, InProgress and Total orders information.
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = window.localStorage.getItem('token');
            try {
                const response = await fetch(ORDER_URL_GETSTATS, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                // Store statistics data locally.
                const stats = await response.json();
                setStats(stats);

                // Set data to variables
                setPending(stats[0]);
                setInProgress(stats[2]);
                setTotal(stats[3]);
            } catch (error) {
                console.log("Unable to load dashboard data.");
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    /**
     * Fetches all Assistance requests and calculates the length.
     */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = window.localStorage.getItem('token');
            try {
                const response = await fetch(ORDER_URL_GETCONFIRMED, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                // Store the number of requests locally.
                const alerts = await response.json();
                setAssistance(alerts.length);
            } catch (error) {
                console.log("Unable to load Assistance values.");
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <section>
            <div
                className="flex justify-around h-44 px-8 gap-10 py-6 bg-basicGrey 2xl:gap-24 2xl:px-12 2xl:h-48 -mt-6">

                {/* Pending Orders */}
                <div>
                    <a
                        className="relative block w-60 h-32 rounded-2xl border-2 border-gray-200 bg-white pt-2 xl:w-64 2xl:w-80 2xl:h-36"
                    >
                        <div className="text-defaultText pr-8">

                            <div className="flex flex-col space-y-5 mb-10 2xl:space-y-6">

                                {/* Icon and Heading */}
                                <div
                                    className="flex flex-row items-center space-x-4 px-2 -mt-1.5 xl:-mt-1.5 xl:space-x-5">

                                    {/* Icon */}
                                    <div className="py-1.5 px-1.5 bg-lightYellow rounded-xl fill-darkYellow -mb-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-8 h-8"
                                            viewBox="0 0 48 48"
                                        >
                                            <path
                                                d="M35.15 33.95q0-.5-.35-.875t-.9-.375q-.55 0-.9.375t-.35.875v6.5q0 .55.35.9t.9.35q.55 0 .9-.35t.35-.9Zm3 0v6.5q0 .55.35.9t.9.35q.55 0 .9-.35t.35-.9v-6.5q0-.5-.35-.875t-.9-.375q-.55 0-.9.375t-.35.875ZM13.7 17.15h20.65q.75 0 1.275-.55.525-.55.525-1.3t-.525-1.275Q35.1 13.5 34.35 13.5H13.7q-.8 0-1.325.525-.525.525-.525 1.275 0 .8.525 1.325.525.525 1.325.525ZM36.65 47.3q-4.2 0-7.15-2.95t-2.95-7.1q0-4.15 2.95-7.15t7.15-3q4.15 0 7.125 3 2.975 3 2.975 7.15t-2.975 7.1Q40.8 47.3 36.65 47.3ZM5.2 44.25V8.9q0-1.5 1.05-2.575Q7.3 5.25 8.85 5.25h30.3q1.55 0 2.6 1.075T42.8 8.9v16.75q-.85-.45-1.75-.75t-1.9-.5V8.9H8.85v30.2h14.9q.1.75.25 1.5t.4 1.5l-1.2 1.1q-.1.15-.25.2-.15.05-.25-.05l-1.1-1.1q-.3-.3-.7-.3-.4 0-.65.3l-1.8 1.8q-.3.3-.7.3-.4 0-.65-.3l-1.75-1.8q-.3-.3-.7-.3-.4 0-.65.3l-1.8 1.8q-.3.3-.7.3-.4 0-.65-.3l-1.75-1.8q-.3-.3-.7-.3-.4 0-.65.25L5.9 44.05q-.1.1-.7.2Zm8.5-9.65h10.2q.2-1 .525-1.9.325-.9.825-1.75H13.7q-.8 0-1.325.525-.525.525-.525 1.275 0 .8.525 1.325.525.525 1.325.525Zm0-8.75h16.8q1.3-.8 2.725-1.225 1.425-.425 2.925-.475-.25-.8-.7-1.375-.45-.575-1.1-.575H13.7q-.8 0-1.325.55-.525.55-.525 1.3t.525 1.275q.525.525 1.325.525ZM8.85 39.1V8.9v30.2Z"/>
                                        </svg>
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <h3 className="mt-4 text-md font-bold text-defaultText whitespace-nowrap xl:text-lg"> Pending
                                            Orders </h3>
                                    </div>
                                </div>

                                <div>
                                    <h1 className="text-defaultText font-bold text-3xl text-center ml-8">
                                        { pending }
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Orders in Progress */}
                <div>
                    <a
                        className="relative block w-60 h-32 rounded-2xl border-2 border-gray-200 bg-white pt-2 xl:w-64 2xl:w-80 2xl:h-36"
                    >
                        <div className="text-defaultText pr-8">

                            <div className="flex flex-col space-y-5 mb-10 2xl:space-y-6">

                                {/* Icon and Heading */}
                                <div
                                    className="flex flex-row items-center space-x-4 px-2 -mt-1.5 xl:-mt-1.5 xl:space-x-5">

                                    {/* Icon */}
                                    <div className="py-1.5 px-1.5 bg-lightGreen rounded-xl fill-darkGreen -mb-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-8 h-8"
                                            viewBox="0 0 48 48"
                                        >
                                            <path
                                                d="m35.2 37.1-.65-.7q-.55-.5-1.275-.5-.725 0-1.225.55-.55.55-.55 1.225t.55 1.225l2.2 2.2q.35.4.925.4.575 0 1.025-.4l5.1-5q.5-.55.5-1.25t-.5-1.25q-.55-.55-1.275-.525-.725.025-1.225.525ZM13.7 17.15h20.65q.75 0 1.275-.55.525-.55.525-1.3t-.525-1.275Q35.1 13.5 34.35 13.5H13.7q-.8 0-1.325.525-.525.525-.525 1.275 0 .8.525 1.325.525.525 1.325.525ZM36.65 47.3q-4.2 0-7.15-2.95t-2.95-7.1q0-4.15 2.95-7.15t7.15-3q4.15 0 7.125 3 2.975 3 2.975 7.15t-2.975 7.1Q40.8 47.3 36.65 47.3ZM5.2 44.25V8.9q0-1.5 1.05-2.575Q7.3 5.25 8.85 5.25h30.3q1.55 0 2.6 1.075T42.8 8.9v16.75q-.85-.45-1.75-.75t-1.9-.5V8.9H8.85v30.2h14.9q.1.75.25 1.5t.4 1.5l-1.2 1.1q-.1.15-.25.225-.15.075-.25-.075l-1.1-1.1q-.3-.3-.7-.3-.4 0-.65.3l-1.8 1.8q-.3.3-.7.3-.4 0-.65-.3l-1.75-1.8q-.3-.3-.7-.3-.4 0-.65.3l-1.8 1.8q-.3.3-.7.3-.4 0-.65-.3l-1.75-1.8q-.3-.3-.7-.3-.4 0-.65.25L5.9 44.05q-.1.1-.7.2Zm8.5-9.65h10.2q.2-1 .525-1.9.325-.9.825-1.75H13.7q-.8 0-1.325.525-.525.525-.525 1.275 0 .8.525 1.325.525.525 1.325.525Zm0-8.75h16.8q1.3-.8 2.725-1.225 1.425-.425 2.925-.475-.25-.8-.7-1.375-.45-.575-1.1-.575H13.7q-.8 0-1.325.55-.525.55-.525 1.3t.525 1.275q.525.525 1.325.525ZM8.85 39.1V8.9v30.2Z"/>
                                        </svg>
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <h3 className="mt-4 text-md font-bold text-defaultText whitespace-nowrap xl:text-lg"> Orders
                                            in Progress </h3>
                                    </div>
                                </div>

                                <div>
                                    <h1 className="text-defaultText font-bold text-3xl text-center ml-8">
                                        { inProgress }
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Assistance Required */}
                <div>
                    <a
                        className="relative block w-60 h-32 rounded-2xl border-2 border-gray-200 bg-white pt-2 xl:w-64 2xl:w-80 2xl:h-36"
                    >
                        <div className="text-defaultText pr-8">

                            <div className="flex flex-col space-y-5 mb-10 2xl:space-y-6">

                                {/* Icon and Heading */}
                                <div
                                    className="flex flex-row items-center space-x-4 px-2 -mt-1.5 xl:-mt-1.5 xl:space-x-5">

                                    {/* Icon */}
                                    <div className="py-1.5 px-1.5 bg-lightRed rounded-xl fill-darkRed -mb-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-8 h-8"
                                            viewBox="0 0 48 48"
                                        >
                                            <path
                                                d="M24.2 34.4q.75 0 1.275-.525Q26 33.35 26 32.55v-8.8q0-.7-.55-1.225Q24.9 22 24.2 22q-.8 0-1.325.525-.525.525-.525 1.275v8.8q0 .75.55 1.275.55.525 1.3.525ZM24 17.9q.8 0 1.35-.525t.55-1.325q0-.85-.55-1.4-.55-.55-1.35-.55-.85 0-1.375.55T22.1 16q0 .85.55 1.375T24 17.9Zm0 26.9q-4.4 0-8.2-1.6-3.8-1.6-6.6-4.4-2.8-2.8-4.4-6.6-1.6-3.8-1.6-8.2 0-4.4 1.6-8.2Q6.4 12 9.2 9.2q2.8-2.8 6.6-4.4 3.8-1.6 8.2-1.6 4.4 0 8.2 1.6 3.8 1.6 6.6 4.4 2.8 2.8 4.4 6.6 1.6 3.8 1.6 8.2 0 4.4-1.6 8.2-1.6 3.8-4.4 6.6-2.8 2.8-6.6 4.4-3.8 1.6-8.2 1.6ZM24 24Zm0 17.15q7.05 0 12.1-5.025T41.15 24q0-7.05-5.05-12.1T24 6.85q-7.1 0-12.125 5.05T6.85 24q0 7.1 5.025 12.125T24 41.15Z"/>
                                        </svg>
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <h3 className="mt-4 text-md font-bold text-defaultText whitespace-nowrap xl:text-lg"> Service
                                            Requested </h3>
                                    </div>
                                </div>

                                <div>
                                    <h1 className="text-defaultText font-bold text-3xl text-center ml-8">
                                        { assistance }
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Extra - DESKTOP ONLY */}
                <div className="flex flex-col space-y-2 xl:space-y-4 mx-auto lg:hidden xl:block">

                    {/* TOTAL ORDERS */}
                    <div>
                        <a
                            className="relative block w-60 h-32 rounded-2xl border-2 border-gray-200 bg-white pt-2 xl:w-64 2xl:w-80 2xl:h-36"
                        >
                            <div className="text-defaultText pr-8">

                                <div className="flex flex-col space-y-5 mb-10 2xl:space-y-6">

                                    {/* Icon and Heading */}
                                    <div
                                        className="flex flex-row items-center space-x-4 px-2 -mt-1.5 xl:-mt-1.5 xl:space-x-5">

                                        {/* Icon */}
                                        <div className="py-1.5 px-1.5 bg-lightBlue rounded-xl fill-darkBlue -mb-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-8 h-8"
                                                viewBox="0 96 960 960"
                                            >
                                                <path
                                                    d="M560 452.581q0-5.097 3.524-10.42 3.524-5.322 8.476-8.623Q601.791 422 633.918 416q32.127-6 66.205-6 21.299 0 42.206 2.5 20.906 2.5 41.425 7.5Q790 422 795 427.395q5 5.396 5 12.14 0 10.98-7.718 17.723Q784.564 464 775 460q-17.8-4-36.4-7-18.6-3-38.6-3-29.342 0-56.671 6T590 472q-13 5-21.5-.628t-8.5-18.791Zm0 220.205q0-5.592 3.524-11.221 3.524-5.63 8.476-9.027Q601.791 641 633.918 635.5q32.127-5.5 66.205-5.5 21.299 0 42.206 2.5 20.906 2.5 41.425 7.5Q790 642 795 647.395q5 5.396 5 12.14 0 10.98-7.718 17.723Q784.564 684 775 680q-17.8-4-36.4-7-18.6-3-38.6-3-29.342 0-56.671 5.5T590 691q-13 5-21.5.179-8.5-4.822-8.5-18.393Zm0-110.205q0-5.097 3.524-10.42 3.524-5.322 8.476-8.623Q601.791 532 633.918 526q32.127-6 66.205-6 21.299 0 42.206 2.5 20.906 2.5 41.425 7.5Q790 532 795 537.395q5 5.396 5 12.14 0 10.98-7.718 17.723Q784.564 574 775 570q-17.8-4-36.4-7-18.6-3-38.6-3-29.342 0-56.671 6T590 582q-13 5-21.5-.628t-8.5-18.791ZM246 761q53.566 0 104.283 13T450 811V379.745Q405 351 352.381 334.5 299.763 318 246 318q-38 0-75.5 9.5T96 351.137V789q32-14 71.829-21 39.828-7 78.171-7Zm269 50q50.017-24 97.271-37 47.255-13 101.523-13Q752 761 793 767t71 17V351.898Q830 334 791.178 326q-38.823-8-77.384-8-54.268 0-104.031 16.5Q560 351 515 379.745V811ZM273 571Zm209.213 327q-5.751 0-11.052-1.462-5.3-1.461-10.161-4.538-48-31-102.836-48t-112.222-17q-38.479 0-75.21 10Q134 847 98 861q-22.8 11-44.9-2.5Q31 845 31 818V340.688Q31 326 38 313.5 45 301 59 294q44.383-21 91.02-31 46.637-10 96.019-10Q309 253 369.5 270.5T482 322q52-34 110.515-51.5T714 253q49.158 0 95.579 10.5Q856 274 900 294q14 7 21.5 19.5T929 341v477q0 27.894-23.15 42.447Q882.7 875 861 861q-35-15-71.544-24.5t-74.973-9.5q-56.301 0-110.392 17Q550 861 503 892q-4.766 3.077-9.901 4.538Q487.964 898 482.213 898Z"/>
                                            </svg>
                                        </div>

                                        {/* Text */}
                                        <div>
                                            <h3 className="mt-4 text-md font-bold text-defaultText whitespace-nowrap xl:text-lg"> Total
                                                Orders </h3>
                                        </div>
                                    </div>

                                    <div>
                                        <h1 className="text-defaultText font-bold text-3xl text-center ml-8">
                                            { total }
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Dashboard;