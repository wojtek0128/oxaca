import React from "react";
import Image from "next/image";
import Logo from "../../img/Logo.png";

function KitchenNavbar() {
    return (
        <nav className="flex container mx-auto max-w-full">

            {/* Flex Container */}
            <div className="flex w-full items-center justify-around space-x-20 2xl:gap-20 2xl:space-x-96">

                {/* Logo */}
                <Image alt="Logo" src={ Logo } width="890" height="196" className="w-28 lg:w-36"/>

            </div>
        </nav>
    )
}

export default KitchenNavbar;