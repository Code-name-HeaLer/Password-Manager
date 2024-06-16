import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

const Manager = () => {
    const ref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showPassword = () => {
        alert("Show the Password");
        if (ref.current.src.includes("public/eye-crossed.png")) {
            ref.current.src = "public/eye.png"
        }
        else {
            ref.current.src = "public/eye-crossed.png"
        }
    }

    const savePassword = () => {
        setPasswordArray([...passwordArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form])

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
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
                <div className="text-white flex flex-col p-4 text-black gap-8 items-center">
                    <input
                        className="rounded-full border border-green-500 w-full p-4 py-1"
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter Webiste URL"
                        type="text"
                        name="site"
                        id=""
                    />
                    <div className="flex w-full justify-between gap-8 ">
                        <input
                            className="rounded-full border border-green-500 w-full p-4 py-1"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            type="text"
                            name="username"
                            id=""
                        />
                        <div className="relative">
                            <input
                                className="rounded-full border border-green-500 w-full p-4 py-1"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                type="text"
                                name="password"
                                id=""
                            />
                            <span className="absolute right-[3px] top-[5px] cursor-pointer" onClick={showPassword}><img ref={ref} className="p-1" width={26} src="public/eye.png" alt="eye" /></span>
                        </div>
                    </div>

                    <button onClick={savePassword} className="flex justify-center gap-2 items-center bg-green-500
                        hover:bg-green-400 rounded-full px-8 py-2 w-fit border border-green-900">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>Add Password</button>
                </div>
                <div className="passwords">
                    <h2>Your Passwords</h2>
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th>Song</th>
                                <th>Artist</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                <td>Malcolm Lockyer</td>
                                <td>1961</td>
                            </tr>
                            <tr>
                                <td>Witchy Woman</td>
                                <td>The Eagles</td>
                                <td>1972</td>
                            </tr>
                            <tr>
                                <td>Shining Star</td>
                                <td>Earth, Wind, and Fire</td>
                                <td>1975</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Manager;
