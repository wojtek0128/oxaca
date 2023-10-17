import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = () => {
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 20);
        });
    }, []);
    return (
            <nav className="relative container mx-auto flex items-center justify-between py-4 px-2">
                <div className= "" >
                    <img alt="Logo" src="https://i.postimg.cc/3Rqp6vQ3/logo.png" className="h-10"/>
                    <span className="text-[1rem] font-bold opacity-70">
            Mexican Restaurant
          </span>
                </div>
            </nav>
    );
};
export default Header;