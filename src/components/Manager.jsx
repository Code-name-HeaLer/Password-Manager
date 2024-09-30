import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Eye, EyeOff, Copy, Edit, Trash2, Save, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [passwords, setPasswords] = useState([]);
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const storedPasswords = localStorage.getItem("passwords");
        if (storedPasswords) {
            setPasswords(JSON.parse(storedPasswords));
        }
    }, []);

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPassword = { ...form, id: uuidv4() };
            const updatedPasswords = [...passwords, newPassword];
            setPasswords(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            setForm({ site: "", username: "", password: "" });
            toast.success('Password saved successfully!');
        } else {
            toast.error('Please fill all fields with at least 4 characters.');
        }
    };

    const deletePassword = (id) => {
        const updatedPasswords = passwords.filter(item => item.id !== id);
        setPasswords(updatedPasswords);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        toast.info('Password deleted.');
    };

    const editPassword = (id) => {
        setEditingId(id);
        const passwordToEdit = passwords.find(p => p.id === id);
        setForm(passwordToEdit);
    };

    const updatePassword = () => {
        const updatedPasswords = passwords.map(p =>
            p.id === editingId ? { ...form, id: editingId } : p
        );
        setPasswords(updatedPasswords);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        setForm({ site: "", username: "", password: "" });
        setEditingId(null);
        toast.success('Password updated successfully!');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.info('Copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <h1 className="text-4xl font-bold text-center mb-8">
                <span className="text-red-500">&lt;</span>
                Pass<span className="text-red-500">OP</span>
                <span className="text-red-500">/&gt;</span>
            </h1>

            <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8">
                <form onSubmit={(e) => { e.preventDefault(); editingId ? updatePassword() : savePassword(); }} className="space-y-4 mb-8">
                    <input
                        value={form.site}
                        onChange={(e) => setForm({ ...form, site: e.target.value })}
                        placeholder="Website URL"
                        className="w-full bg-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                        type="text"
                    />
                    <div className="flex space-x-4">
                        <input
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            placeholder="Username"
                            className="w-1/2 bg-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            type="text"
                        />
                        <div className="w-1/2 relative">
                            <input
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder="Password"
                                className="w-full bg-gray-700 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                                type={showPassword ? "text" : "password"}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-md transition duration-300 flex items-center justify-center"
                    >
                        {editingId ? <><Save size={20} className="mr-2" /> Update Password</> : <><Plus size={20} className="mr-2" /> Save Password</>}
                    </button>
                </form>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="p-3 font-bold uppercase">Site</th>
                                <th className="p-3 font-bold uppercase">Username</th>
                                <th className="p-3 font-bold uppercase">Password</th>
                                <th className="p-3 font-bold uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {passwords.map((item) => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-gray-800 hover:bg-gray-700 transition-colors"
                                    >
                                        <td className="p-3">{item.site}</td>
                                        <td className="p-3">{item.username}</td>
                                        <td className="p-3">
                                            <span className="flex items-center">
                                                {'•'.repeat(8)}
                                                <button onClick={() => copyToClipboard(item.password)} className="ml-2 text-gray-400 hover:text-white">
                                                    <Copy size={16} />
                                                </button>
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <button onClick={() => editPassword(item.id)} className="mr-2 text-blue-400 hover:text-blue-300">
                                                <Edit size={20} />
                                            </button>
                                            <button onClick={() => deletePassword(item.id)} className="text-red-400 hover:text-red-300">
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Manager;