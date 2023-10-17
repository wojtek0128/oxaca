import Head from 'next/head'
import React from "react";
import Navbar from "@/components/homepage/navbar";
import HeroSection from "@/components/homepage/herosection";
import AboutUs from "@/components/homepage/aboutus";
import Cta from "@/components/homepage/cta";
import Footer from "@/components/homepage/footer";
import Contact from "@/components/homepage/contact";

/**
 * Displays all elements for the main homepage.
 */
function Home() {
    return (
        <>
            <Head>
                <title> Oaxaca </title>
                <meta
                    name="description"
                    content="Oxaca Mexican Restaurant"
                />
            </Head>

            {/* Navigation Bar */}
            <Navbar />

            {/* Hero Section + Order Now */}
            <HeroSection/>

            {/* About Us + Sustainability */}
            <AboutUs/>

            {/* Contact Us */}
            <Contact/>

            {/* CTA section + Order Now */}
            <Cta/>

            {/* Footer section + Links */}
            <Footer/>
        </>
    );
}

export default Home;
