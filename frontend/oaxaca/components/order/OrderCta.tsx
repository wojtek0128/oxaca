import React, {useState} from "react";

type Props = {
    itemPrices: number;
}

export const useSuccess = () => {
    const [success, setSuccess] = useState(false);
    return {
        success, setSuccess
    }
};

function OrderCta( { itemPrices }: Props ) {
    const{success, setSuccess} = useSuccess();
    return (
        <section className="bg-teal-500">

            {/* Main Body */}
            <div
                className="container flex flex-col items-center justify-between px-6 py-16 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0"
            >
                {/* Heading */}
                <h2
                    className="text-5xl font-bold text-center text-teal-900 md:text-4xl md:max-w-xl md:text-left"
                >
                    {/* Divide by 100 to convert from pennies to pounds. */}
                    TOTAL: £{itemPrices / 100}

                </h2>
            </div>
        </section>
    )
}

export default OrderCta;