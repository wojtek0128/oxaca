import React from "react";
import Logo from "@/img/logo-white.png";
import Image from "next/image";
import Link from "next/link";

function Footer() {
    return (
        <footer className="bg-teal-900">
            <div
                className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0"
            >
                {/* Logo + Small Screen Copyright */}
                <div
                    className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start"
                >
                    <div className="mx-auto my-6 text-center text-white md:hidden">
                        Copyright &copy; 2022, All Rights Reserved
                    </div>
                    {/* Logo */}
                    <div>
                        <Image src={ Logo } width="890" className="w-56 mt-6" alt="Oaxaca"/>
                    </div>
                </div>

                {/* Navigation options  */}
                <div className="flex justify-around space-x-32">
                    <div className="flex flex-col space-y-3 text-white">
                        <Link href="/" legacyBehavior>
                            <a className="hover:text-pink-400"> Home </a>
                        </Link>
                        <Link href="" legacyBehavior>
                            <a className="hover:text-pink-400"> Menu </a>
                        </Link>
                        <Link href={"/#aboutUs"} legacyBehavior>
                            <a className="hover:text-pink-400"> About </a>
                        </Link>
                    </div>
                    <div className="flex flex-col space-y-3 text-white">
                        <Link href="" legacyBehavior>
                            <a className="hover:text-pink-400"> Log in </a>
                        </Link>
                        <Link href="" legacyBehavior>
                            <a className="hover:text-pink-400"> Sign Up </a>
                        </Link>
                        <Link href="" legacyBehavior>
                            <a href="" className="hover:text-pink-400"> Staff </a>
                        </Link>
                    </div>
                </div>

                {/* Copyright Text */}
                <div className="hidden text-white md:block">
                    <h3 className="mt-9">Copyright Oaxaca &copy; 2023, All Rights Reserved</h3>
                </div>
            </div>
        </footer>
    )
}

export default Footer;