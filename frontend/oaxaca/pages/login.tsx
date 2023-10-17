import React from 'react';
import {useRef, useState, useEffect} from "react";


const LOGIN_URL = "http://localhost:8080/users/auth/login"

/**
 * Displays a login screen so the user can enter
 * their already registered user.
 *
 * @constructor creates states to save password, username as well as
 * a success state.
 */

export default function Login() {

    const[user, setUser] = useState('');
    const[pwd, setPwd] = useState('');
    const[success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');


    /**
     *
     * handleSubmit POSTs the users login details and awaits the response from the backend.
     * It then takes the array response and assigns it to localstorage so it can authenticate them.
     * @param e
     */

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: user, password: pwd}),
            }
            );

            if (!response.ok) {
                setErrMsg("Error has occured please try again")
                throw new Error("Oh no! Something went wrong.")
            }
            const responseData = await response.json();
            const { Token, ID, Username, Roles } = responseData;
            console.log(JSON.stringify(response))
            localStorage.setItem('token', Token)
            localStorage.setItem('user', Username)
            localStorage.setItem('Role', Roles)
            setSuccess(true)

        } catch (error) {
            console.log(error);
        }

    };

    /**
     * useEffect to check if there is an authenticated token in the users storage
     * if there is it sets success true and the user is logged in.
     */
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setSuccess(true)
            console.log(success)
        } else {
            setSuccess(false)
        }
    })
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full bg-gray-700'>
            <div className='hidden sm:block'>
                <section
                    className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
                >
                    <img
                        alt="Night"
                        src="https://myfoodbook.com.au/sites/default/files/styles/schema_img/public/recipe_photo/Enchiladas%20sm.jpg"
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />

                    <div className="hidden lg:relative lg:block lg:p-12">
                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Welcome to Oaxaca
                        </h2>

                        <p className="mt-4 leading-relaxed text-white/90">
                            Welcome to the authentic taste of Oaxaca!
                            Our Mexican restaurant serves up traditional dishes with a modern twist, using only the freshest ingredients sourced straight from the heart of Mexico.
                        </p>
                    </div>
                </section>

            </div>
            <div className='bg-white flex flex-col justify-center'>

                {success ? (
                    <div>
                        <div className="bg-green-100 border-t border-b border-green-500 text-green-700 px-10 py-7 text-xl"
                             >
                            <p className="font-bold">Login Succesful</p>
                            <p className="text-sm"><a href="/" className="text-green-700 underline ">Home</a></p>
                        </div>
                    </div>
                ) : (
                <form onSubmit={handleSubmit} className='max-w-[400px]-w-full mx-auto bg-white p-8 px-8 rounde-lg '>
                    <div className='flex flex-col text-gray-700 py-2'>
                        {errMsg && (<div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">{errMsg}</div>)}
                        <label htmlFor="username">User Name</label>
                        <input className='rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:border-gray-600 focus:outline-none'
                               type="text"
                               id="username"
                               autoComplete="off"
                               onChange={(e) => setUser(e.target.value)}
                               value={user}
                               required
                               />
                    </div>
                    <div className='flex flex-col text-gray-700 py-2'>
                        <label>Password</label>
                        <input className='rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:border-gray-600 focus:outline-none'
                               id="password"
                               onChange={(e) => setPwd(e.target.value)}
                               value={pwd}
                               required
                               type="password"/>
                    </div>
                    <div className='flex justify-between flex-col text-gray-700 py-2'>
                        <p className='flex items-center'><input className='mr-2' type="checkbox"/>Remember Me</p>
                    </div>
                    <div className='mt-4 text-sm text-black sm:mt-0'>
                        <p className='flex items-center'>Need to create an account? <a href="/register" className="text-gray-700 underline">Register</a>.</p>
                    </div>
                    <button className='w-full my-5 py-2 rounded-md border border-teal-500 bg-teal-500 px-12 text-sm font-medium text-black transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-black'>Sign In</button>
                </form>
                )}
            </div>
        </div>
    )
}