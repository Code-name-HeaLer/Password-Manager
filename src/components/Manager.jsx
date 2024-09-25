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
                <div className="text-white flex flex-col p-4 gap-8 items-center">
                    <input
                        className="rounded-full border border-green-500 w-full p-4 py-1 text-black"
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter Webiste URL"
                        type="text"
                        name="site"
                        id=""
                    />
                    <div className="flex w-full justify-between gap-8 ">
                        <input
                            className="rounded-full border border-green-500 w-full p-4 py-1 text-black"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            type="text"
                            name="username"
                            id=""
                        />
                        <div className="relative">
                            <input
                                className="rounded-full border border-green-500 w-full p-4 py-1 text-black"
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
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to Show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className="bg-green-800 text-white">
                            <tr>
                                <th className="py-2">Site</th>
                                <th className="py-2">Username</th>
                                <th className="py-2">Password</th>
                            </tr>
                        </thead>
                        <tbody className="bg-green-100">
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className="text-center w-32 py-2 border border-white"><a href={item.site} target="_blank">{item.site}</a></td>
                                    <td className="text-center w-32 py-2 border border-white">{item.username}</td>
                                    <td className="text-center w-32 py-2 border border-white">{item.password}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </>
    );
};

export default Manager;
