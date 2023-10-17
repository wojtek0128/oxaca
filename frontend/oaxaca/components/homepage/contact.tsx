import React from "react";
import Container from "@/components/homepage/container";
import Restaurant1 from "@/img/restaurant-1.jpg";
import Restaurant2 from "@/img/restaurant-2.jpg";
import Restaurant3 from "@/img/restaurant-3.jpg";
import Restaurant4 from "@/img/restaurant-4.jpg";
import Image from "next/image";


function Contact() {
    return (
        <Container className="flex w-full flex-col mt-4 items-center justify-center text-center">
            {/* Pre-text */}
            <section id="findUs">
                <div className="text-sm font-bold tracking-wider text-pink-600">
                    FIND US
                </div>

                <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl">
                    Ready to dine with us?
                </h2>

                <p className="max-w-2xl py-4 text-lg leading-normal text-gray-800 lg:text-xl xl:text-xl">
                    Whether dining in one of our restaurants or ordering takeout, we are dedicated to providing
                    you with a memorable and satisfying experience. Come visit us today and discover the true taste
                    of Mexico!
                </p>
            </section>

            {/* Restaurants */}
            <section>
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 -mt-10 sm:py-12 lg:px-8">
                    <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">

                        {/* Covent Garden */}
                        <li>
                            <a className="block overflow-hidden group">
                                <Image
                                    src={Restaurant1}
                                    alt="Oaxaca Covent Garden"
                                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                                />

                                {/* Label + Location */}
                                <div className="relative pt-3 bg-white">
                                    <p className="mt-2">
                                        <span className="tracking-wider font-semibold text-gray-900"> COVENT GARDEN </span>
                                    </p>
                                    <h3
                                        className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
                                    >
                                        17 Bedford St, London WC2E 9HP
                                    </h3>
                                </div>
                            </a>
                        </li>

                        {/* Paddington */}
                        <li>
                            <a className="block overflow-hidden group">
                                <Image
                                    src={Restaurant3}
                                    alt=""
                                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                                />

                                {/* Label + Location */}
                                <div className="relative pt-3 bg-white">
                                    <p className="mt-2">
                                        <span className="tracking-wider font-semibold text-gray-900"> PADDINGTON </span>
                                    </p>
                                    <h3
                                        className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
                                    >
                                        3 Sheldon Square, London W2 6HY
                                    </h3>
                                </div>
                            </a>
                        </li>

                        {/* HAMMERSMITH */}
                        <li>
                            <a className="block overflow-hidden group">
                                <Image
                                    src={Restaurant4}
                                    alt=""
                                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                                />

                                {/* Label + Location */}
                                <div className="relative pt-3 bg-white">
                                    <p className="mt-2">
                                        <span className="tracking-wider font-semibold text-gray-900"> HAMMERSMITH </span>
                                    </p>
                                    <h3
                                        className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
                                    >
                                        244 Shepherds Bush Rd, London W6 7NL
                                    </h3>
                                </div>
                            </a>
                        </li>

                        {/* GREENWICH */}
                        <li>
                            <a className="block overflow-hidden group">
                                <Image
                                    src={Restaurant2}
                                    alt=""
                                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                                />

                                {/* Label + Location */}
                                <div className="relative pt-3 bg-white">
                                    <p className="mt-2">
                                        <span className="tracking-wider font-semibold text-gray-900"> GREENWICH </span>
                                    </p>
                                    <h3
                                        className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
                                    >
                                        Jubilee Place, 45 Bank St, London E14 5NY
                                    </h3>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Opening times */}
                <div className="text-md font-bold tracking-wider text-pink-600">
                    OPEN EVERYDAY 08:00 - 22:00 (excluding bank holidays)
                </div>
            </section>

        </Container>
    )
}

export default Contact;