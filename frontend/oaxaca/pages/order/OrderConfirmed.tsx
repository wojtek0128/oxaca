import React, {useState} from "react";

/**
 * Displays Order Placed message to customer and allows customer to request help.
 */
function OrderConfirmed() {

    const ASSISTANCE_URL = "http://localhost:8080/assistance/add";

    const [request, setRequest] = useState({
        id: "",
        tableNo: "",
        timeOfRequest: "",
    });

    /**
     * Saves request to backend server with table number and timestamp.
     */
    const saveRequest = async (event: any) => {
        event.preventDefault();
        const token = window.localStorage.getItem('token');
        const response = await fetch(ASSISTANCE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error("Oh no! Something went wrong.")
        }
    };

    /**
     * Updates table number value according to input.
     */
    const handleChange = (event: any) => {
        const value = event.target.value;
        setRequest({...request, [event.target.name]: value});
    }

    return (
        <>
            <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
                <div className="text-center">

                    {/* Order Placed */}
                    <div className="flex flex-row space-x-5 justify-center items-center">
                        {/* Icon */}
                        <div className="py-1.5 px-1.5 bg-lightGreen rounded-xl fill-darkGreen -mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12"
                                viewBox="0 96 960 960"
                            >
                                <path d="m419 641-79-79q-13-13-32-13t-34 14q-14 14.778-14 33.389Q260 615 274 628l112 112q14 14 33 14t33-14l229-230q13-13.5 12.5-31.75T680 446q-13.778-14-32.889-14Q628 432 613 446L419 641Zm61.5 360q-90.5 0-168.487-32.584-77.988-32.583-134.917-89.512T87.584 743.987Q55 666 55 575.5q0-89.5 32.347-167.05 32.347-77.551 89.512-134.917 57.166-57.366 135.154-90.449Q390 150 480.5 150q89.5 0 167.106 32.954 77.605 32.953 135.012 90.302 57.407 57.349 90.395 134.877Q906 485.66 906 576q0 90-33.084 167.987-33.083 77.988-90.449 135.154T647.55 968.653Q570 1001 480.5 1001Zm-.5-425Zm-.183 331Q621 907 716 812.674q95-94.325 95-236.5Q811 434 716.183 339.5t-236-94.5Q339 245 244 339.326q-95 94.325-95 236.5Q149 718 243.817 812.5t236 94.5Z"/>
                            </svg>
                        </div>

                        {/* Heading */}
                        <div>
                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"> Order Placed </h1>
                        </div>
                    </div>
                    <p className="mt-6 text-base leading-7 text-gray-600"> Your order is with us, sit back and relax while we prepared your food. </p>

                    {/* Request Help */}
                    <h1 className="mt-32 text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl"> Need help? </h1>
                    <p className="text-base leading-7 text-gray-600"> Enter your table number below and one of our friendly waiter will be happy to assist you. </p>

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <div>
                            <input
                                type="text"
                                name="tableNo"
                                value={request.tableNo}
                                onChange={(e) => handleChange(e)}
                                className="p-2 w-full rounded-md border border-gray-300 sm:text-sm"
                            />
                        </div>

                        <a
                            onClick={saveRequest}
                            className="rounded-md bg-lightGreen px-3.5 py-2.5 text-sm font-semibold text-darkGreen shadow-sm hover:bg-darkGreen hover:text-white cursor-pointer"
                        >
                            Request Assistance
                        </a>
                    </div>
                </div>
            </main>
        </>
    )
}

export default OrderConfirmed;