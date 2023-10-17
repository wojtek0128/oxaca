import React from 'react';
import {useRef, useState, useEffect} from "react";

const PWD_REGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
const REGISTER_URL = "http://localhost:8080/users/auth/register"

/**
 * Displays a registration screen so the user can enter their chosen
 * username, password and role. It sends it to the backend and creates
 * a record in a database table.
 *
 * @constructor creates states to hold the customers registration data
 */
const Register = () => {


    const[user, setUser] = useState('');
    const[validName, setValidName] = useState(false);
    const[userFocus, setUserFocus] = useState(false);

    const[pwd, setPwd] = useState('');
    const[validPwd, setvalidPwd] = useState(false);
    const[pwdFocus, setpwdFocus] = useState(false);

    const[matchPwd, setMatchPwd] = useState('');
    const[validMatch, setValidMatch] = useState(false);

    const[role, setRole] = useState('');

    const[success, setSuccess] = useState(false);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setvalidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])
    /**
     * handleSubmit POSTs registration details to backend
     * @param e
     */
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const response = await fetch(REGISTER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: user, password: pwd, roles: [role]}),
            });
            const userInfo = await response.json();
            if (!response.ok) {
                throw new Error("Oh no! Something went wrong.")
            }

            console.log(JSON.stringify(response))

        } catch (error) {
            console.log(error);
        }
        setSuccess(true);
        };
    return (

        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">

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

                <main
                    aria-label="Main"
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
                >

                    <div className="max-w-xl lg:max-w-3xl">
                        {pwdFocus && (
                            <div role="alert">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    Error
                                </div>
                                <div
                                    className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    {!validPwd && (
                                        <><p>Password is invalid</p><p>Ensure its over 6-24 characters, lowercase and uppercase, and includes a number</p></>
                                    )}
                                    {!validMatch && (
                                        <><p>Passwords dont match. Ensure they match.</p></>
                                    )}

                                </div>
                            </div>
                        )}
                        <div className="relative -mt-16 block lg:hidden"></div>
                        {success ? (
                        <div>
                            <div className="bg-green-100 border-t border-b border-green-500 text-green-700 px-10 py-7 text-xl"
                                 role="alert">
                                <p className="font-bold">Account Created</p>
                                <p className="text-sm"><a href="/login" className="text-green-700 underline ">Login here</a></p>
                            </div>
                        </div>
                        ) : (
                        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                            <div className="col-span-6">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                    className="mt-1 w-full rounded-lg bg-gray-100 p-2 focus:border-blue-500 focus:border-gray-600 focus:outline-none"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="Password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="Password"
                                    autoComplete="off"
                                    onChange={(e) => setPwd(e.target.value)}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setpwdFocus(true)}
                                    onBlur={() => setpwdFocus(false)}
                                    className="rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:border-gray-600 focus:outline-none"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="PasswordConfirmation"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password Confirmation
                                </label>

                                <input
                                    type="password"
                                    id="PasswordConfirmation"
                                    autoComplete="off"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmednote"
                                    onFocus={() => setpwdFocus(true)}
                                    onBlur={() => setpwdFocus(false)}
                                    className="rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:border-gray-600 focus:outline-none"
                                />


                            </div>
                            <div className="col-span-6">
                                <label htmlFor="countries"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                                    a role</label>
                                <select id="role"
                                        name="role"
                                        autoComplete="off"
                                        onChange={(e) => setRole(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Kitchen">Kitchen</option>
                                    <option value="Waiter">Waiter</option>
                                </select>
                            </div>
                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-teal-500 bg-teal-500 px-12 py-3 text-sm font-medium text-black transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-black"
                                >
                                    Create an account
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account?
                                    <a href="/login" className="text-gray-700 underline">Log in</a>

                                </p>
                            </div>
                        </form>
                            )}
                    </div>
                </main>
            </div>
        </section>


    )
}
export default Register;
