import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import Logo from "img/logo.png";

function Navbar() {
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState<string | null>(null);


    useEffect(() => {
        if (localStorage.getItem("token")) {
            setSuccess(true)
            console.log(true)
            setUser(localStorage.getItem('user'));
        } else {
            setSuccess(false)
        }
    })

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('Role');
    };



    return (
        <div className="w-full">
            <nav
                className="container relative flex flex-wrap p-6 mx-auto items-center justify-between lg:justify-between xl:px-0">

                {/* Menu choices for mobile devices */}
                <Disclosure>
                    {({ open }) => (
                        <>
                            {/* Logo */}
                            <div className="flex flex-wrap items-center w-full justify-between lg:w-auto">
                                <Link href="/" legacyBehavior>
                                    <a className="flex items-center space-x-2">
                                        <span>
                                            <Image width="890" height="196" className="w-36 lg:w-48" alt="Oaxaca" src={Logo}/>
                                        </span>
                                    </a>
                                </Link>

                                {/* Toggle Box */}
                                <Disclosure.Button aria-label="Toggle Menu"
                                                   className="px-2 py-1 ml-auto text-defaultText rounded-md lg:hidden hover:text-teal-900 focus:text-teal-900 focus:bg-teal-100 focus:outline-none">
                                    <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        {open && (
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                                        )}
                                        {!open && (
                                            <path fillRule="evenodd"
                                                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                                        )}
                                    </svg>
                                </Disclosure.Button>

                                {/* Navigation options */}
                                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                                    <>
                                        {/* Display all items */}
                                        <Link href={"/"} legacyBehavior>
                                            <a
                                                className="w-full px-4 py-2 text-black rounded-lg focus:bg-teal-100 focus:outline-none">
                                                Menu
                                            </a>
                                        </Link>
                                        <Link href={"/#aboutUs"} legacyBehavior>
                                            <a
                                                className="w-full px-4 py-2 text-black rounded-lg focus:bg-teal-100 focus:outline-none">
                                                About Us
                                            </a>
                                        </Link>
                                        <Link href={"/#findUs"} legacyBehavior>
                                            <a
                                                className="w-full px-4 py-2 text-black rounded-lg focus:bg-teal-100 focus:outline-none">
                                                Find Us
                                            </a>
                                        </Link>

                                        {/* Log In / Sign Up Buttons */}
                                        <div className="flex flex-col space-y-5 w-full my-3 justify-center">
                                            {/* Log In */}
                                            <div>
                                                <Link href="/login" legacyBehavior>
                                                    <a className="px-5 py-2 min-w-6 text-teal-900 bg-teal-100 font-semibold rounded-lg hover:bg-pink-100 hover:text-pink-900">
                                                        Log In
                                                    </a>
                                                </Link>
                                            </div>

                                            {/* Sign Up */}
                                            <div>
                                                <Link href="/register" legacyBehavior>
                                                    <a className="px-4 py-2 text-teal-900 bg-teal-100 font-semibold rounded-lg hover:bg-pink-100 hover:text-pink-900">
                                                        Sign Up
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Order Now Button */}
                                        <Link href="" legacyBehavior>
                                            <a
                                                className="w-full px-6 py-2 mt-3 text-center text-black font-bold bg-teal-400 rounded-lg lg:ml-5">
                                                Order Now
                                            </a>
                                        </Link>
                                    </>
                                </Disclosure.Panel>
                            </div>
                        </>
                    )}
                </Disclosure>

                {/* Navbar items */}
                <div className="hidden text-center lg:flex lg:items-center">
                    <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">

                        {/* Navigation options  */}
                        <li className="mr-3">
                            <Link href="/menu" legacyBehavior>
                                <a
                                    className="inline-block px-4 py-2 text-lg font-normal font-semibold text-defaultText no-underline rounded-md hover:text-pink-400">
                                    Menu
                                </a>
                            </Link>
                        </li>
                        <li className="mr-3">
                            <Link href={"/#aboutUs"} legacyBehavior>
                                <a
                                    className="inline-block px-4 py-2 text-lg font-normal font-semibold text-defaultText no-underline rounded-md hover:text-pink-400">
                                    About Us
                                </a>
                            </Link>
                        </li>
                        <li className="mr-3">
                            <Link href={"/#findUs"} legacyBehavior>
                                <a
                                    className="inline-block px-4 py-2 text-lg font-normal font-semibold text-defaultText no-underline rounded-md hover:text-pink-400">
                                    Find Us
                                </a>
                            </Link>
                        </li>
                        <li>
                            {/* Order Now button */}
                            <div className="hidden mr-3 space-x-4 lg:flex">
                                <Link href="/order" legacyBehavior>
                                    <a className="relative inline-block px-6 py-2 font-medium group">
                                        <span
                                            className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-teal-400 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                        <span
                                            className="absolute inset-0 w-full h-full bg-teal-100 border-2 border-teal-400 group-hover:border-pink-400 group-hover:bg-pink-100"></span>
                                        <span className="relative text-black font-bold group-hover:text-pink-900"> Order Now </span>
                                    </a>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Log in / Sign Up Buttons */}
                <div className="hidden lg:flex lg:flex-row space-x-5">
                    {!success ? (
                        <>
                            <div>
                                <Link href="/login" legacyBehavior>
                                    <a className="px-6 py-2 text-teal-900 bg-teal-100 font-semibold rounded-md hover:bg-pink-100 hover:text-pink-900">
                                        Log In
                                    </a>
                                </Link>
                            </div>
                                <div>
                                    <Link href="/register" legacyBehavior>
                                        <a className="px-6 py-2 text-teal-900 bg-teal-100 font-semibold rounded-md hover:bg-pink-100 hover:text-pink-900">
                                            Sign Up
                                        </a>
                                    </Link>
                                </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <a className="inline-block px-4 py-2 text-lg font-normal font-semibold text-defaultText no-underline rounded-md">
                                    Hello {user}
                                </a>
                                <Link href="" legacyBehavior>
                                    <a className="px-6 py-2 text-teal-900 bg-teal-100 font-semibold rounded-md hover:bg-pink-100 hover:text-pink-900" onClick={handleLogout}>
                                        Sign Out
                                    </a>
                                </Link>
                            </div>
                        </>
                    )}

                </div>
            </nav>
        </div>
    );
}

export default Navbar;