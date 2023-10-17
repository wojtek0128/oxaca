import React from "react";
import Image from "next/image";
import Container from "@/components/homepage/container";
import HeroImage from "@/img/hero-taco.png";
import HeroImageSM from "@/img/hero-taco-mobile.jpg";
import Squiggle from "@/img/squiggle.png";

function HeroSection() {
    return (
        <>
            <Container className="flex flex-wrap lg:mt-14">
                <div className="flex items-center w-full lg:w-1/2">
                    <div className="max-w-2xl mb-8">
                        {/* Main Hero title */}
                        <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
                            Mmmm, something here smells good, really good.
                        </h1>

                        {/* Main Hero image */}
                        <div className="flex-wrap my-10 bg-red w-full lg:hidden">
                            <div className="right-0">
                                <Image
                                    className="rounded-xl"
                                    src={HeroImageSM}
                                    width="800"
                                    alt="Taco"
                                    loading="eager"
                                    placeholder="blur"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <p className="relative text-xl leading-normal text-gray-500 py-3 lg:py-10 lg:text-xl xl:text-2xl">
                            Order now and try our brand-new juicy BBQ shredded chicken taco.
                            Guacamole, chives, chilli and our signature BBQ seasoning, what
                            else could you want?
                        </p>

                        {/* Order Now button */}
                        <div className="flex flex-row py-6 -mt-2 justify-center space-x-64 lg:ml-0 lg:justify-start lg:space-x-44 -ml-5">
                            <a href="/order" className="relative inline-block px-8 py-4 font-medium group">
                                <span
                                    className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-teal-400 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                <span
                                    className="absolute inset-0 w-full h-full bg-teal-100 border-2 border-teal-400 group-hover:border-pink-400 group-hover:bg-pink-100"></span>
                                <span className="relative text-black font-bold group-hover:text-pink-900"> Order Now </span>
                            </a>

                            {/* Squiggle */}
                            <div className="absolute -mt-3">
                                <Image
                                    src={Squiggle}
                                    width="80"
                                    alt="squiggle"
                                    loading="eager"
                                    placeholder="blur"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Hero image for Mobile devices */}
                <div className="hidden flex items-center justify-center w-full lg:w-1/2 lg:block">
                    <div className="absolute left-2/4 2xl:bottom-1/3">
                        <Image
                            src={HeroImage}
                            width="1000"
                            height="400"
                            alt="Taco"
                            loading="eager"
                            placeholder="blur"
                        />
                    </div>
                </div>
            </Container>
        </>
    );
}
export default HeroSection;