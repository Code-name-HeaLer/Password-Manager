import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text";
        console.log(ref.current.src);
        if (ref.current.src.includes("public/eye-crossed.png")) {
            ref.current.src = "public/eye.png";
            passwordRef.current.type = "password";
        } else {
            passwordRef.current.type = "text";
            ref.current.src = "public/eye-crossed.png";
        }
    };

    const savePassword = () => {
        setPasswordArray([...passwordArray, form]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
        console.log([...passwordArray, form]);
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>
            <div className="mycontainer">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-green-700">&lt; </span>
                    Pass
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className="text-green-900 text-lg text-center">
                    Your own password Manager
                </p>
                <div className="text-white flex flex-col p-4 gap-8 items-center">
                    <input
                        className="rounded-full border border-green-500 w-full p-4 py-1 text-black"
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter Webiste URL"
                        type="text"
                        name="site"
                        id="site"
                    />
                    <div className="flex w-full justify-between gap-8 ">
                        <input
                            className="rounded-full border border-green-500 w-full p-4 py-1 text-black"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            type="text"
                            name="username"
                            id="username"
                        />
                        <div className="relative">
                            <input
                                className="rounded-full border border-green-500 w-full p-4 py-1 text-black"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                type="password"
                                name="password"
                                id="password"
                                ref={passwordRef}
                            />
                            <span
                                className="absolute right-[3px] top-[5px] cursor-pointer"
                                onClick={() => { showPassword }
                                }                   >
                                <img
                                    ref={ref}
                                    className="p-1"
                                    width={26}
                                    src="public/eye.png"
                                    alt="eye"
                                />
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => { savePassword }
                        } className="flex justify-center gap-2 items-center bg-green-500
                        hover:bg-green-400 rounded-full px-8 py-2 w-fit border border-green-900"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        ></lord-icon>
                        Add Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to Show</div>}
                    {passwordArray.length != 0 && (
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="py-2 border border-white text-center ">
                                                <a href={item.site} target="_blank">
                                                    <div className="flex items-center justify-center">
                                                        <span>{item.site}</span>
                                                        <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.site) }}>
                                                            <lord-icon
                                                                style={{
                                                                    width: "25px",
                                                                    height: "25px",
                                                                    "paddingTop": "3px",
                                                                    "paddingLeft": "3px",
                                                                }}
                                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                                trigger="hover"
                                                            ></lord-icon>
                                                        </div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td className="py-2 border border-white text-center ">
                                                <div className="flex items-center justify-center">
                                                    <span>{item.username}</span>
                                                    <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.username) }}>
                                                        <lord-icon
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                                "paddingTop": "3px",
                                                                "paddingLeft": "3px",
                                                            }}
                                                            src="https://cdn.lordicon.com/depeqmsz.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center">
                                                <div className="flex items-center justify-center">
                                                    <span>{item.password}</span>
                                                    <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.password) }}>
                                                        <lord-icon
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                                "paddingTop": "3px",
                                                                "paddingLeft": "3px",
                                                            }}
                                                            src="https://cdn.lordicon.com/depeqmsz.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center">
                                                <span>Delete</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
