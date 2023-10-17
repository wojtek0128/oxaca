import React from "react";
import Container from "@/components/homepage/container";
import Image from "next/image";
import Dish from "@/img/dish-1.png";
import Dish2 from "@/img/dish-2.png";

function AboutUs() {
    return (
        <Container className="flex w-full flex-col mt-4 items-center justify-center text-center">

            {/* Pre-text */}
            <section id="aboutUs">
                <div className="text-sm font-bold tracking-wider text-pink-600">
                    ABOUT US
                </div>

                <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl">
                    Fresh. Fresh. Fresh. Everything is fresh!
                </h2>

                <p className="max-w-2xl py-4 text-lg leading-normal text-gray-800 lg:text-xl xl:text-xl">
                    At Oaxaca, we believe that the quality of our food starts with the ingredients we use.
                    That is why we are committed to using only the freshest, high-quality ingredients in
                    all of our dishes.
                </p>
            </section>

            {/* Main Section + Image */}
            <section>
                <div
                    className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-1"
                >
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">

                        {/* Dish image */}
                        <div
                            className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full"
                        >
                            <Image
                                alt="Dish"
                                src={Dish}
                                className="relative left-9 lg:left-0 w-3/4 object-contain"
                            />
                        </div>

                        {/* Text + Mini-Header */}
                        <div className="lg:py-14">

                            {/* Mini-Header */}
                            <div className="text-sm font-bold tracking-wider text-pink-600">
                                WHAT WE DO
                            </div>

                            {/* Text */}
                            <div className="flex flex-col space-y-5 mt-5">
                                <p className="text-gray-800">
                                    We work closely with local farmers and suppliers to ensure that our ingredients
                                    are always fresh and in-season. Our chefs carefully select each ingredient and
                                    create our menu around what is available, allowing us to offer a seasonal and
                                    constantly evolving selection of dishes.
                                </p>
                                <p className="text-gray-800">
                                    We prepare each dish from scratch in our kitchen, ensuring that every ingredient
                                    is at its peak freshness. Our menu features a range of options, from classic comfort
                                    food to innovative and creative dishes that showcase the best of each season.
                                </p>
                                <p className="text-gray-800">
                                    You can trust that every dish is made with care and a commitment to freshness.
                                    We believe that the quality of our ingredients shines through in every bite,
                                    and we look forward to sharing our passion for fresh and delicious food with you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pre-text */}
            <section>
                <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl">
                    Seasonal and Sustainable.
                </h2>

                <p className="max-w-2xl py-4 text-lg leading-normal text-gray-800 lg:text-xl xl:text-xl">
                    We are proud of our sustainable practices and believe that they not only benefit the environment
                    and our local community, but also result in the most delicious and flavorful dishes possible.
                </p>
            </section>

            <section>
                <div
                    className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-1"
                >
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">

                        {/* Dish image */}
                        <div
                            className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full"
                        >
                            <Image
                                alt="Dish"
                                src={Dish2}
                                className="relative left-9 lg:left-0 w-3/4 object-scale-down"
                            />
                        </div>

                        {/* Text + Mini-Header */}
                        <div className="lg:py-14">

                            {/* Mini-Header */}
                            <div className="text-sm font-bold tracking-wider text-pink-600">
                                SUSTAINABILITY
                            </div>

                            {/* Text */}
                            <div className="flex flex-col space-y-5 mt-5">
                                <p className="text-gray-800">
                                    We believe that sustainability and ethical practices are key components of great
                                    food. We are committed to sourcing only the finest and freshest ingredients for
                                    our dishes, while prioritizing environmentally friendly and socially responsible
                                    practices.
                                </p>
                                <p className="text-gray-800">
                                    We work closely with local farmers and producers to source our ingredients, ensuring
                                    that we are able to offer our customers the highest quality products while
                                    supporting the local community. By choosing to source our ingredients locally,
                                    we are able to reduce our carbon footprint and support sustainable agriculture
                                    practices.
                                </p>
                                <p className="text-gray-800">
                                    Our commitment to sustainability extends beyond just our ingredient sourcing.
                                    We use eco-friendly practices in our kitchen, such as recycling and composting,
                                    to reduce our environmental impact. We also prioritize working with suppliers
                                    who share our values and commitment to ethical practices.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>

    )
}

export default AboutUs;