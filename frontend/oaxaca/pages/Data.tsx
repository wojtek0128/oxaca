import { BiMap } from "react-icons/bi";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";

import payment1 from "assets/payment1.png";
import payment2 from "assets/payment2.png";
import payment3 from "assets/payment3.png";
import payment4 from "assets/payment4.png";




export const recipes = [

    {
        id: 1,
        name: "Birria",
        info: "Braised beef in an ancho & guajillo chile broth, red onion, cilantro, lime, arbol chile salsa (3 pc)",
        price: "£20",
    },
    {
        id: 2,
        name: "Baja",
        info: "Fried haddock, chipotle lime aioli, coleslaw, cilantro, flour tortilla (3 pc)",
        price: "£13",
    },
    {
        id: 3,
        name: "key={",
        info: "Roasted sweet potato, guajillo & macadamia nut macha salsa, almond crema, pumpkin seeds *contains nuts (3pc)",
        price: "£17",
    },
    {
        id: 4,
        name: "Chicken Tinga Flautas",
        info: "Rolled tortillas filled and fried with chicken tinga, salsa verde, lettuce, crema fresca & cotija (3 pc)",
        price: "£22",
    },
    {
        id: 5,
        name: "Carne Asada",
        info: "Flank steak, spring onion, cilantro, lime, arbol chile salsa (3 pc)",
        price: "£14",
    },
    {
        id: 6,
        name: "Canasta",
        info: "Filled with beans and potatoes, wrapped in corn tortillas, and steamed in hot chile oil (3 pc)",
        price: "£20",
    },
];

export const starters = [
    {
        id: 7,
        name: "Cheesy Beef Empanadas",
        info: "Puff pastry, ground beef, beef broth served with hot sauce",
        price: "£15",
    },
    {
        id: 8,
        name: "Spicy Chicken Taquitos",
        info: "Rolled taco with spicy chicken, guacamole and sour cream",
        price: "£13",
    },
    {
        id: 9,
        name: "Tamales",
        info: "A small steamed cake of dough made from corn (maize)",
        price: "£17",
    },
    {
        id: 10,
        name: "Black Bean and Corn Salad",
        info: "Black beans, fresh corn, cotija cheese, red bell pepper, avocado, all drizzled with honey",
        price: "£20",
    },
    {
        id: 11,
        name: "Chicken Enchilada Casserole",
        info: "Corn tortillas stuffed with shredded chicken and cheese, topped with the best enchilada sauce, and even more cheese",
        price: "£14",
    },
    {
        id: 12,
        name: "Shrimp Tostada Bites",
        info: "Stuffed full of guacamole and topped with spicy, seared shrimp",
        price: "£20",
    },

]

export const footerSocials = [<BsFacebook />, <BsInstagram />, <BsTwitter />];
export const footerContacts = [
    {
        id: 1,
        icon: <HiOutlinePhone />,
        text: "+579-883-271-929",
    },
    {
        id: 2,
        icon: <HiOutlineMail />,
        text: "services@oaxaca.com",
    },
    {
        id: 3,
        icon: <BiMap />,
        text: "16 Wondudle road, Yangon",
    },
];

export const mainMenu = [
    {
        id: 1,
        href: "home",
        text: "Starters",
        icon: <AiFillHome />,
    },
    {
        id: 5,
        href: "popular.dishes",
        text: "Popular Dishes",
        icon: <AiFillHome />,
    },
];
export const explores = ["Drinks", "Sides"];
export const payments = [payment1, payment2, payment3, payment4];