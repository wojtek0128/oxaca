import React from "react";
import Image from "next/image";
import Squiggle from "@/img/squiggle-right.png";
import Link from "next/link";

function Cta() {
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
                    Order now for a taste of Mexico.
                </h2>

                {/* Button */}
                <div className="flex flex-row space-x-5">

                    {/* Squiggle */}
                    <div className="-mt-2">
                        <Image src={Squiggle} alt="squiggle" width="80" loading="eager"
                               placeholder="blur"></Image>
                    </div>

                    {/* Button */}
                    <div>
                        <Link href="/order" legacyBehavior>
                            <a className="relative inline-block px-8 py-4 font-medium group">
                            <span
                                className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-pink-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                            <span
                                className="absolute inset-0 w-full h-full bg-pink-100 border-2 border-pink-500 group-hover:border-teal-900 group-hover:bg-teal-100"></span>
                            <span className="relative text-pink-500 font-bold group-hover:text-teal-900"> Order Now </span>
                        </a>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cta;